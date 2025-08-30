import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, items, customerInfo, total } = await request.json();

    // Create line items for Stripe
    const lineItems = items.map((item: any) => {
      const addOnTotal = item.addOns?.reduce((sum: number, addOn: any) => sum + addOn.price, 0) || 0;
      const itemTotal = item.price + addOnTotal;
      
      return {
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.name,
            description: item.description,
            metadata: {
              orderId: orderId,
              addOns: item.addOns?.map((addOn: any) => addOn.name).join(', ') || ''
            }
          },
        },
        quantity: 1,
        amount_data: {
          amount: Math.round(itemTotal * 100), // Convert to cents
        }
      };
    });

    // Add tax as a separate line item
    const taxAmount = Math.round(total * 0.1 * 100); // 10% GST in cents
    if (taxAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'GST (10%)',
            description: 'Goods and Services Tax'
          },
        },
        quantity: 1,
        amount_data: {
          amount: taxAmount
        }
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems.map(item => ({
        price_data: item.price_data,
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?cancelled=true`,
      customer_email: customerInfo.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'US', 'GB', 'CA']
      },
      metadata: {
        orderId: orderId,
        customerName: customerInfo.fullName,
        customerPhone: customerInfo.phone,
        customerCompany: customerInfo.company || ''
      },
      payment_intent_data: {
        metadata: {
          orderId: orderId
        }
      }
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
