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
    const { 
      fullName, 
      email, 
      phone, 
      company, 
      projectType, 
      projectDescription, 
      complexity, 
      estimatedPriceMin, 
      estimatedPriceMax, 
      estimatedDuration,
      features 
    } = body;

    // Validate required fields
    if (!fullName || !email || !projectType || !projectDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    if (projectDescription.length < 10 || projectDescription.length > 5000) {
      return NextResponse.json(
        { error: 'Project description must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    const projectTypeLabels = {
      'website': 'Website Development',
      'apps': 'Mobile & Web Applications',
      'ai_automation': 'AI Automation',
      'marketing': 'Digital Marketing'
    };

    const complexityLabels = {
      'basic': 'Basic',
      'standard': 'Standard',
      'advanced': 'Advanced',
      'enterprise': 'Enterprise'
    };

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'DigitalLinked Quote Request <noreply@digitallinked.com.au>',
      to: ['hello@digitallinked.com.au', 'digitallinked.au@gmail.com'], // Admin emails
      subject: `New Quote Request: ${projectTypeLabels[projectType as keyof typeof projectTypeLabels]} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Quote Request Received
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
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
          
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Project Details</h3>
            <p><strong>Project Type:</strong> ${projectTypeLabels[projectType as keyof typeof projectTypeLabels]}</p>
            <p><strong>Complexity:</strong> ${complexityLabels[complexity as keyof typeof complexityLabels]}</p>
            <p><strong>Estimated Price Range:</strong> $${estimatedPriceMin?.toLocaleString()} - $${estimatedPriceMax?.toLocaleString()}</p>
            <p><strong>Estimated Duration:</strong> ${estimatedDuration}</p>
          </div>
          
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Project Description</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${projectDescription}</p>
          </div>

          ${features && features.length > 0 ? `
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Included Features</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${features.map((feature: string) => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This quote request was submitted through the DigitalLinked instant quote form.</p>
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
      subject: 'Your Quote Request - DigitalLinked',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            Thank you for your quote request!
          </h2>
          
          <p>Dear ${fullName},</p>
          
          <p>Thank you for submitting your quote request to DigitalLinked. We have received your project details and our team will review your requirements within 24 hours.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Project Summary</h3>
            <p><strong>Project Type:</strong> ${projectTypeLabels[projectType as keyof typeof projectTypeLabels]}</p>
            <p><strong>Complexity Level:</strong> ${complexityLabels[complexity as keyof typeof complexityLabels]}</p>
            <p><strong>Estimated Investment:</strong> $${estimatedPriceMin?.toLocaleString()} - $${estimatedPriceMax?.toLocaleString()}</p>
            <p><strong>Estimated Timeline:</strong> ${estimatedDuration}</p>
          </div>

          ${features && features.length > 0 ? `
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">What's Included</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${features.map((feature: string) => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          <div style="background-color: #fefefe; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Next Steps</h3>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Our team will review your requirements</li>
              <li>We'll prepare a detailed proposal</li>
              <li>You'll receive a comprehensive quote within 24 hours</li>
              <li>We'll schedule a consultation to discuss your project</li>
            </ol>
          </div>
          
          <p>If you have any urgent questions or need to discuss your project further, please don't hesitate to contact us:</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> <a href="tel:+61406612824">0406 612 824</a></p>
            <p><strong>Email:</strong> <a href="mailto:hello@digitallinked.com.au">hello@digitallinked.com.au</a></p>
            <p><strong>Location:</strong> Newcastle, NSW, Australia</p>
          </div>
          
          <p>We look forward to working with you on your project!</p>
          
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
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
