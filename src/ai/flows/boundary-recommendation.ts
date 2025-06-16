// boundary-recommendation.ts
'use server';

/**
 * @fileOverview An AI agent that provides personalized boundary-setting strategies,
 *               with consideration for a Nepali audience.
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
  "Personal Time & Space"
] as const;

const BoundaryRecommendationInputSchema = z.object({
  boundaryType: z.enum(BoundaryTypes)
    .describe('The type of boundary the user needs help with.'),
  situation: z
    .string()
    .describe('A detailed description of the situation where boundary setting is needed.'),
  desiredOutcome: z
    .string()
    .describe('The user\'s desired outcome or goal in this situation.'),
  pastAttempts: z
    .string()
    .optional()
    .describe('Optional: A description of previous attempts to set boundaries in similar situations and their outcomes.'),
});
export type BoundaryRecommendationInput = z.infer<typeof BoundaryRecommendationInputSchema>;

const BoundaryRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('A personalized strategy for setting boundaries in the given situation, considering the desired outcome, past attempts, and boundary type.'),
  explanation: z
    .string()
    .describe('A detailed explanation of why the recommended strategy is appropriate and how it addresses the user\'s needs, including Nepali cultural context where relevant.'),
  examplePhrases: z
    .string()
    .optional()
    .describe('Optional: Example phrases the user can use to communicate their boundaries in this situation, ideally adaptable for Nepali interactions.'),
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
A user will describe a situation, their desired outcome, the type of boundary, and optionally, previous attempts to set boundaries.

Your task is to provide a personalized boundary-setting strategy.
Explain why it's appropriate, considering Nepali cultural nuances and contexts where applicable.
Suggest example phrases that can be adapted for communication in Nepal.
For 'Financial' boundaries, advice should be relevant to Nepal, using NPR (Nepali Rupees) as the currency context if amounts are discussed, and address common financial situations.

Boundary Type: {{{boundaryType}}}
Situation: {{{situation}}}
Desired Outcome: {{{desiredOutcome}}}
Past Attempts: {{{pastAttempts}}}

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
