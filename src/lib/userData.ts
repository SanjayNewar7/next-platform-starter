'use client';

import { db, auth } from './firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc, serverTimestamp, orderBy, Query, DocumentData } from 'firebase/firestore';
import type { Timestamp } from 'firebase/firestore';

export const allBoundaryTypes = [
  "Financial", 
  "Educational", 
  "Social Relationships", 
  "Work-Life Balance", 
  "Personal Time & Space",
  "Fitness & Health",
  "Business & Entrepreneurship"
] as const;

export type BoundaryTypeName = typeof allBoundaryTypes[number];
export type BoundaryStatus = 'pending' | 'successful' | 'challenged';

export interface LoggedBoundary {
  id: string;
  userId: string;
  boundaryType: BoundaryTypeName;
  situation: string;
  desiredOutcome: string;
  pastAttempts?: string;
  recommendation: string;
  status: BoundaryStatus;
  createdAt: number; // JS timestamp
  loggedAt?: number; // JS timestamp
}

// Firestore data structure will use Timestamps
interface FirestoreBoundary {
    id: string;
    userId: string;
    boundaryType: BoundaryTypeName;
    situation: string;
    desiredOutcome: string;
    pastAttempts?: string;
    recommendation: string;
    status: BoundaryStatus;
    createdAt: Timestamp; 
    loggedAt?: Timestamp;
}

export interface AggregatedStats {
  totalDefined: number;
  totalSuccessful: number;
  totalChallenged: number;
  totalPending: number;
  overallProgress: number; 
  byType: Record<BoundaryTypeName, {
    defined: number;
    successful: number;
    challenged: number;
    pending: number;
  }>;
}

function getCurrentUserId(): string {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found. Please log in.");
  }
  return user.uid;
}

function getBoundariesCollectionRef() {
    const userId = getCurrentUserId();
    return collection(db, `users/${userId}/boundaries`);
}

export async function addBoundary(details: {
  boundaryType: BoundaryTypeName;
  situation: string;
  desiredOutcome: string;
  pastAttempts?: string;
  recommendation: string;
}): Promise<string> {
  const userId = getCurrentUserId();
  const boundariesCol = getBoundariesCollectionRef();
  
  const newBoundaryData = {
    userId,
    boundaryType: details.boundaryType,
    situation: details.situation,
    desiredOutcome: details.desiredOutcome,
    pastAttempts: details.pastAttempts || "",
    recommendation: details.recommendation,
    status: 'pending' as BoundaryStatus,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(boundariesCol, newBoundaryData);
  return docRef.id;
}

export async function logBoundaryOutcome(
  id: string,
  outcome: 'successful' | 'challenged'
): Promise<void> {
  const boundaryDocRef = doc(getBoundariesCollectionRef(), id);
  await updateDoc(boundaryDocRef, {
    status: outcome,
    loggedAt: serverTimestamp(),
  });
}

const mapFirestoreDocToBoundary = (doc: DocumentData): LoggedBoundary => {
    const data = doc.data() as FirestoreBoundary;
    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().getTime(),
        loggedAt: data.loggedAt ? data.loggedAt.toDate().getTime() : undefined,
    } as unknown as LoggedBoundary;
};

export async function getBoundaryById(id: string): Promise<LoggedBoundary | undefined> {
    const boundaryDocRef = doc(getBoundariesCollectionRef(), id);
    const docSnap = await getDoc(boundaryDocRef);

    if (docSnap.exists()) {
        return mapFirestoreDocToBoundary(docSnap);
    } else {
        return undefined;
    }
}

export async function getBoundaries(filter?: BoundaryStatus | BoundaryTypeName | 'all'): Promise<LoggedBoundary[]> {
    const boundariesCol = getBoundariesCollectionRef();
    let q: Query<DocumentData>;

    if (filter && filter !== 'all') {
        if (allBoundaryTypes.includes(filter as BoundaryTypeName)) {
            q = query(boundariesCol, where('boundaryType', '==', filter), where('status', '==', 'pending'), orderBy('createdAt', 'desc'));
        } else if (['pending', 'successful', 'challenged'].includes(filter)) {
            q = query(boundariesCol, where('status', '==', filter), orderBy('createdAt', 'desc'));
        } else {
            q = query(boundariesCol, orderBy('createdAt', 'desc'));
        }
    } else {
        q = query(boundariesCol, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapFirestoreDocToBoundary);
}

export async function getAggregatedStats(): Promise<AggregatedStats> {
  const initialByType: any = {};
  allBoundaryTypes.forEach(type => {
     initialByType[type] = { defined: 0, successful: 0, challenged: 0, pending: 0 };
  });

  if (!auth.currentUser) {
     return {
        totalDefined: 0,
        totalSuccessful: 0,
        totalChallenged: 0,
        totalPending: 0,
        overallProgress: 0,
        byType: initialByType,
     }
  }

  const boundaries = await getBoundaries('all');
  const byTypeStats: AggregatedStats['byType'] = initialByType;

  let totalDefined = 0;
  let totalSuccessful = 0;
  let totalChallenged = 0;
  let totalPending = 0;

  boundaries.forEach(boundary => {
    totalDefined++;
    if (byTypeStats[boundary.boundaryType]) {
      byTypeStats[boundary.boundaryType].defined++;
    }

    if (boundary.status === 'successful') {
      totalSuccessful++;
       if (byTypeStats[boundary.boundaryType]) {
        byTypeStats[boundary.boundaryType].successful++;
      }
    } else if (boundary.status === 'challenged') {
      totalChallenged++;
      if (byTypeStats[boundary.boundaryType]) {
        byTypeStats[boundary.boundaryType].challenged++;
      }
    } else {
      totalPending++;
      if (byTypeStats[boundary.boundaryType]) {
        byTypeStats[boundary.boundaryType].pending++;
      }
    }
  });

  let overallProgressCalculation = 0;
  if (totalSuccessful + totalChallenged > 0) {
    overallProgressCalculation = (totalSuccessful / (totalSuccessful + totalChallenged)) * 100;
  }
  
  const finalProgress = parseFloat(overallProgressCalculation.toFixed(1));

  return {
    totalDefined,
    totalSuccessful,
    totalChallenged,
    totalPending,
    overallProgress: isNaN(finalProgress) ? 0 : finalProgress,
    byType: byTypeStats,
  };
}
