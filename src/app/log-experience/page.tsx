
"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { allBoundaryTypes, type BoundaryTypeName, incrementStat } from '@/lib/userData';
import { ThumbsUp, Frown, Edit3, MessageSquareText, Sparkles } from 'lucide-react';

export default function LogExperiencePage() {
  const [selectedBoundaryType, setSelectedBoundaryType] = useState<BoundaryTypeName | "">("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [successFeedback, setSuccessFeedback] = useState("");
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setSelectedBoundaryType("");
    setChallengeDescription("");
    setSuccessFeedback("");
  };

  const handleLogChallenge = () => {
    if (!selectedBoundaryType) {
      toast({
        title: "Select Boundary Type",
        description: "Please select the type of boundary you are logging.",
        variant: "destructive",
      });
      return;
    }

    incrementStat(selectedBoundaryType, 'challenged');

    toast({
      title: "Challenge Logged",
      description: `Your challenging experience with the ${selectedBoundaryType} boundary has been recorded. ${challengeDescription ? `Details: "${challengeDescription}"` : ''}`,
      variant: "default",
    });
    resetForm();
  };

  const handleLogSuccess = () => {
    if (!selectedBoundaryType) {
      toast({
        title: "Select Boundary Type",
        description: "Please select the type of boundary you are logging.",
        variant: "destructive",
      });
      return;
    }

    incrementStat(selectedBoundaryType, 'successful');
    setIsFeedbackDialogOpen(true); // Open dialog for optional feedback
    // Toast for success will be shown after dialog interaction or if no feedback is given
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Experience Logged!",
      description: `Your successful experience with the ${selectedBoundaryType} boundary has been recorded. ${successFeedback ? `Your feedback: "${successFeedback}"` : 'Great job!'}`,
      variant: "default",
    });
    setIsFeedbackDialogOpen(false);
    resetForm();
  };

  const handleCloseFeedbackDialog = () => {
    if (!successFeedback) { // if dialog closed without submitting feedback
         toast({
            title: "Experience Logged!",
            description: `Your successful experience with the ${selectedBoundaryType} boundary has been recorded. Keep it up!`,
            variant: "default",
        });
    }
    setIsFeedbackDialogOpen(false);
    resetForm(); // Reset even if "Maybe Later" is clicked
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
              Reflect on your attempts to set boundaries. Select the boundary type. If you faced a challenge, you can describe it. If successful, you can optionally share your experience.
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
                disabled={!selectedBoundaryType}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleLogSuccess} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!selectedBoundaryType}
              >
                <ThumbsUp className="mr-2 h-5 w-5" /> I Successfully Implemented It
              </Button>
              <Button 
                onClick={handleLogChallenge} 
                variant="outline" 
                className="flex-1 border-orange-500 hover:bg-orange-500/10 text-orange-600 hover:text-orange-700"
                disabled={!selectedBoundaryType}
              >
                <Frown className="mr-2 h-5 w-5" /> I Faced a Challenge
              </Button>
            </div>
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
            <DialogFooter className="sm:justify-end gap-2">
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
            <CardTitle className="text-lg font-headline text-primary">Why Log Your Experiences?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-primary-foreground/80 space-y-2">
            <p><strong>Track Progress:</strong> See how you're doing over time on your dashboard.</p>
            <p><strong>Identify Patterns:</strong> Notice which types of boundaries are easier or harder for you. Describing challenges can help you seek more specific advice later.</p>
            <p><strong>Reinforce Learning:</strong> Actively reflecting helps solidify your boundary-setting skills. Sharing successes can be encouraging!</p>
            <p><strong>Personalized Insights:</strong> Your logged data makes the dashboard truly yours.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

