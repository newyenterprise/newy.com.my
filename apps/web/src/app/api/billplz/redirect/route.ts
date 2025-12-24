import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';
    const orderId = reference1;

    if (!orderId) {
      // If no order ID, redirect to home
      return NextResponse.redirect(`${siteUrl}/`);
    }

    // Determine payment status
    const isPaid = paid === 'true' || paid === 'paid';
    
    // Check if this is a promo order
    try {
      const { data: order } = await supabase
        .from('orders')
        .select('promo_code')
        .eq('id', orderId)
        .single();

      const isPromoOrder = order?.promo_code === 'WEB-PROMO-2024';
      
      if (isPaid) {
        // Payment successful - redirect to appropriate success page
        if (isPromoOrder) {
          return NextResponse.redirect(`${siteUrl}/web-promo/success?order_id=${orderId}&payment_method=billplz&paid=true`);
        } else {
          return NextResponse.redirect(`${siteUrl}/checkout/success?order_id=${orderId}&payment_method=billplz&paid=true`);
        }
      } else {
        // Payment failed or cancelled - redirect to appropriate page
        if (isPromoOrder) {
          return NextResponse.redirect(`${siteUrl}/web-promo?error=payment_failed&order_id=${orderId}`);
        } else {
          return NextResponse.redirect(`${siteUrl}/checkout?error=payment_failed&order_id=${orderId}`);
        }
      }
    } catch (error) {
      // If we can't check the order, use default redirect
      console.error('Error checking order:', error);
      if (isPaid) {
        return NextResponse.redirect(`${siteUrl}/checkout/success?order_id=${orderId}&payment_method=billplz&paid=true`);
      } else {
        return NextResponse.redirect(`${siteUrl}/checkout?error=payment_failed&order_id=${orderId}`);
      }
    }

  } catch (error: unknown) {
    console.error('Error processing Billplz redirect:', error);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';
    // On error, redirect to home
    return NextResponse.redirect(`${siteUrl}/`);
  }
}

