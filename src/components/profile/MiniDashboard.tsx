
"use client";

import React, { useState, useEffect } from 'react';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Target, CheckCircle, ShieldAlert, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAggregatedStats, type AggregatedStats } from '@/lib/userData'; 
import Link from 'next/link';
import { Button } from '../ui/button';

export default function MiniDashboard() {
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = () => {
      if (typeof window !== 'undefined') {
        const currentStats = getAggregatedStats();
        setStats(currentStats);
        setIsLoadingStats(false);
      }
    };
    
    fetchStats();

    const handleStatsUpdated = () => fetchStats();
    window.addEventListener('statsUpdated', handleStatsUpdated);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdated);
  }, []);

  const summaryData = stats ? [
    { title: "Total Boundaries Defined", value: String(stats.totalDefined), icon: Target },
    { title: "Successful Implementations", value: String(stats.totalSuccessful), icon: CheckCircle },
    { title: "Challenging Situations", value: String(stats.totalChallenged), icon: ShieldAlert },
  ] : [];

  const overallProgressCard = stats ? { title: "Overall Success Rate", value: `${stats.overallProgress}%`, icon: TrendingUp } : null;

  if (isLoadingStats) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
             <BarChart3 className="h-6 w-6 text-primary" /> Your Progress Snapshot
          </CardTitle>
          <CardDescription>Loading your boundary-setting statistics...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 bg-muted rounded w-3/4 animate-pulse"></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-muted rounded-lg animate-pulse"></div>)}
          </div>
           <div className="h-28 bg-muted rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" /> Your Progress Snapshot
        </CardTitle>
        <CardDescription>A quick overview of your boundary-setting journey.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaryData.map((data, index) => (
            <SummaryCard 
              key={index} 
              title={data.title} 
              value={data.value} 
              icon={data.icon}
            />
          ))}
        </div>
        
        {overallProgressCard && (
            <SummaryCard 
              title={overallProgressCard.title} 
              value={overallProgressCard.value} 
              icon={overallProgressCard.icon}
              description="Based on logged successful vs. challenged attempts."
            />
        )}
        <div className="text-center pt-2">
            <Button asChild variant="outline">
                <Link href="/dashboard">View Full Dashboard</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
