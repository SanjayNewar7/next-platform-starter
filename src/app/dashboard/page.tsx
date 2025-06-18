
"use client";

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import ProgressChart from '@/components/dashboard/ProgressChart';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Target, CheckCircle, ShieldAlert, TrendingUp, ShieldCheck, Info, Edit3, Hourglass } from 'lucide-react'; // Added Hourglass
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getAggregatedStats, type AggregatedStats } from '@/lib/userData'; 

export default function DashboardPage() {
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

    // Listen for custom event to refresh stats
    const handleStatsUpdated = () => fetchStats();
    window.addEventListener('statsUpdated', handleStatsUpdated);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdated);

  }, []);


  const summaryData = stats ? [
    { title: "Total Boundaries Defined", value: String(stats.totalDefined), icon: Target, description: "Unique boundary situations explored with the AI." },
    { title: "Successful Implementations", value: String(stats.totalSuccessful), icon: CheckCircle, description: "Specific boundaries logged as successfully applied." },
    { title: "Challenging Situations", value: String(stats.totalChallenged), icon: ShieldAlert, description: "Specific boundaries logged as difficult to uphold." },
    { title: "Pending Logs", value: String(stats.totalPending), icon: Hourglass, description: "Boundaries defined but outcome not yet logged." },
  ] : [];
  
  const overallProgressCard = stats ? { title: "Overall Success Rate", value: `${stats.overallProgress}%`, icon: TrendingUp, description: "Success rate of logged attempts (Successful / (Successful + Challenged))." } : null;


  if (isLoadingStats) {
    return (
      <AppLayout>
        <div className="space-y-8 animate-pulse">
          <div className="h-10 bg-muted rounded w-3/4"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-lg"></div>)}
          </div>
          <div className="h-80 bg-muted rounded-lg"></div>
          <div className="h-40 bg-muted rounded-lg"></div>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">Your Progress Dashboard</h1>
        
        <Alert className="bg-secondary border-primary/50">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertTitle className="font-headline text-primary">Namaste! Welcome Back!</AlertTitle>
          <AlertDescription className="text-black">
            Track your journey in setting healthy boundaries. Your dashboard reflects your interactions and logged experiences. Tapai ko pragati ko lagi शुभकामना!
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryData.map((data, index) => (
            <SummaryCard 
              key={index} 
              title={data.title} 
              value={data.value} 
              icon={data.icon}
              description={data.description}
            />
          ))}
        </div>
        
        {overallProgressCard && (
          <div className="grid md:grid-cols-1 lg:grid-cols-4"> {/* Adjust grid for a single prominent card or integrate differently */}
            <div className="lg:col-span-1"> {/* Example: Make it take less space or more, as desired */}
               <SummaryCard 
                  title={overallProgressCard.title} 
                  value={overallProgressCard.value} 
                  icon={overallProgressCard.icon}
                  description={overallProgressCard.description}
                />
            </div>
          </div>
        )}


        <div>
          {stats && <ProgressChart currentStats={stats} />}
        </div>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Info className="text-primary"/> Next Steps & Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>Explore New Boundaries:</strong> Use the <Link href="/assistant" className="text-primary hover:underline">AI Assistant</Link> to get advice on areas you'd like to improve. Each new piece of advice is a 'defined' boundary.</li>
              <li><strong>Log Your Experiences:</strong> After trying to set a specific boundary, visit the <Link href="/log-experience" className="text-primary hover:underline">Log Experience page</Link> to record the outcome (successful or challenging).</li>
              <li><strong>Reflect on Patterns:</strong> Observe which boundary types and specific situations are more successful or challenging for you via the chart and summary cards.</li>
              <li><strong>Iterate:</strong> If a boundary is challenging, try getting new advice from the AI or refining your approach, then log the new attempt.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/assistant">Get AI Boundary Advice</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/log-experience" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" /> Log an Experience
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
