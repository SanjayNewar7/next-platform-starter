
import AppLayout from '@/components/AppLayout';
import ProgressChart from '@/components/dashboard/ProgressChart';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Target, CheckCircle, ShieldAlert, TrendingUp, ShieldCheck, Info } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data for summary cards
  const summaryData = [
    { title: "Total Boundaries Defined", value: "25", icon: Target, description: "Across various areas of life." },
    { title: "Successful Implementations", value: "18", icon: CheckCircle, description: "Boundaries respected.", trend: "+3 this week", trendColor: "text-green-600" as "text-green-600" | "text-red-600" },
    { title: "Challenging Situations", value: "7", icon: ShieldAlert, description: "Areas needing more focus." },
    { title: "Overall Progress", value: "72%", icon: TrendingUp, description: "Boundary strength score.", trend: "+5% last month", trendColor: "text-green-600" as "text-green-600" | "text-red-600" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">Your Progress Dashboard</h1>
        
        <Alert className="bg-secondary border-primary/50">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertTitle className="font-headline text-primary">Namaste! Welcome Back!</AlertTitle>
          <AlertDescription className="text-primary-foreground/80">
            Track your journey in setting healthy boundaries. Remember, progress is unique to you. Tapai ko pragati ko lagi शुभकामना! (Best wishes for your progress!)
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
              trend={data.trend}
              trendColor={data.trendColor}
            />
          ))}
        </div>

        <div>
          <ProgressChart />
        </div>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Info className="text-primary"/> Next Steps & Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Review "Challenging Situations" and identify patterns.</li>
              <li>Explore setting new boundaries (e.g., Financial, Work-Life) using the AI Assistant.</li>
              <li>Practice one new boundary-setting phrase this week.</li>
              <li>Reflect on a recent success in maintaining a boundary.</li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href="/assistant">Get AI Boundary Advice</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
