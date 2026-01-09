'use server';

/**
 * @fileOverview AI agent that predicts academic risk for students.
 *
 * - academicRiskPredictor - A function that calculates an academic risk score and provides preventive actions.
 * - AcademicRiskPredictorInput - The input type for the academicRiskPredictor function.
 * - AcademicRiskPredictorOutput - The return type for the academicRiskPredictor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicRiskPredictorInputSchema = z.object({
  attendancePercentage: z
    .number()
    .describe('The student’s overall attendance percentage.'),
  assignmentsDelayed: z
    .number()
    .describe('The number of assignments submitted after the deadline.'),
  productivityScore: z
    .number()
    .describe(
      'A score representing the student’s task completion and productivity.'
    ),
  selfReportedStress: z
    .number()
    .describe(
      'The student’s self-reported stress level, on a scale of 1 to 5.'
    ),
});
export type AcademicRiskPredictorInput = z.infer<
  typeof AcademicRiskPredictorInputSchema
>;

const AcademicRiskPredictorOutputSchema = z.object({
  academicRiskScore: z
    .number()
    .describe(
      'A calculated risk score from 0 to 100, where higher means more academic risk.'
    ),
  riskAnalysis: z
    .string()
    .describe(
      'A qualitative analysis explaining the reasons for the calculated risk score.'
    ),
  preventiveActions: z
    .array(z.string())
    .describe(
      'A list of suggested, actionable steps the student can take to mitigate the academic risk.'
    ),
});
export type AcademicRiskPredictorOutput = z.infer<
  typeof AcademicRiskPredictorOutputSchema
>;

export async function academicRiskPredictor(
  input: AcademicRiskPredictorInput
): Promise<AcademicRiskPredictorOutput> {
  return academicRiskPredictorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'academicRiskPredictorPrompt',
  input: {schema: AcademicRiskPredictorInputSchema},
  output: {schema: AcademicRiskPredictorOutputSchema},
  prompt: `You are an academic advisor AI for university students. Your goal is to assess a student's academic risk based on the provided data and offer supportive, actionable advice.

  Student Data:
  - Attendance: {{{attendancePercentage}}}%
  - Delayed Assignments: {{{assignmentsDelayed}}}
  - Recent Productivity Score: {{{productivityScore}}}/100
  - Self-Reported Stress Level: {{{selfReportedStress}}}/5

  Tasks:
  1.  Calculate an 'academicRiskScore' from 0 (no risk) to 100 (high risk). Base this on a holistic view of the inputs. Low attendance and high stress should weigh heavily.
  2.  Write a brief 'riskAnalysis' explaining the score in a supportive tone. Connect the different data points (e.g., "Low attendance might be related to high stress...").
  3.  Generate a list of 2-3 concrete, actionable 'preventiveActions'. Focus on small, manageable steps. Avoid generic advice.

  Example Output (for a different user):
  {
    "academicRiskScore": 65,
    "riskAnalysis": "Your risk score is elevated primarily due to low attendance and a high stress level. This combination can make it challenging to keep up with coursework, even though your productivity score is moderate.",
    "preventiveActions": [
      "Try attending just one more class this week than you did last week. It's a small step.",
      "Block out a 30-minute 'no-study' period each day to de-stress with music or a walk.",
      "For your next assignment, try breaking the first task into a tiny 15-minute action."
    ]
  }
  `,
});

const academicRiskPredictorFlow = ai.defineFlow(
  {
    name: 'academicRiskPredictorFlow',
    inputSchema: AcademicRiskPredictorInputSchema,
    outputSchema: AcademicRiskPredictorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
