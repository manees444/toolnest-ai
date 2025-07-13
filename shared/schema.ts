import { z } from "zod";

// Request schema for session summary generation
export const generateSummarySchema = z.object({
  notes: z.string().min(10, "Notes must be at least 10 characters long"),
  tone: z.enum(["formal", "clinical", "conversational"]),
});

// Response schema for generated summaries
export const summaryResponseSchema = z.object({
  summary: z.string(),
  carePlan: z.string(),
});

export type GenerateSummaryRequest = z.infer<typeof generateSummarySchema>;
export type SummaryResponse = z.infer<typeof summaryResponseSchema>;

// No database models needed for this stateless application
export const users = null; // Placeholder to maintain existing structure
export type User = {};
export type InsertUser = {};
