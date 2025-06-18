
// boundary-recommendation.ts
'use server';

/**
 * @fileOverview An AI agent that provides personalized boundary-setting strategies,
 *               with consideration for a Nepali audience. Can also provide follow-up
 *               advice for challenged recommendations.
 *
 * - getBoundaryRecommendation - A function that provides boundary recommendations.
 * - BoundaryRecommendationInput - The input type for the getBoundaryRecommendation function.
 * - BoundaryRecommendationOutput - The return type for the getBoundaryRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BoundaryTypes = [
  "Financial", 
  "Educational", 
  "Social Relationships", 
  "Work-Life Balance", 
  "Personal Time & Space",
  "Fitness & Health",
  "Business & Entrepreneurship"
] as const;

const BoundaryRecommendationInputSchema = z.object({
  boundaryType: z.enum(BoundaryTypes)
    .describe('The type of boundary the user needs help with.'),
  situation: z
    .string()
    .describe('A detailed description of the situation where boundary setting is needed. For follow-up advice, this is the original situation.'),
  desiredOutcome: z
    .string()
    .describe('The user\'s desired outcome or goal in this situation. For follow-up advice, this is the original desired outcome.'),
  pastAttempts: z
    .string()
    .optional()
    .describe('Optional: A description of previous attempts to set boundaries in similar situations and their outcomes. For follow-up advice, these are the original past attempts.'),
  
  // Fields for follow-up advice
  isFollowUp: z.boolean().optional().describe('Set to true if this is a follow-up request on a previous recommendation.'),
  previousRecommendation: z
    .string()
    .optional()
    .describe('The previous AI recommendation that the user found challenging.'),
  challengeDescription: z
    .string()
    .optional()
    .describe('The specific challenge the user faced with the previous recommendation.'),
});
export type BoundaryRecommendationInput = z.infer<typeof BoundaryRecommendationInputSchema>;

const BoundaryRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('A personalized strategy for setting boundaries in the given situation, considering the desired outcome, past attempts, and boundary type. If it is a follow-up, this is a refined strategy.'),
  explanation: z
    .string()
    .describe('A detailed explanation of why the recommended strategy is appropriate and how it addresses the user\'s needs, including Nepali cultural context where relevant. For follow-ups, this explains the refined strategy.'),
  examplePhrases: z
    .string()
    .optional()
    .describe('Optional: Example phrases the user can use to communicate their boundaries in this situation, ideally adaptable for Nepali interactions. For follow-ups, these are refined phrases.'),
});
export type BoundaryRecommendationOutput = z.infer<typeof BoundaryRecommendationOutputSchema>;

export async function getBoundaryRecommendation(input: BoundaryRecommendationInput): Promise<BoundaryRecommendationOutput> {
  return boundaryRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'boundaryRecommendationPrompt',
  input: {schema: BoundaryRecommendationInputSchema},
  output: {schema: BoundaryRecommendationOutputSchema},
  prompt: `You are a personal boundary expert specializing in providing advice relevant to a Nepali audience.

{{#if isFollowUp}}
A user previously received advice for setting a boundary, but they encountered a challenge.
Here's the context:
Original Situation: {{{situation}}}
Desired Outcome: {{{desiredOutcome}}}
{{#if pastAttempts}}Original Past Attempts: {{{pastAttempts}}}{{/if}}
Previous AI Recommendation: {{{previousRecommendation}}}
Challenge Faced By User: {{{challengeDescription}}}

Your task is to provide a NEW, refined strategy to help the user overcome this specific challenge and achieve their desired outcome.
Focus on actionable steps and explain why this new approach might be more effective, considering the challenge described by the user.
If relevant, provide updated example phrases that are sensitive to Nepali cultural nuances.
The boundary type is: {{{boundaryType}}}
{{else}}
A user needs help setting a boundary.
Boundary Type: {{{boundaryType}}}
Situation: {{{situation}}}
Desired Outcome: {{{desiredOutcome}}}
{{#if pastAttempts}}Past Attempts: {{{pastAttempts}}}{{/if}}

Your task is to provide a personalized boundary-setting strategy.
Explain why it's appropriate, considering Nepali cultural nuances and contexts where applicable.
Suggest example phrases that can be adapted for communication in Nepal.
For 'Financial' boundaries, advice should be relevant to Nepal, using NPR (Nepali Rupees) as the currency context if amounts are discussed, and address common financial situations.
{{/if}}

Provide your response in the following format:
Recommendation: [Your recommended strategy]
Explanation: [A detailed explanation of why the strategy is appropriate, including relevant Nepali cultural context]
Example Phrases: [Optional: Example phrases the user can use, adaptable for Nepali interactions]
`,
});

const boundaryRecommendationFlow = ai.defineFlow(
  {
    name: 'boundaryRecommendationFlow',
    inputSchema: BoundaryRecommendationInputSchema,
    outputSchema: BoundaryRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
