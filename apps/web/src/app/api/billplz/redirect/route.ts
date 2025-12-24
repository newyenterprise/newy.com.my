import { NextRequest, NextResponse } from 'next/server';

/**
 * Billplz Redirect Handler
 * 
 * This endpoint handles customer redirects after payment completion.
 * Billplz redirects customers here after they complete or cancel payment.
 * 
 * Documentation: https://www.billplz.com/api#payment-completion
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get parameters from Billplz redirect
    const billId = searchParams.get('billplz[id]');
    const paid = searchParams.get('billplz[paid]');
    const state = searchParams.get('billplz[state]');
    const xSignature = searchParams.get('billplz[x_signature]');
    const reference1 = searchParams.get('billplz[reference_1]'); // Order ID
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const orderId = reference1;

    if (!orderId) {
      // If no order ID, redirect to home
      return NextResponse.redirect(`${siteUrl}/`);
    }

    // Determine payment status
    const isPaid = paid === 'true' || paid === 'paid';
    
    if (isPaid) {
      // Payment successful - redirect to success page
      return NextResponse.redirect(`${siteUrl}/checkout/success?order_id=${orderId}&payment_method=billplz&paid=true`);
    } else {
      // Payment failed or cancelled - redirect to checkout with error
      return NextResponse.redirect(`${siteUrl}/checkout?error=payment_failed&order_id=${orderId}`);
    }

  } catch (error: unknown) {
    console.error('Error processing Billplz redirect:', error);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    // On error, redirect to home
    return NextResponse.redirect(`${siteUrl}/`);
  }
}

