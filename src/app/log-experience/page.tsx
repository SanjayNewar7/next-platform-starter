
"use client";

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { allBoundaryTypes, type BoundaryTypeName, type LoggedBoundary, getBoundaries, logBoundaryOutcome } from '@/lib/userData';
import { ThumbsUp, Frown, Edit3, MessageSquareText, Sparkles, ListChecks } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LogExperiencePage() {
  const [selectedBoundaryType, setSelectedBoundaryType] = useState<BoundaryTypeName | "">("");
  const [availableBoundaries, setAvailableBoundaries] = useState<LoggedBoundary[]>([]);
  const [selectedBoundaryId, setSelectedBoundaryId] = useState<string>("");
  
  const [challengeDescription, setChallengeDescription] = useState("");
  const [successFeedback, setSuccessFeedback] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedBoundaryType) {
      const boundaries = getBoundaries(selectedBoundaryType).filter(b => b.status === 'pending'); // Only show pending
      setAvailableBoundaries(boundaries);
      setSelectedBoundaryId(""); // Reset specific boundary selection
    } else {
      setAvailableBoundaries([]);
      setSelectedBoundaryId("");
    }
  }, [selectedBoundaryType]);

  const resetForm = () => {
    setSelectedBoundaryType("");
    setAvailableBoundaries([]);
    setSelectedBoundaryId("");
    setChallengeDescription("");
    setSuccessFeedback("");
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

    if (outcome === 'successful') {
      setIsFeedbackDialogOpen(true); // Open dialog for optional feedback
    } else { // Challenged
      toast({
        title: "Challenge Logged",
        description: `Your challenging experience with the selected boundary has been recorded. ${challengeDescription ? `Details: "${challengeDescription.substring(0,50)}..."` : ''}`,
        variant: "default",
      });
      resetForm();
    }
  };
  
  const handleSubmitFeedback = () => {
    toast({
      title: "Experience Logged!",
      description: `Your successful experience with the selected boundary has been recorded. ${successFeedback ? `Your feedback: "${successFeedback.substring(0,50)}..."` : 'Great job!'}`,
      variant: "default",
    });
    setIsFeedbackDialogOpen(false);
    resetForm();
  };

  const handleCloseFeedbackDialog = () => {
    if (!successFeedback && selectedBoundaryId) { // if dialog closed without submitting feedback for a success
         toast({
            title: "Experience Logged!",
            description: `Your successful experience with the selected boundary has been recorded. Keep it up!`,
            variant: "default",
        });
    }
    setIsFeedbackDialogOpen(false);
    resetForm(); 
  };

  const getTruncatedText = (text: string, maxLength = 70) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <Edit3 className="h-7 w-7 text-primary" /> Log Your Boundary Experience
            </CardTitle>
            <CardDescription>
              Reflect on a specific boundary you previously defined with the AI. Select its type, then the specific situation.
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
                  2. Which specific boundary situation is this for?
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
                            <div className="flex flex-col text-left">
                                <span className="font-medium">{getTruncatedText(boundary.situation, 50)}</span>
                                <span className="text-xs text-muted-foreground">
                                  Defined: {new Date(boundary.createdAt).toLocaleDateString()} - AI Said: {getTruncatedText(boundary.recommendation, 40)}
                                </span>
                            </div>
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
                    Describe the challenge (optional, if logging a challenge):
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
                  >
                    <ThumbsUp className="mr-2 h-5 w-5" /> I Successfully Implemented It
                  </Button>
                  <Button 
                    onClick={() => handleLogOutcome('challenged')} 
                    variant="outline" 
                    className="flex-1 border-orange-500 hover:bg-orange-500/10 text-orange-600 hover:text-orange-700"
                  >
                    <Frown className="mr-2 h-5 w-5" /> I Faced a Challenge
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
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
          <CardContent className="text-sm text-primary-foreground/80 space-y-2">
            <p><strong>Precise Tracking:</strong> Pinpoint exactly which boundary situations are progressing well or need more attention.</p>
            <p><strong>Targeted Reflection:</strong> Reflecting on a specific scenario (situation and AI advice) helps solidify learning and identify patterns.</p>
            <p><strong>Clearer Dashboard Insights:</strong> Your dashboard will more accurately represent your journey with each defined boundary.</p>
            <p><strong>Focus Your Efforts:</strong> Understand which advice works best for you in particular contexts.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
