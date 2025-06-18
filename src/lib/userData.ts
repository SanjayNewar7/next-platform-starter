
'use client';

const LOCAL_STORAGE_KEY = 'boundaryWiseUserData_v2'; 

export const allBoundaryTypes = [
  "Financial", 
  "Educational", 
  "Social Relationships", 
  "Work-Life Balance", 
  "Personal Time & Space"
] as const;

export type BoundaryTypeName = typeof allBoundaryTypes[number];
export type BoundaryStatus = 'pending' | 'successful' | 'challenged';

export interface LoggedBoundary {
  id: string;
  boundaryType: BoundaryTypeName;
  situation: string;
  desiredOutcome: string; 
  pastAttempts?: string; 
  recommendation: string;
  status: BoundaryStatus;
  createdAt: number; 
  loggedAt?: number; 
}

export interface UserData {
  boundaries: LoggedBoundary[];
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

function getInitialData(): UserData {
  return { boundaries: [] };
}

function getUserData(): UserData {
  if (typeof window === 'undefined') {
    return getInitialData();
  }
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      const parsedData = JSON.parse(data) as UserData;
      if (Array.isArray(parsedData.boundaries)) {
        parsedData.boundaries = parsedData.boundaries.map(b => ({
          ...b,
          desiredOutcome: b.desiredOutcome || "Not specified", 
        }));
        return parsedData;
      }
      console.warn("LocalStorage data for boundaries is not an array. Resetting.");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return getInitialData();
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
      localStorage.removeItem(LOCAL_STORAGE_KEY); 
      return getInitialData();
    }
  }
  return getInitialData();
}

function saveUserData(data: UserData): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('statsUpdated'));
}

export function addBoundary(details: {
  boundaryType: BoundaryTypeName;
  situation: string;
  desiredOutcome: string;
  pastAttempts?: string;
  recommendation: string;
}): LoggedBoundary {
  if (typeof window === 'undefined') {
    throw new Error("addBoundary can only be called on the client.");
  }
  const userData = getUserData();
  const newBoundary: LoggedBoundary = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    boundaryType: details.boundaryType,
    situation: details.situation,
    desiredOutcome: details.desiredOutcome,
    pastAttempts: details.pastAttempts,
    recommendation: details.recommendation,
    status: 'pending',
    createdAt: Date.now(),
  };
  userData.boundaries.push(newBoundary);
  saveUserData(userData);
  return newBoundary;
}

export function logBoundaryOutcome(
  id: string,
  outcome: 'successful' | 'challenged'
): void {
  if (typeof window === 'undefined') return;
  const userData = getUserData();
  const boundaryIndex = userData.boundaries.findIndex(b => b.id === id);
  if (boundaryIndex > -1) {
    userData.boundaries[boundaryIndex].status = outcome;
    userData.boundaries[boundaryIndex].loggedAt = Date.now();
    saveUserData(userData);
  } else {
    console.warn(`Boundary with id ${id} not found for logging outcome.`);
  }
}

export function getBoundaryById(id: string): LoggedBoundary | undefined {
  const userData = getUserData();
  return userData.boundaries.find(b => b.id === id);
}

export function getBoundaries(statusFilter?: BoundaryStatus | 'all'): LoggedBoundary[] {
  const userData = getUserData();
  let filteredBoundaries = userData.boundaries;

  if (statusFilter && statusFilter !== 'all') {
    filteredBoundaries = filteredBoundaries.filter(b => b.status === statusFilter);
  }
  // if statusFilter is 'all' or undefined, return all boundaries
  return filteredBoundaries.sort((a, b) => b.createdAt - a.createdAt);
}


export function getAggregatedStats(): AggregatedStats {
  const userData = getUserData();
  const byTypeStats: AggregatedStats['byType'] = {} as AggregatedStats['byType'];

  allBoundaryTypes.forEach(type => {
    byTypeStats[type] = { defined: 0, successful: 0, challenged: 0, pending: 0 };
  });

  let totalDefined = 0;
  let totalSuccessful = 0;
  let totalChallenged = 0;
  let totalPending = 0;

  userData.boundaries.forEach(boundary => {
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
    } else { // 'pending'
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

if (typeof window !== 'undefined' && !localStorage.getItem(LOCAL_STORAGE_KEY)) {
  saveUserData(getInitialData());
}
