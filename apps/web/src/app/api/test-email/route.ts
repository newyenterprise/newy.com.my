import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Testing email service...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'DigitalLinked Test <noreply@digitallinked.com.au>',
      to: ['hello@newy.com.my'],
      subject: 'Test Email - DigitalLinked Quote System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Test Email</h2>
          <p>This is a test email to verify that the DigitalLinked quote system email functionality is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-AU', { 
            timeZone: 'Australia/Sydney',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend test error:', error);
      return NextResponse.json(
        { error: 'Failed to send test email', details: error },
        { status: 500 }
      );
    }

    console.log('Test email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in test email:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
