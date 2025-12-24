import { NextRequest, NextResponse } from 'next/server';
import { createBill, convertAUDToSen, type BillplzConfig } from '@/lib/billplz';
import { supabase } from '@/lib/supabase';

interface CreateBillRequest {
  orderId: string;
  customerInfo: {
    email: string;
    fullName: string;
    phone?: string;
  };
  amount: number; // Amount in AUD
  description: string;
  reference1?: string;
  reference1Label?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBillRequest = await request.json();
    const { orderId, customerInfo, amount, description, reference1, reference1Label } = body;

    // Validate required environment variables
    const apiSecretKey = process.env.BILLPLZ_API_SECRET_KEY;
    const collectionId = process.env.BILLPLZ_COLLECTION_ID;
    const isSandbox = process.env.BILLPLZ_SANDBOX === 'true';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!apiSecretKey) {
      return NextResponse.json(
        { error: 'BILLPLZ_API_SECRET_KEY is not configured' },
        { status: 500 }
      );
    }

    if (!collectionId) {
      return NextResponse.json(
        { error: 'BILLPLZ_COLLECTION_ID is not configured' },
        { status: 500 }
      );
    }

    // Convert AUD to sen (smallest MYR unit)
    const exchangeRate = process.env.BILLPLZ_EXCHANGE_RATE 
      ? parseFloat(process.env.BILLPLZ_EXCHANGE_RATE) 
      : undefined;
    const amountInSen = convertAUDToSen(amount, exchangeRate);

    // Build callback and redirect URLs
    const callbackUrl = `${siteUrl}/api/billplz/callback`;
    const redirectUrl = `${siteUrl}/checkout/success?order_id=${orderId}&payment_method=billplz`;

    // Create Billplz config
    const config: BillplzConfig = {
      apiSecretKey,
      collectionId,
      isSandbox,
      xSignatureKey: process.env.BILLPLZ_X_SIGNATURE_KEY,
    };

    // Create bill in Billplz
    const bill = await createBill(config, {
      collectionId,
      email: customerInfo.email,
      name: customerInfo.fullName,
      amount: amountInSen,
      description: description.substring(0, 200), // Billplz has a 200 character limit
      callbackUrl,
      redirectUrl,
      mobile: customerInfo.phone,
      reference1: orderId,
      reference1Label: reference1Label || 'Order ID',
      reference2: reference1,
      reference2Label: reference1Label || 'Reference',
    });

    // Store bill ID in the order for reference
    try {
      await supabase
        .from('orders')
        .update({
          billplz_bill_id: bill.id,
          billplz_url: bill.url,
          payment_method: 'billplz',
        })
        .eq('id', orderId);
    } catch (error) {
      console.error('Error updating order with Billplz bill ID:', error);
      // Continue even if update fails - the bill is created
    }

    return NextResponse.json({
      billId: bill.id,
      url: bill.url,
      amount: bill.amount,
      state: bill.state,
    });

  } catch (error: unknown) {
    console.error('Error creating Billplz bill:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create bill';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

