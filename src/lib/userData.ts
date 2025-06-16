
'use client';

const LOCAL_STORAGE_KEY = 'boundaryWiseUserData';

// Ensure consistency with boundary-recommendation.ts and BoundaryAssistantForm.tsx
export const allBoundaryTypes = [
  "Financial", 
  "Educational", 
  "Social Relationships", 
  "Work-Life Balance", 
  "Personal Time & Space"
] as const;

export type BoundaryTypeName = typeof allBoundaryTypes[number];
export type StatType = 'defined' | 'successful' | 'challenged';

export interface BoundaryStatsByType {
  defined: number;
  successful: number;
  challenged: number;
}

export interface UserData {
  boundaryData: Record<BoundaryTypeName, BoundaryStatsByType>;
}

export interface AggregatedStats {
  totalDefined: number;
  totalSuccessful: number;
  totalChallenged: number;
  overallProgress: number; // Percentage
  byType: Record<BoundaryTypeName, BoundaryStatsByType>;
}

function getInitialData(): UserData {
  const initialBoundaryData: Record<BoundaryTypeName, BoundaryStatsByType> = {} as Record<BoundaryTypeName, BoundaryStatsByType>;
  allBoundaryTypes.forEach(type => {
    initialBoundaryData[type] = { defined: 0, successful: 0, challenged: 0 };
  });
  return { boundaryData: initialBoundaryData };
}

function getUserData(): UserData {
  if (typeof window === 'undefined') {
    return getInitialData();
  }
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      const parsedData = JSON.parse(data) as UserData;
      let needsUpdate = false;
      allBoundaryTypes.forEach(type => {
        if (!parsedData.boundaryData[type]) {
          parsedData.boundaryData[type] = { defined: 0, successful: 0, challenged: 0 };
          needsUpdate = true;
        }
      });
      if (needsUpdate) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
      }
      return parsedData;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
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

export function incrementStat(boundaryType: BoundaryTypeName, statType: StatType): void {
  if (typeof window === 'undefined') return;
  const userData = getUserData();
  if (userData.boundaryData[boundaryType]) {
    userData.boundaryData[boundaryType][statType]++;
  } else {
    // This case should ideally not be hit if initialization is correct
    userData.boundaryData[boundaryType] = { defined: 0, successful: 0, challenged: 0 };
    userData.boundaryData[boundaryType][statType]++;
  }
  saveUserData(userData);
}

export function getAggregatedStats(): AggregatedStats {
  const userData = getUserData();
  let totalDefined = 0;
  let totalSuccessful = 0;
  let totalChallenged = 0;

  allBoundaryTypes.forEach(type => {
    const stats = userData.boundaryData[type] || { defined: 0, successful: 0, challenged: 0 };
    totalDefined += stats.defined;
    totalSuccessful += stats.successful;
    totalChallenged += stats.challenged;
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
    overallProgress: isNaN(finalProgress) ? 0 : finalProgress,
    byType: userData.boundaryData,
  };
}

// Initialize data on first load if needed and if on client
if (typeof window !== 'undefined' && !localStorage.getItem(LOCAL_STORAGE_KEY)) {
  saveUserData(getInitialData());
}
