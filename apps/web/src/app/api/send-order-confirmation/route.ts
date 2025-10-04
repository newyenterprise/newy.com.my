import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerInfo, items, total } = await request.json();

    // Validate required fields
    if (!orderId || !customerInfo?.email || !customerInfo?.fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderNumber = orderId.slice(-8).toUpperCase();

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Digital Linked</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { border-bottom: 1px solid #eee; padding: 15px 0; }
            .item:last-child { border-bottom: none; }
            .total { font-size: 18px; font-weight: bold; color: #667eea; }
            .next-steps { background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .step { margin: 15px 0; padding-left: 25px; position: relative; }
            .step::before { content: "✓"; position: absolute; left: 0; color: #4CAF50; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
            .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Order Confirmed!</h1>
              <p>Thank you for choosing Digital Linked</p>
              <p><strong>Order #${orderNumber}</strong></p>
            </div>
            
            <div class="content">
              <h2>Hi ${customerInfo.fullName},</h2>
              <p>Great news! We've received your order and payment has been processed successfully. We're excited to start working on your project!</p>
              
              <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Customer:</strong> ${customerInfo.fullName}</p>
                <p><strong>Email:</strong> ${customerInfo.email}</p>
                <p><strong>Phone:</strong> ${customerInfo.phone}</p>
                ${customerInfo.company ? `<p><strong>Company:</strong> ${customerInfo.company}</p>` : ''}
                
                <h4>Items Ordered:</h4>
                ${items.map((item: any) => `
                  <div class="item">
                    <strong>${item.name}</strong><br>
                    <small>${item.description}</small><br>
                    <span class="total">$${item.price.toLocaleString()}</span>
                    ${item.addOns && item.addOns.length > 0 ? `
                      <br><small>Add-ons: ${item.addOns.map((addOn: any) => `${addOn.name} (+$${addOn.price.toLocaleString()})`).join(', ')}</small>
                    ` : ''}
                  </div>
                `).join('')}
                
                <div style="text-align: right; margin-top: 20px; padding-top: 20px; border-top: 2px solid #667eea;">
                  <span class="total">Total Paid: $${total.toLocaleString()}</span>
                </div>
              </div>
              
              <div class="next-steps">
                <h3>🚀 What Happens Next?</h3>
                <div class="step">You'll receive this confirmation email (you're reading it now!)</div>
                <div class="step">Our project manager will contact you within 24 hours</div>
                <div class="step">We'll schedule your project kickoff call</div>
                <div class="step">Development begins immediately after kickoff</div>
                <div class="step">You'll receive regular progress updates</div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://digitallinked.com.au/dashboard" class="button">View Your Dashboard</a>
              </div>
              
              <div style="background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107;">
                <strong>Need immediate assistance?</strong><br>
                📧 Email: hello@newy.com.my<br>
                📞 Phone: 0406 612 824<br>
                🕒 Business Hours: Monday-Friday 9AM-6PM (AEST)
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for choosing Digital Linked!</p>
              <p>Your Strategic Partner for Digital Success</p>
              <p><small>This email was sent to ${customerInfo.email} regarding order #${orderNumber}</small></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation email
    const customerEmail = await resend.emails.send({
      from: 'Digital Linked <noreply@digitallinked.com.au>',
      to: [customerInfo.email],
      subject: `Order Confirmation #${orderNumber} - Digital Linked`,
      html: htmlContent,
    });

    // Send admin notification email
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order Received - Digital Linked</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 10px 0; }
            .item { border-bottom: 1px solid #eee; padding: 10px 0; }
            .total { font-size: 18px; font-weight: bold; color: #28a745; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 New Order Received!</h1>
              <p>Order #${orderNumber}</p>
            </div>
            
            <div class="content">
              <div class="details">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${customerInfo.fullName}</p>
                <p><strong>Email:</strong> ${customerInfo.email}</p>
                <p><strong>Phone:</strong> ${customerInfo.phone}</p>
                ${customerInfo.company ? `<p><strong>Company:</strong> ${customerInfo.company}</p>` : ''}
                
                <h3>Order Items</h3>
                ${items.map((item: any) => `
                  <div class="item">
                    <strong>${item.name}</strong> - $${item.price.toLocaleString()}<br>
                    <small>${item.description}</small>
                    ${item.addOns && item.addOns.length > 0 ? `
                      <br><small>Add-ons: ${item.addOns.map((addOn: any) => `${addOn.name} (+$${addOn.price.toLocaleString()})`).join(', ')}</small>
                    ` : ''}
                  </div>
                `).join('')}
                
                <div style="text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #28a745;">
                  <span class="total">Total: $${total.toLocaleString()}</span>
                </div>
              </div>
              
              <p><strong>Action Required:</strong> Contact the customer within 24 hours to schedule the project kickoff call.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminEmail = await resend.emails.send({
      from: 'Digital Linked Orders <noreply@digitallinked.com.au>',
      to: ['hello@newy.com.my'],
      subject: `🎉 New Order #${orderNumber} - $${total.toLocaleString()}`,
      html: adminHtmlContent,
    });

    return NextResponse.json({ 
      success: true, 
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id
    });

  } catch (error: any) {
    console.error('Error sending order confirmation email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
