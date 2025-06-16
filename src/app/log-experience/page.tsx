
"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { allBoundaryTypes, type BoundaryTypeName, incrementStat } from '@/lib/userData';
import { ThumbsUp, Frown, Edit3 } from 'lucide-react';

export default function LogExperiencePage() {
  const [selectedBoundaryType, setSelectedBoundaryType] = useState<BoundaryTypeName | "">("");
  const { toast } = useToast();

  const handleLog = (statType: 'successful' | 'challenged') => {
    if (!selectedBoundaryType) {
      toast({
        title: "Select Boundary Type",
        description: "Please select the type of boundary you are logging.",
        variant: "destructive",
      });
      return;
    }

    incrementStat(selectedBoundaryType, statType);

    toast({
      title: "Experience Logged!",
      description: `Your ${statType} experience with the ${selectedBoundaryType} boundary has been recorded.`,
      variant: "default",
    });
    setSelectedBoundaryType(""); // Reset selection
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <Edit3 className="h-7 w-7 text-primary" /> Log Your Boundary Experience
            </CardTitle>
            <CardDescription>
              Reflect on your attempts to set boundaries. Select the boundary type and then log whether it was a success or if you faced a challenge. This helps update your progress dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="boundaryTypeSelect" className="block text-sm font-medium text-foreground mb-2">
                Which type of boundary are you logging?
              </label>
              <Select
                value={selectedBoundaryType}
                onValueChange={(value) => setSelectedBoundaryType(value as BoundaryTypeName | "")}
              >
                <SelectTrigger id="boundaryTypeSelect">
                  <SelectValue placeholder="Select a boundary type..." />
                </SelectTrigger>
                <SelectContent>
                  {allBoundaryTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => handleLog('successful')} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!selectedBoundaryType}
              >
                <ThumbsUp className="mr-2 h-5 w-5" /> I Successfully Implemented It
              </Button>
              <Button 
                onClick={() => handleLog('challenged')} 
                variant="outline" 
                className="flex-1 border-orange-500 hover:bg-orange-500/10 text-orange-600 hover:text-orange-700"
                disabled={!selectedBoundaryType}
              >
                <Frown className="mr-2 h-5 w-5" /> I Faced a Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/30 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-primary">Why Log Your Experiences?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-primary-foreground/80 space-y-2">
            <p><strong>Track Progress:</strong> See how you're doing over time on your dashboard.</p>
            <p><strong>Identify Patterns:</strong> Notice which types of boundaries are easier or harder for you.</p>
            <p><strong>Reinforce Learning:</strong> Actively reflecting helps solidify your boundary-setting skills.</p>
            <p><strong>Personalized Insights:</strong> Your logged data makes the dashboard truly yours.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
