import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'Chat API is working!',
    timestamp: new Date().toISOString(),
    features: [
      'Context-aware responses',
      'Service-specific information',
      'Pricing and timeline details',
      'Contact information',
      'Technology stack details',
      'Portfolio and experience information'
    ]
  });
}
