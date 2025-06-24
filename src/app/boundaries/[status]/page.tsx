
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import BoundaryDisplayCard from '@/components/BoundaryDisplayCard';
import { getBoundaries, type LoggedBoundary, type BoundaryStatus } from '@/lib/userData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Inbox, AlertTriangle, CheckCircle, Hourglass, ListChecks } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';

type StatusParam = BoundaryStatus | 'all';

const statusPageConfig: Record<StatusParam, { title: string; description: string; icon: React.ElementType }> = {
  all: { title: "All Defined Boundaries", description: "A complete list of all boundary situations you've explored with the AI.", icon: ListChecks },
  pending: { title: "Pending Boundaries", description: "Boundaries you've defined with the AI but haven't logged an outcome for yet.", icon: Hourglass },
  successful: { title: "Successfully Implemented Boundaries", description: "Boundaries you've logged as successfully applied.", icon: CheckCircle },
  challenged: { title: "Challenged Boundaries", description: "Boundaries you've logged as challenging to implement. You can get refined AI advice here.", icon: AlertTriangle },
};

export default function BoundariesListPage() {
  const router = useRouter();
  const params = useParams();
  const status = params.status as StatusParam;
  const { user } = useAuth();

  const [boundaries, setBoundaries] = useState<LoggedBoundary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status && user) {
      const fetchBoundaries = async () => {
        setIsLoading(true);
        try {
          const fetchedBoundaries = await getBoundaries(status);
          setBoundaries(fetchedBoundaries);
        } catch (error) {
          console.error("Error fetching boundaries:", error);
          // Optionally set an error state to show in the UI
        } finally {
          setIsLoading(false);
        }
      };
      fetchBoundaries();
    }
  }, [status, user]);

  const config = statusPageConfig[status] || statusPageConfig.all;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-1/3 bg-muted rounded-md"></div>
          <div className="h-10 w-3/4 bg-muted rounded-md"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <config.icon className="h-7 w-7 text-primary" />
              {config.title}
            </CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {boundaries.length === 0 ? (
              <div className="text-center py-10">
                <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">No boundaries found for this category.</p>
                {status === 'all' && <p className="text-sm text-muted-foreground">Try using the <a href="/assistant" className="text-primary hover:underline">AI Assistant</a> to define some boundaries.</p>}
                {status !== 'all' && <p className="text-sm text-muted-foreground">Log your experiences on the <a href="/log-experience" className="text-primary hover:underline">My Experience page</a>.</p>}
              </div>
            ) : (
              <div className="space-y-4">
                {boundaries.map((boundary) => (
                  <BoundaryDisplayCard 
                    key={boundary.id} 
                    boundary={boundary} 
                    enableFollowUp={status === 'challenged'} 
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
