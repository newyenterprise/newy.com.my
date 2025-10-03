import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { content, topic } = await request.json();

    if (!content && !topic) {
      return NextResponse.json(
        { error: 'Content or topic required' },
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

    const prompt = `Based on this blog ${topic ? `topic: "${topic}"` : `content: "${content.substring(0, 500)}"`}, suggest 3-5 relevant image search terms or descriptions that would enhance the blog post. 
    
    Return as a JSON array of strings, each being a specific image search term or description.
    Example: ["responsive web design mockup", "mobile app development team", "modern website interface"]
    
    Return ONLY the JSON array, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = JSON.parse(response.text());

    // For now, we'll provide Unsplash URLs for these search terms
    // Users can also manually search on Unsplash or upload their own
    const imageUrls = suggestions.map((term: string) => ({
      term,
      unsplashUrl: `https://source.unsplash.com/800x600/?${encodeURIComponent(term)}`,
      searchUrl: `https://unsplash.com/s/photos/${encodeURIComponent(term)}`
    }));

    return NextResponse.json({ suggestions: imageUrls });
  } catch (error) {
    console.error('Error generating image suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate image suggestions' },
      { status: 500 }
    );
  }
}

