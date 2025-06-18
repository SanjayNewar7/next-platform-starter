
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, MessageSquareText, ThumbsUp, Frown, CalendarDays, Tag, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { type LoggedBoundary } from '@/lib/userData';
import { getBoundaryRecommendation, type BoundaryRecommendationOutput, type BoundaryRecommendationInput } from '@/ai/flows/boundary-recommendation';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

interface BoundaryDisplayCardProps {
  boundary: LoggedBoundary;
  enableFollowUp?: boolean; // To control if follow-up mechanism is shown
}

export default function BoundaryDisplayCard({ boundary, enableFollowUp = false }: BoundaryDisplayCardProps) {
  const { toast } = useToast();
  const [challengeDescription, setChallengeDescription] = useState("");
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [followUpRecommendation, setFollowUpRecommendation] = useState<BoundaryRecommendationOutput | null>(null);
  const [isSituationExpanded, setIsSituationExpanded] = useState(false);

  const toggleSituationExpansion = () => {
    setIsSituationExpanded(!isSituationExpanded);
  };

  const handleGetFollowUpAdvice = async () => {
    if (!challengeDescription.trim()) {
      toast({
        title: "Challenge Description Needed",
        description: "Please describe the challenge you're facing with this boundary before getting new advice.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingFollowUp(true);
    setFollowUpRecommendation(null);

    try {
      const input: BoundaryRecommendationInput = {
        boundaryType: boundary.boundaryType,
        situation: boundary.situation,
        desiredOutcome: boundary.desiredOutcome,
        pastAttempts: boundary.pastAttempts,
        isFollowUp: true,
        previousRecommendation: boundary.recommendation,
        challengeDescription: challengeDescription,
      };
      const result = await getBoundaryRecommendation(input);
      setFollowUpRecommendation(result);
      toast({
        title: "New Advice Generated",
        description: "AI has provided a new strategy based on your challenge.",
      });
    } catch (e: any) {
      console.error("Error getting follow-up recommendation:", e);
      toast({
        title: "Error Generating New Advice",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  const getStatusBadgeVariant = (status: LoggedBoundary['status']) => {
    switch (status) {
      case 'successful':
        return 'default'; 
      case 'challenged':
        return 'destructive'; 
      case 'pending':
      default:
        return 'secondary';
    }
  };
   const getStatusBadgeClasses = (status: LoggedBoundary['status']) => {
    switch (status) {
      case 'successful':
        return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
      case 'challenged':
        return 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200';
      case 'pending':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
    }
  };


  return (
    <Card className="shadow-md w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle 
            className={cn(
              "font-headline text-lg mb-1 leading-tight flex-1 mr-2", // Added flex-1 and mr-2 for better layout with badge
              !isSituationExpanded ? "line-clamp-2 cursor-pointer hover:text-primary" : "cursor-pointer"
            )}
            onClick={toggleSituationExpansion}
            title={isSituationExpanded ? "Show less" : "Show more"}
          >
            {boundary.situation}
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(boundary.status)} className={cn("ml-auto whitespace-nowrap self-start", getStatusBadgeClasses(boundary.status))}>
            {boundary.status.charAt(0).toUpperCase() + boundary.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            <span>Type: {boundary.boundaryType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Defined: {format(new Date(boundary.createdAt), "PP")}</span>
          </div>
          {boundary.loggedAt && (
             <div className="flex items-center gap-1.5">
                {boundary.status === 'successful' ? <ThumbsUp className="h-3.5 w-3.5 text-green-600" /> : <Frown className="h-3.5 w-3.5 text-orange-600" />}
                <span>Logged: {format(new Date(boundary.loggedAt), "PPp")}</span>
             </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">AI's Original Recommendation:</h4>
          <p className="text-sm text-foreground/80 bg-muted/50 p-3 rounded-md whitespace-pre-line">{boundary.recommendation}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">Your Desired Outcome:</h4>
          {boundary.desiredOutcome ? (
            <p className="text-sm text-foreground/80 bg-muted/30 p-3 rounded-md">{boundary.desiredOutcome}</p>
          ) : (
            <p className="text-sm text-muted-foreground/60 bg-muted/30 p-3 rounded-md italic">Not specified or not applicable.</p>
          )}
        </div>

        {boundary.pastAttempts && (
            <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Past Attempts (if any):</h4>
            <p className="text-sm text-foreground/80 bg-muted/30 p-3 rounded-md">{boundary.pastAttempts}</p>
            </div>
        )}
      </CardContent>

      {enableFollowUp && boundary.status === 'challenged' && (
        <CardFooter className="flex-col items-start gap-4 pt-4 border-t">
          <div className="w-full space-y-2">
            <label htmlFor={`challenge-desc-${boundary.id}`} className="text-sm font-medium text-primary flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4" /> Describe the challenge you faced with this advice:
            </label>
            <Textarea
              id={`challenge-desc-${boundary.id}`}
              placeholder="e.g., The person became defensive, or I found it hard to say the words..."
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleGetFollowUpAdvice}
              disabled={isGeneratingFollowUp || !challengeDescription.trim()}
              className="w-full sm:w-auto"
            >
              {isGeneratingFollowUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Get Refined AI Advice
            </Button>
          </div>

          {isGeneratingFollowUp && (
            <div className="flex items-center justify-center p-4 w-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Generating new strategy...</p>
            </div>
          )}

          {followUpRecommendation && (
            <div className="w-full mt-4 space-y-3 p-4 bg-secondary/40 rounded-lg">
              <h3 className="text-md font-semibold text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> New AI Strategy:
              </h3>
              <div>
                <h4 className="font-medium text-foreground mb-1">New Recommendation:</h4>
                <p className="text-sm text-foreground/90 whitespace-pre-line">{followUpRecommendation.recommendation}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Explanation:</h4>
                <p className="text-sm text-foreground/90 whitespace-pre-line">{followUpRecommendation.explanation}</p>
              </div>
              {followUpRecommendation.examplePhrases && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">New Example Phrases:</h4>
                  <Alert variant="default" className="bg-background/70">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-semibold">Try Saying:</AlertTitle>
                    <AlertDescription className="whitespace-pre-line text-sm">
                      {followUpRecommendation.examplePhrases}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-2">
                  Remember to log your experience again if you try this new approach via the "Log Experience" page.
              </p>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

// Helper function to apply cn directly for badge variant styling (already present)
// function cn(...inputs: any[]): string {
//   return inputs.filter(Boolean).join(' ');
// }
