
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Send, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getBoundaryRecommendation, type BoundaryRecommendationInput, type BoundaryRecommendationOutput } from '@/ai/flows/boundary-recommendation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const boundaryTypes = [
  "Financial", 
  "Educational", 
  "Social Relationships", 
  "Work-Life Balance", 
  "Personal Time & Space"
] as const;

const formSchema = z.object({
  boundaryType: z.enum(boundaryTypes, {
    required_error: "Please select a type of boundary.",
  }),
  situation: z.string().min(10, { message: "Please describe the situation in at least 10 characters." }).max(1000),
  desiredOutcome: z.string().min(5, { message: "Desired outcome must be at least 5 characters." }).max(500),
  pastAttempts: z.string().max(500).optional(),
});

export default function BoundaryAssistantForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<BoundaryRecommendationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      situation: "",
      desiredOutcome: "",
      pastAttempts: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setRecommendation(null);
    try {
      const input: BoundaryRecommendationInput = {
        boundaryType: values.boundaryType,
        situation: values.situation,
        desiredOutcome: values.desiredOutcome,
        pastAttempts: values.pastAttempts || undefined,
      };
      const result = await getBoundaryRecommendation(input);
      setRecommendation(result);
      // Toast is disabled for now as per user request to only use for errors
      // toast({
      //   title: "Recommendation Generated",
      //   description: "AI has provided a boundary strategy.",
      // });
    } catch (e: any) {
      console.error("Error getting recommendation:", e);
      toast({
        title: "Error Generating Recommendation",
        description: e.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl">
            <Sparkles className="h-7 w-7 text-primary" /> AI Boundary Assistant
          </CardTitle>
          <CardDescription>
            Select the type of boundary, describe your situation, desired outcome, and any past attempts. Our AI will provide personalized boundary-setting strategies tailored for a Nepali context.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="boundaryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Boundary</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a boundary type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boundaryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe the Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., My relative frequently asks for money that I cannot afford to lend..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your Desired Outcome?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., To politely decline without damaging our family relationship." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastAttempts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Attempts (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I tried saying I didn't have much, but they insisted."
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Get AI Recommendation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="ml-3 text-muted-foreground">Generating your personalized strategy (considering Nepali context)...</p>
        </div>
      )}

      {recommendation && (
        <Card className="mt-8 shadow-lg bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary">Your AI-Powered Boundary Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Recommended Strategy:</h4>
              <p className="text-foreground/90 whitespace-pre-line">{recommendation.recommendation}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Explanation (Nepali Context):</h4>
              <p className="text-foreground/90 whitespace-pre-line">{recommendation.explanation}</p>
            </div>
            {recommendation.examplePhrases && (
              <div>
                <h4 className="font-semibold text-foreground mb-1">Example Phrases (Adaptable for Nepali):</h4>
                <Alert variant="default" className="bg-card">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <AlertTitle className="font-semibold">Try Saying:</AlertTitle>
                  <AlertDescription className="whitespace-pre-line">
                    {recommendation.examplePhrases}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
