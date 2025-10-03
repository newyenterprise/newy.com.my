import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const serviceNames = {
  website: "Website Development",
  apps: "Mobile Apps",
  ai: "AI Automation",
  marketing: "Digital Marketing"
};

export async function POST(request: NextRequest) {
  try {
    const { 
      quoteId,
      customerInfo,
      service,
      selectedAddOns,
      basePrice,
      addOnsTotal,
      estimatedTotal
    } = await request.json();

    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: 'Digital Linked <hello@digitallinked.com.au>',
      to: [customerInfo.email],
      subject: `Your Quote Request - ${serviceNames[service as keyof typeof serviceNames]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Quote Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea, #f59e0b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .quote-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333ea; }
            .price-highlight { background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .addon-item { background: #f3f4f6; padding: 10px; margin: 5px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #9333ea, #f59e0b); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Quote Request Received!</h1>
              <p>Thank you for your interest in our services</p>
            </div>
            
            <div class="content">
              <h2>Hello ${customerInfo.fullName},</h2>
              
              <p>Thank you for requesting a quote for <strong>${serviceNames[service as keyof typeof serviceNames]}</strong>. We've received your request and will review it carefully.</p>
              
              <div class="quote-summary">
                <h3>Quote Summary</h3>
                <p><strong>Service:</strong> ${serviceNames[service as keyof typeof serviceNames]}</p>
                <p><strong>Base Price:</strong> $${basePrice.toLocaleString()}</p>
                
                ${selectedAddOns.length > 0 ? `
                  <h4>Selected Add-ons:</h4>
                  ${selectedAddOns.map((addon: string) => `<div class="addon-item">+ ${addon}</div>`).join('')}
                  <p><strong>Add-ons Total:</strong> +$${addOnsTotal.toLocaleString()}</p>
                ` : ''}
                
                <div class="price-highlight">
                  <h3>Estimated Total: $${estimatedTotal.toLocaleString()}</h3>
                  <p><em>Final quote may vary based on your specific requirements</em></p>
          </div>
          </div>
          
              <h3>What happens next?</h3>
              <ul>
                <li>Our team will review your requirements within 24 hours</li>
                <li>We'll prepare a detailed, personalized quote</li>
                <li>You'll receive a follow-up call to discuss your project</li>
                <li>Once approved, we'll begin development immediately</li>
              </ul>
              
              <p>If you have any questions, feel free to contact us at <a href="mailto:hello@digitallinked.com.au">hello@digitallinked.com.au</a> or call us at <a href="tel:+61406612824">0406 612 824</a>.</p>
              
              <p>Best regards,<br>
              The Digital Linked Team</p>
            </div>
            
            <div class="footer">
              <p>Digital Linked - Your All-In-One Digital Partner</p>
              <p>Newcastle, NSW, Australia | hello@digitallinked.com.au</p>
          </div>
        </div>
        </body>
        </html>
      `,
    });

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'Digital Linked <hello@digitallinked.com.au>',
      to: ['hello@digitallinked.com.au'],
      subject: `New Quote Request - ${customerInfo.fullName} - ${serviceNames[service as keyof typeof serviceNames]}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Quote Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea, #f59e0b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .customer-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .quote-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #9333ea; }
            .project-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Quote Request</h1>
              <p>Quote ID: ${quoteId}</p>
            </div>
            
            <div class="content">
              <div class="customer-info">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${customerInfo.fullName}</p>
                <p><strong>Email:</strong> ${customerInfo.email}</p>
                <p><strong>Phone:</strong> ${customerInfo.phone}</p>
                <p><strong>Company:</strong> ${customerInfo.company || 'Not provided'}</p>
          </div>

              <div class="quote-details">
                <h3>Quote Details</h3>
                <p><strong>Service:</strong> ${serviceNames[service as keyof typeof serviceNames]}</p>
                <p><strong>Base Price:</strong> $${basePrice.toLocaleString()}</p>
                <p><strong>Add-ons Total:</strong> $${addOnsTotal.toLocaleString()}</p>
                <p><strong>Estimated Total:</strong> $${estimatedTotal.toLocaleString()}</p>
                
                ${selectedAddOns.length > 0 ? `
                  <h4>Selected Add-ons:</h4>
                  <ul>
                    ${selectedAddOns.map((addon: string) => `<li>${addon}</li>`).join('')}
            </ul>
          ` : ''}
          </div>
          
              <div class="project-details">
                <h3>Project Details</h3>
                <p><strong>Description:</strong> ${customerInfo.projectDescription}</p>
                <p><strong>Budget:</strong> ${customerInfo.budget || 'Not specified'}</p>
                <p><strong>Timeline:</strong> ${customerInfo.timeline || 'Not specified'}</p>
                ${customerInfo.additionalNotes ? `<p><strong>Additional Notes:</strong> ${customerInfo.additionalNotes}</p>` : ''}
          </div>
              
              <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes" style="background: #9333ea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a></p>
          </div>
        </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      customerEmailId: customerEmail.data?.id,
      adminEmailId: adminEmail.data?.id
    });

  } catch (error) {
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}