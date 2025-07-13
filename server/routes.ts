import type { Express } from "express";
import { createServer, type Server } from "http";
import Anthropic from '@anthropic-ai/sdk';
import { generateSummarySchema, type SummaryResponse } from "@shared/schema";

/*
The newest Anthropic model is "claude-sonnet-4-20250514", not "claude-3-7-sonnet-20250219", "claude-3-5-sonnet-20241022" nor "claude-3-sonnet-20240229". 
If the user doesn't specify a model, always prefer using "claude-sonnet-4-20250514" as it is the latest model.
*/
const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || "default_key",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate session summary endpoint
  app.post("/api/generate-summary", async (req, res) => {
    try {
      // Validate request body
      const validationResult = generateSummarySchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: validationResult.error.errors 
        });
      }

      const { notes, tone } = validationResult.data;

      // Construct the prompt based on tone
      const toneInstructions = {
        formal: "Use professional but accessible language suitable for clinical documentation.",
        clinical: "Use professional medical terminology and clinical language appropriate for healthcare settings.",
        conversational: "Use natural, easy-to-read language while maintaining professionalism."
      };

      const prompt = `You are a helpful mental health assistant. Based on the therapist's notes below, generate:
1. A clear, concise session summary (2-3 paragraphs)
2. A brief care plan with next steps for the next session

${toneInstructions[tone]}

Important guidelines:
- Only use the information provided in the notes
- Do not add assumptions or information not present in the notes  
- Structure the summary professionally
- Include specific action items and goals for the care plan
- Maintain client confidentiality (avoid specific personal details)

Therapist Notes:
${notes}

Please provide your response in the following format:

SESSION SUMMARY:
[Your session summary here]

CARE PLAN & NEXT STEPS:
[Your care plan here]`;

      // Call Claude API
      const message = await anthropic.messages.create({
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
        model: DEFAULT_MODEL_STR,
      });

      // Parse the response
      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      
      // Split the response into summary and care plan
      const sections = responseText.split('CARE PLAN & NEXT STEPS:');
      if (sections.length !== 2) {
        throw new Error("Invalid response format from Claude API");
      }

      const summary = sections[0].replace('SESSION SUMMARY:', '').trim();
      const carePlan = sections[1].trim();

      const response: SummaryResponse = {
        summary,
        carePlan
      };

      res.json(response);
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ 
        message: "Failed to generate summary. Please check your API key and try again.",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
