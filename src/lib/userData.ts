
'use client';

const LOCAL_STORAGE_KEY = 'boundaryWiseUserData_v2'; // Updated key for new structure

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
  recommendation: string;
  status: BoundaryStatus;
  createdAt: number; // Timestamp
  loggedAt?: number; // Timestamp
  // For simplicity, challengeDescription and successFeedback are not stored in localStorage for now
  // but could be added here if needed for persistence beyond the session.
}

export interface UserData {
  boundaries: LoggedBoundary[];
}

export interface AggregatedStats {
  totalDefined: number;
  totalSuccessful: number;
  totalChallenged: number;
  totalPending: number;
  overallProgress: number; // Percentage of (successful / (successful + challenged))
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
      // Basic validation: ensure 'boundaries' is an array
      if (Array.isArray(parsedData.boundaries)) {
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
}

export function addBoundary(details: {
  boundaryType: BoundaryTypeName;
  situation: string;
  recommendation: string;
}): LoggedBoundary {
  if (typeof window === 'undefined') {
    // This case should ideally be handled by the caller if client-side only logic
    throw new Error("addBoundary can only be called on the client.");
  }
  const userData = getUserData();
  const newBoundary: LoggedBoundary = {
    ...details,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // Simple unique ID
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
  // challengeDescription and successFeedback are handled by UI, not stored persistently here for now
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

export function getBoundaries(filterType?: BoundaryTypeName): LoggedBoundary[] {
  const userData = getUserData();
  if (filterType) {
    return userData.boundaries.filter(b => b.boundaryType === filterType).sort((a, b) => b.createdAt - a.createdAt);
  }
  return userData.boundaries.sort((a, b) => b.createdAt - a.createdAt);
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
    byTypeStats[boundary.boundaryType].defined++;

    if (boundary.status === 'successful') {
      totalSuccessful++;
      byTypeStats[boundary.boundaryType].successful++;
    } else if (boundary.status === 'challenged') {
      totalChallenged++;
      byTypeStats[boundary.boundaryType].challenged++;
    } else {
      totalPending++;
      byTypeStats[boundary.boundaryType].pending++;
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

// Initialize data on first load if needed and if on client
if (typeof window !== 'undefined' && !localStorage.getItem(LOCAL_STORAGE_KEY)) {
  saveUserData(getInitialData());
}
