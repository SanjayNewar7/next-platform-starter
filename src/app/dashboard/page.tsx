
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

export default function DashboardPage() {
  // Mock data for summary cards - this data is illustrative.
  // In a full application, this would be fetched based on user activity.
  const summaryData = [
    { title: "Total Boundaries Defined", value: "25", icon: Target, description: "Number of boundaries you've explored or set up with the AI assistant." },
    { title: "Successful Implementations", value: "18", icon: CheckCircle, description: "Boundaries you've (hypothetically) marked as successfully applied.", trend: "+3 this week", trendColor: "text-green-600" as "text-green-600" | "text-red-600" },
    { title: "Challenging Situations", value: "7", icon: ShieldAlert, description: "Instances where (hypothetically) upholding a boundary was difficult." },
    { title: "Overall Progress", value: "72%", icon: TrendingUp, description: "An illustrative score of your boundary-setting journey.", trend: "+5% last month", trendColor: "text-green-600" as "text-green-600" | "text-red-600" },
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

        <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="font-semibold text-blue-700 dark:text-blue-300">Understanding Your Dashboard</AlertTitle>
          <AlertDescription className="text-blue-600 dark:text-blue-400/90">
            This dashboard currently shows sample data to illustrate how your boundary-setting progress, successes, and challenges will be tracked. As you use the AI Assistant to define boundaries and (in a future version) log your experiences, this dashboard will reflect your personal journey.
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
              <li><strong>Start Defining:</strong> Use the AI Assistant to get advice on a boundary you'd like to set.</li>
              <li><strong>Reflect & Learn:</strong> Consider which types of boundaries (e.g., Financial, Work-Life) are most important for you right now.</li>
              <li><strong>Practice Communication:</strong> Try adapting one example phrase from the AI assistant for a real-life situation this week.</li>
              <li><strong>Observe Challenges:</strong> Note any situations where setting boundaries feels difficult. The AI assistant can help brainstorm strategies.</li>
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
