import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Check if API key is available
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per 15 minutes per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

function getClientIP(request: NextRequest): string {
  // Get IP from various headers (for different hosting environments)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function containsSpamKeywords(text: string): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'loan', 'debt', 'weight loss', 'diet pills',
    'make money fast', 'work from home', 'earn money online',
    'free money', 'lottery', 'winner', 'urgent', 'limited time',
    'act now', 'click here', 'buy now', 'cheap', 'discount',
    'free trial', 'no cost', 'risk free', 'guaranteed'
  ];
  
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

function isSuspiciousSubmission(data: any): boolean {
  // Check for honeypot field (should be empty)
  if (data.website || data.phone || data.company) {
    return true;
  }
  
  // Check for suspicious patterns
  if (data.fullName && data.fullName.length < 2) return true;
  if (data.message && data.message.length < 10) return true;
  if (data.message && data.message.length > 5000) return true;
  
  // Check for spam keywords
  if (data.subject && containsSpamKeywords(data.subject)) return true;
  if (data.message && containsSpamKeywords(data.message)) return true;
  
  // Check for suspicious email patterns
  if (data.email && !validateEmail(data.email)) return true;
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, messageType, subject, message, website, phone, company } = body;

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Spam detection
    if (isSuspiciousSubmission(body)) {
      console.warn(`Suspicious submission detected from IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Invalid submission detected' },
        { status: 400 }
      );
    }

    // Additional validation
    if (fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json(
        { error: 'Invalid name length' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'DigitalLinked Contact Form <noreply@digitallinked.com.au>',
      to: ['hello@digitallinked.com.au', 'digitallinked.au@gmail.com'], // Admin emails
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message Type:</strong> ${messageType || 'Not specified'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>IP Address:</strong> ${clientIP}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { 
              timeZone: 'Australia/Sydney',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the DigitalLinked contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-AU', { 
              timeZone: 'Australia/Sydney',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'DigitalLinked <noreply@digitallinked.com.au>',
      to: [email],
      subject: 'Thank you for contacting DigitalLinked',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          
          <p>Dear ${fullName},</p>
          
          <p>Thank you for contacting DigitalLinked. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message Type:</strong> ${messageType || 'General Inquiry'}</p>
          </div>
          
          <p>If you have any urgent questions, please don't hesitate to call us at <strong>0406 612 824</strong>.</p>
          
          <p>Best regards,<br>
          The DigitalLinked Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>DigitalLinked<br>
            Newcastle, NSW, Australia<br>
            Phone: 0406 612 824<br>
            Email: hello@digitallinked.com.au</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
