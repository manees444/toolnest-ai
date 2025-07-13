import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    const { type, feedback, metadata } = req.body;
    
    // Log feedback to Vercel function logs
    console.log("=== USER FEEDBACK RECEIVED ===");
    console.log("Type:", type);
    console.log("Feedback:", feedback);
    console.log("Metadata:", JSON.stringify(metadata, null, 2));
    console.log("Timestamp:", new Date().toISOString());
    console.log("==============================");
    
    res.status(200).json({ 
      success: true, 
      message: "Feedback received and logged" 
    });

  } catch (error) {
    console.error('Error processing feedback:', error);
    res.status(500).json({ 
      error: 'Failed to process feedback',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}