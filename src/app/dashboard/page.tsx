
"use client";

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import ProgressChart from '@/components/dashboard/ProgressChart';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Target, CheckCircle, ShieldAlert, TrendingUp, ShieldCheck, Info, HelpCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getAggregatedStats, type AggregatedStats } from '@/lib/userData'; // Import new utilities

export default function DashboardPage() {
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    // Ensure this runs client-side only
    if (typeof window !== 'undefined') {
      const currentStats = getAggregatedStats();
      setStats(currentStats);
      setIsLoadingStats(false);
    }
  }, []);

  const summaryData = stats ? [
    { title: "Total Boundaries Defined", value: String(stats.totalDefined), icon: Target, description: "Number of boundaries you've explored with the AI assistant." },
    { title: "Successful Implementations", value: String(stats.totalSuccessful), icon: CheckCircle, description: "Boundaries you've marked as successfully applied." },
    { title: "Challenging Situations", value: String(stats.totalChallenged), icon: ShieldAlert, description: "Instances where upholding a boundary was logged as difficult." },
    { title: "Overall Progress", value: `${stats.overallProgress}%`, icon: TrendingUp, description: "Reflects success rate based on logged attempts." },
  ] : [];

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
          <AlertDescription className="text-primary-foreground/80">
            Track your journey in setting healthy boundaries. Your dashboard now reflects your logged experiences. Tapai ko pragati ko lagi शुभकामना!
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

        <div>
          {stats && <ProgressChart currentStats={stats} />}
        </div>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Info className="text-primary"/> Next Steps & Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>Define New Boundaries:</strong> Use the AI Assistant to get advice on areas you'd like to improve.</li>
              <li><strong>Log Your Experiences:</strong> After trying to set a boundary, use the "Mark as Successful" or "Faced a Challenge" buttons on the Assistant page.</li>
              <li><strong>Reflect on Patterns:</strong> Observe which boundary types are more successful or challenging for you via the chart below.</li>
              <li><strong>Iterate:</strong> If a boundary is challenging, try getting new advice from the AI or refining your approach.</li>
            </ul>
            <Button className="mt-6" asChild>
              <Link href="/assistant">Get AI Boundary Advice</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
