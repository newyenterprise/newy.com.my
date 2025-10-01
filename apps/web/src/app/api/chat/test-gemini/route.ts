import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Gemini API key not configured',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Hello! Can you confirm you're working? Just respond with 'Gemini AI is working correctly!'");
    const response = result.response.text();

    return NextResponse.json({
      status: 'success',
      message: 'Gemini AI integration test',
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Gemini test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Gemini AI test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
