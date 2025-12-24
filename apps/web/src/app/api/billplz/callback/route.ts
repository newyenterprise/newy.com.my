import { NextRequest, NextResponse } from 'next/server';
import { verifyXSignature, getBill, type BillplzConfig } from '@/lib/billplz';
import { supabase } from '@/lib/supabase';

/**
 * Billplz Callback Handler
 * 
 * This endpoint receives server-to-server notifications from Billplz
 * when a payment status changes (paid, failed, etc.)
 * 
 * Documentation: https://www.billplz.com/api#payment-completion
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const formData = await request.formData();
    
    // Convert FormData to object
    const callbackData: Record<string, string> = {};
    formData.forEach((value, key) => {
      callbackData[key] = value.toString();
    });

    const {
      id, // Bill ID
      collection_id,
      paid, // "true" or "false"
      state, // "paid", "failed", etc.
      amount,
      paid_amount,
      due_at,
      email,
      mobile,
      name,
      url,
      reference_1, // Order ID
      reference_2,
      x_signature,
    } = callbackData;

    // Verify X Signature if configured (recommended for security)
    const xSignatureKey = process.env.BILLPLZ_X_SIGNATURE_KEY;
    if (xSignatureKey && x_signature) {
      const isValid = verifyXSignature(xSignatureKey, callbackData, x_signature);
      if (!isValid) {
        console.error('Invalid X Signature in Billplz callback');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Get order ID from reference_1
    const orderId = reference_1;
    if (!orderId) {
      console.error('No order ID found in Billplz callback');
      return NextResponse.json(
        { error: 'Order ID not found' },
        { status: 400 }
      );
    }

    // Determine payment status
    const isPaid = paid === 'true' || paid === 'paid';
    const paymentStatus = isPaid ? 'paid' : state === 'failed' ? 'failed' : 'pending';

    // Update order status in database
    const updateData: Record<string, any> = {
      payment_status: paymentStatus,
      billplz_bill_id: id,
      billplz_state: state,
      updated_at: new Date().toISOString(),
    };

    if (isPaid) {
      updateData.status = 'paid';
      updateData.paid_at = new Date().toISOString();
      updateData.billplz_paid_amount = paid_amount;
    } else if (state === 'failed') {
      updateData.status = 'failed';
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order status:', updateError);
      // Still return 200 to Billplz to prevent retries
      return NextResponse.json({ received: true });
    }

    console.log(`Order ${orderId} updated to status: ${paymentStatus}`);

    // Return success to Billplz
    return NextResponse.json({ received: true });

  } catch (error: unknown) {
    console.error('Error processing Billplz callback:', error);
    // Return 200 to prevent Billplz from retrying
    // Log the error for manual investigation
    return NextResponse.json({ received: true });
  }
}

/**
 * GET handler for testing (Billplz may send GET requests in some cases)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const billId = searchParams.get('id');

  if (!billId) {
    return NextResponse.json(
      { error: 'Bill ID is required' },
      { status: 400 }
    );
  }

  try {
    const apiSecretKey = process.env.BILLPLZ_API_SECRET_KEY;
    const isSandbox = process.env.BILLPLZ_SANDBOX === 'true';

    if (!apiSecretKey) {
      return NextResponse.json(
        { error: 'Billplz API key not configured' },
        { status: 500 }
      );
    }

    const config: BillplzConfig = {
      apiSecretKey,
      isSandbox,
    };

    const bill = await getBill(config, billId);

    return NextResponse.json(bill);
  } catch (error: unknown) {
    console.error('Error fetching bill:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch bill';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

