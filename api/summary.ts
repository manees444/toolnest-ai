import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Simplified schema validation for Vercel
const validateRequest = (data: any) => {
  if (!data.sessionNotes || typeof data.sessionNotes !== 'string') {
    throw new Error('sessionNotes is required');
  }
  return {
    sessionNotes: data.sessionNotes,
    tone: data.tone || 'formal',
    outputFormat: data.outputFormat || 'paragraph',
    sessionDate: data.sessionDate || ''
  };
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = validateRequest(req.body);
    
    // Create tone-specific prompt
    let toneInstruction = "";
    switch (body.tone) {
      case "clinical":
        toneInstruction = "Use professional clinical language appropriate for medical documentation. Include relevant therapeutic terminology and maintain a formal, objective tone suitable for healthcare settings.";
        break;
      case "formal":
        toneInstruction = "Use professional but accessible language suitable for clinical documentation. Balance formality with readability while maintaining therapeutic professionalism.";
        break;
      case "conversational":
        toneInstruction = "Use natural, easy-to-read language while maintaining professionalism. Make the content approachable but still appropriate for therapeutic documentation.";
        break;
    }

    const formatInstruction = body.outputFormat === "bullet" ? 
      "Format the output using bullet points and lists where appropriate." :
      "Format the output in well-structured paragraphs.";

    const systemPrompt = `You are an AI assistant specialized in helping mental health professionals create professional documentation. Your task is to transform rough therapy session notes into structured, professional summaries and care plans.

${toneInstruction}

${formatInstruction}

Always maintain client confidentiality and use professional therapeutic language. Structure your response with clear sections for session summary and care plan.`;

    const userPrompt = `Please convert these therapy session notes into a professional format:

${body.sessionNotes}

Please provide:
1. **Session Summary**: A professional summary of the session including key observations, client presentation, and therapeutic interventions used.
2. **Care Plan**: Specific, actionable next steps for continued treatment including recommendations for future sessions, homework/between-session tasks, and any referrals or additional resources needed.

${body.sessionDate ? `Session Date: ${body.sessionDate}` : ''}

Include a section for therapist comments at the end.`;

    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      system: systemPrompt,
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: userPrompt
      }]
    });

    const content = response.content[0]?.text || '';
    
    // Split content into summary and care plan
    const sections = content.split(/(?=\*\*Care Plan\*\*|\*\*2\. Care Plan\*\*|2\.\s*\*\*Care Plan\*\*)/i);
    const summary = sections[0]?.replace(/^\*\*Session Summary\*\*|^1\.\s*\*\*Session Summary\*\*|^Session Summary:/i, '').trim() || content;
    const carePlan = sections[1]?.replace(/^\*\*Care Plan\*\*|^2\.\s*\*\*Care Plan\*\*|^Care Plan:/i, '').trim() || '';

    res.status(200).json({
      summary: summary,
      carePlan: carePlan || 'Please review session notes and develop appropriate care plan based on client needs and therapeutic goals.'
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    
    if (error instanceof Error) {
      res.status(500).json({ 
        error: 'Failed to generate summary. Please check your notes and try again.',
        details: error.message
      });
    } else {
      res.status(500).json({ 
        error: 'An unexpected error occurred. Please try again.'
      });
    }
  }
}