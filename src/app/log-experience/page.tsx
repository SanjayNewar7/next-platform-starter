
"use client";

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { allBoundaryTypes, type BoundaryTypeName, type LoggedBoundary, getBoundaries, logBoundaryOutcome, getBoundaryById } from '@/lib/userData';
import { getBoundaryRecommendation, type BoundaryRecommendationOutput, type BoundaryRecommendationInput } from '@/ai/flows/boundary-recommendation';
import { ThumbsUp, Frown, Edit3, MessageSquareText, Sparkles, ListChecks, HelpCircle, Loader2, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

export default function MyExperiencePage() {
  const [selectedBoundaryType, setSelectedBoundaryType] = useState<BoundaryTypeName | "">("");
  const [availableBoundaries, setAvailableBoundaries] = useState<LoggedBoundary[]>([]);
  const [selectedBoundaryId, setSelectedBoundaryId] = useState<string>("");
  
  const [challengeDescription, setChallengeDescription] = useState("");
  const [successFeedback, setSuccessFeedback] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const { toast } = useToast();

  const [showFollowUpButton, setShowFollowUpButton] = useState(false);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [followUpRecommendation, setFollowUpRecommendation] = useState<BoundaryRecommendationOutput | null>(null);

  useEffect(() => {
    if (selectedBoundaryType) {
      const boundaries = getBoundaries(selectedBoundaryType).filter(b => b.status === 'pending');
      setAvailableBoundaries(boundaries);
      setSelectedBoundaryId(""); 
      setShowFollowUpButton(false);
      setFollowUpRecommendation(null);
      setChallengeDescription("");
    } else {
      setAvailableBoundaries([]);
      setSelectedBoundaryId("");
      setShowFollowUpButton(false);
      setFollowUpRecommendation(null);
      setChallengeDescription("");
    }
  }, [selectedBoundaryType]);

  useEffect(() => {
    // Reset follow-up state if selected boundary changes
    setShowFollowUpButton(false);
    setFollowUpRecommendation(null);
    // Keep challengeDescription as it might be typed before selecting a boundary
  }, [selectedBoundaryId]);


  const resetForm = () => {
    setSelectedBoundaryType("");
    setAvailableBoundaries([]);
    setSelectedBoundaryId("");
    setChallengeDescription("");
    setSuccessFeedback("");
    setShowFollowUpButton(false);
    setFollowUpRecommendation(null);
  };

  const handleLogOutcome = (outcome: 'successful' | 'challenged') => {
    if (!selectedBoundaryId) {
      toast({
        title: "Select Specific Boundary",
        description: "Please select the specific boundary situation you are logging.",
        variant: "destructive",
      });
      return;
    }

    logBoundaryOutcome(selectedBoundaryId, outcome);
    setFollowUpRecommendation(null); // Clear any existing follow-up advice

    if (outcome === 'successful') {
      setShowFollowUpButton(false);
      setIsFeedbackDialogOpen(true); 
    } else { // Challenged
      toast({
        title: "Challenge Logged",
        description: `Your challenging experience has been recorded. ${challengeDescription ? `Details: "${challengeDescription.substring(0,50)}..."` : ''}`,
        variant: "default",
      });
      // Don't reset the whole form, just update available boundaries and set up for follow-up
      const updatedBoundaries = getBoundaries(selectedBoundaryType as BoundaryTypeName).filter(b => b.status === 'pending');
      setAvailableBoundaries(updatedBoundaries);
      setShowFollowUpButton(true); // Show button to get new advice
      // setSelectedBoundaryId(""); // Keep selected ID for follow-up context
    }
  };
  
  const handleSubmitFeedback = () => {
    toast({
      title: "Experience Logged!",
      description: `Your successful experience has been recorded. ${successFeedback ? `Your feedback: "${successFeedback.substring(0,50)}..."` : 'Great job!'}`,
      variant: "default",
    });
    setIsFeedbackDialogOpen(false);
    resetForm();
  };

  const handleCloseFeedbackDialog = () => {
    if (!successFeedback && selectedBoundaryId) { 
         toast({
            title: "Experience Logged!",
            description: `Your successful experience has been recorded. Keep it up!`,
            variant: "default",
        });
    }
    setIsFeedbackDialogOpen(false);
    resetForm(); 
  };

  const handleGetFollowUpAdvice = async () => {
    if (!selectedBoundaryId || !challengeDescription) {
      toast({
        title: "Missing Information",
        description: "Please ensure a boundary is selected and you've described the challenge before getting new advice.",
        variant: "destructive",
      });
      return;
    }

    const challengedBoundary = getBoundaryById(selectedBoundaryId);
    if (!challengedBoundary) {
      toast({ title: "Error", description: "Could not find the selected boundary details.", variant: "destructive" });
      return;
    }

    setIsGeneratingFollowUp(true);
    setFollowUpRecommendation(null);

    try {
      const input: BoundaryRecommendationInput = {
        boundaryType: challengedBoundary.boundaryType,
        situation: challengedBoundary.situation, // Original situation
        desiredOutcome: challengedBoundary.desiredOutcome, // Original desired outcome
        pastAttempts: challengedBoundary.pastAttempts, // Original past attempts
        isFollowUp: true,
        previousRecommendation: challengedBoundary.recommendation,
        challengeDescription: challengeDescription,
      };
      const result = await getBoundaryRecommendation(input);
      setFollowUpRecommendation(result);
      toast({
        title: "New Advice Generated",
        description: "AI has provided a new strategy based on your challenge.",
        variant: "default",
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


  const getTruncatedText = (text: string, maxLength = 70) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <Edit3 className="h-7 w-7 text-primary" /> My Experience
            </CardTitle>
            <CardDescription>
              Select a boundary you defined with the AI. Log if it was successful or challenging. If challenging, describe it and you can get new AI advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="boundaryTypeSelect" className="block text-sm font-medium text-foreground mb-2">
                1. Which type of boundary are you logging?
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

            {selectedBoundaryType && (
              <div>
                <label htmlFor="specificBoundarySelect" className="block text-sm font-medium text-foreground mb-2">
                  2. Which specific boundary situation is this for? (Only pending logs are shown)
                </label>
                <Select
                  value={selectedBoundaryId}
                  onValueChange={(value) => setSelectedBoundaryId(value)}
                  disabled={availableBoundaries.length === 0}
                >
                  <SelectTrigger id="specificBoundarySelect">
                    <SelectValue placeholder={availableBoundaries.length === 0 ? "No pending boundaries of this type" : "Select a specific situation..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBoundaries.length > 0 ? (
                       <ScrollArea className="h-auto max-h-60">
                        {availableBoundaries.map((boundary) => (
                          <SelectItem key={boundary.id} value={boundary.id}>
                            <span className="font-medium">{getTruncatedText(boundary.situation, 50)}</span>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    ) : (
                      <SelectItem value="no-boundaries" disabled>No pending boundaries of this type defined.</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedBoundaryId && (
              <>
                <div>
                  <label htmlFor="challengeDescription" className="block text-sm font-medium text-foreground mb-2">
                    Describe the challenge (Required if logging a challenge and want new AI advice):
                  </label>
                  <Textarea
                    id="challengeDescription"
                    placeholder="e.g., They still insisted even after I tried the suggested phrase..."
                    value={challengeDescription}
                    onChange={(e) => setChallengeDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => handleLogOutcome('successful')} 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={isGeneratingFollowUp}
                  >
                    <ThumbsUp className="mr-2 h-5 w-5" /> I Successfully Implemented It
                  </Button>
                  <Button 
                    onClick={() => handleLogOutcome('challenged')} 
                    variant="outline" 
                    className="flex-1 border-orange-500 hover:bg-orange-500/10 text-orange-600 hover:text-orange-700"
                    disabled={isGeneratingFollowUp}
                  >
                    <Frown className="mr-2 h-5 w-5" /> I Faced a Challenge
                  </Button>
                </div>

                {showFollowUpButton && selectedBoundaryId && (
                  <Card className="mt-4 bg-secondary/30 border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-lg font-headline text-primary flex items-center gap-2">
                           <HelpCircle className="h-6 w-6" /> Need New Advice?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-3">
                        If the previous advice didn't work, describe the challenge you faced in the textarea above, then click below to get a new AI-powered strategy.
                      </p>
                      <Button 
                        onClick={handleGetFollowUpAdvice} 
                        disabled={isGeneratingFollowUp || !challengeDescription.trim()}
                        className="w-full"
                      >
                        {isGeneratingFollowUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Get New AI Suggestion for this Challenge
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>
        
        {isGeneratingFollowUp && (
            <div className="flex justify-center items-center p-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Generating your new personalized strategy...</p>
            </div>
        )}

        {followUpRecommendation && (
            <Card className="mt-6 shadow-lg bg-card">
            <CardHeader>
                <CardTitle className="font-headline text-xl text-primary flex items-center gap-2">
                    <Sparkles className="h-6 w-6" /> Refined AI Strategy for Your Challenge
                </CardTitle>
                <CardDescription>Here's new advice based on the challenge you described.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                <h4 className="font-semibold text-foreground mb-1">New Recommended Strategy:</h4>
                <p className="text-foreground/90 whitespace-pre-line">{followUpRecommendation.recommendation}</p>
                </div>
                <div>
                <h4 className="font-semibold text-foreground mb-1">Explanation:</h4>
                <p className="text-foreground/90 whitespace-pre-line">{followUpRecommendation.explanation}</p>
                </div>
                {followUpRecommendation.examplePhrases && (
                <div>
                    <h4 className="font-semibold text-foreground mb-1">New Example Phrases:</h4>
                    <Alert variant="default" className="bg-secondary/50">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-semibold">Try Saying:</AlertTitle>
                    <AlertDescription className="whitespace-pre-line">
                        {followUpRecommendation.examplePhrases}
                    </AlertDescription>
                    </Alert>
                </div>
                )}
                 <CardFooter className="pt-4">
                    <p className="text-xs text-muted-foreground">
                        Remember to log your experience again if you try this new approach! This helps track what works best for you.
                    </p>
                </CardFooter>
            </CardContent>
            </Card>
        )}

        <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Share Your Success!</DialogTitle>
              <DialogDescription>
                That's great to hear! Would you like to share any details about your successful experience? (Optional)
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="e.g., It felt empowering to say no clearly. They respected my decision."
              value={successFeedback}
              onChange={(e) => setSuccessFeedback(e.target.value)}
              rows={4}
            />
            <DialogFooter className="sm:justify-end gap-2 pt-4">
               <Button type="button" variant="outline" onClick={handleCloseFeedbackDialog}>
                Maybe Later
              </Button>
              <Button type="button" onClick={handleSubmitFeedback}>
                <MessageSquareText className="mr-2 h-4 w-4"/> Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="bg-secondary/30 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-primary flex items-center gap-2">
              <ListChecks /> Why Log Specific Experiences?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80 space-y-2">
            <p><strong>Precise Tracking:</strong> Pinpoint exactly which boundary situations are progressing well or need more attention.</p>
            <p><strong>Targeted Reflection:</strong> Reflecting on a specific scenario helps solidify learning and identify patterns.</p>
            <p><strong>Personalized Follow-up:</strong> If advice doesn't work, describe the challenge to get refined AI suggestions tailored to that specific boundary.</p>
            <p><strong>Clearer Dashboard Insights:</strong> Your dashboard will more accurately represent your journey with each defined boundary.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
