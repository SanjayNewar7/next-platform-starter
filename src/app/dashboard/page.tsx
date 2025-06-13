
import AppLayout from '@/components/AppLayout';
import ProgressChart from '@/components/dashboard/ProgressChart';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { Target, CheckCircle, ShieldAlert, TrendingUp } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function DashboardPage() {
  // Mock data for summary cards
  const summaryData = [
    { title: "Total Boundaries Defined", value: "25", icon: Target, description: "Across all areas of life." },
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
          <AlertTitle className="font-headline text-primary">Welcome Back!</AlertTitle>
          <AlertDescription className="text-primary-foreground/80">
            This is your space to track and celebrate your journey in setting healthy boundaries. Remember, progress is unique to you.
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
            <CardTitle className="font-headline">Next Steps & Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Review your "Challenging Situations" and identify patterns.</li>
              <li>Practice one new boundary-setting phrase this week from the AI Assistant.</li>
              <li>Reflect on a recent situation where you successfully maintained a boundary.</li>
            </ul>
            <Button className="mt-4">
              <Link href="/assistant">Get AI Boundary Advice</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}

// Dummy components for Card and Button if not already defined or to avoid import issues during generation
// In a real scenario, these would be imported from "@/components/ui/..."
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Button = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) => <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}>{children}</button>;
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react'; // Ensure ShieldCheck is imported if used.
