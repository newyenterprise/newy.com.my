import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'AI API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const enhancedPrompt = `You are a professional blog content writer. Write engaging, well-structured content based on this request: "${prompt}". 
    
    Guidelines:
    - Write in a clear, professional tone
    - Use HTML formatting (p, h2, h3, ul, ol, strong, em tags)
    - Make it engaging and informative
    - Keep paragraphs concise
    - Include relevant examples when appropriate
    - Do not include title or h1 tags
    - Return only the HTML content, no markdown`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const content = response.text();

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

