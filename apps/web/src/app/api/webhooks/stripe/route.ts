import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      try {
        // Update order status in database
        const orderId = session.metadata?.orderId;
        
        if (orderId) {
          const { error } = await supabase
            .from('orders')
            .update({
              status: 'paid',
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              paid_at: new Date().toISOString()
            })
            .eq('id', orderId);

          if (error) {
            console.error('Error updating order status:', error);
          } else {
            console.log(`Order ${orderId} marked as paid`);
          }
        }
      } catch (error) {
        console.error('Error processing checkout.session.completed:', error);
      }
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      try {
        // Additional handling for successful payments if needed
        console.log(`Payment succeeded: ${paymentIntent.id}`);
      } catch (error) {
        console.error('Error processing payment_intent.succeeded:', error);
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      
      try {
        // Handle failed payments
        const orderId = failedPayment.metadata?.orderId;
        
        if (orderId) {
          const { error } = await supabase
            .from('orders')
            .update({
              status: 'failed',
              stripe_payment_intent_id: failedPayment.id
            })
            .eq('id', orderId);

          if (error) {
            console.error('Error updating failed order status:', error);
          } else {
            console.log(`Order ${orderId} marked as failed`);
          }
        }
      } catch (error) {
        console.error('Error processing payment_intent.payment_failed:', error);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
