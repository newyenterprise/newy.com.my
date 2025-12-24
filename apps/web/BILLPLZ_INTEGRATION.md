# Billplz Payment Integration Guide

This document provides comprehensive instructions for setting up and using the Billplz payment gateway integration.

## 📋 Overview

Billplz is a Malaysian payment gateway that supports:
- **FPX (Financial Process Exchange)** - Online banking for major Malaysian banks
- **Credit/Debit Cards** - Visa, Mastercard, etc.
- **E-Wallets** - Boost, Touch n Go, GrabPay, ShopeePay, and more

The integration allows customers to pay using these methods, with automatic currency conversion from AUD to MYR (Malaysian Ringgit).

## 🔧 Setup Instructions

### Step 1: Create a Billplz Account

1. **Sign up for Billplz**:
   - Production: [https://main.billplz.com/](https://main.billplz.com/)
   - Sandbox (for testing): [https://www.billplz-sandbox.com/](https://www.billplz-sandbox.com/)

2. **Get your API credentials**:
   - Log in to your Billplz dashboard
   - Navigate to Settings → API Keys
   - Copy your **API Secret Key** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - Copy your **X Signature Key** (for callback verification, recommended)

### Step 2: Create a Collection

A Collection groups related bills together. You can create one via:

**Option A: Using Billplz Dashboard**
1. Go to Collections in your Billplz dashboard
2. Create a new collection
3. Copy the Collection ID

**Option B: Using the API** (automatic - the code can create collections programmatically)

### Step 3: Configure Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Billplz Configuration
BILLPLZ_API_SECRET_KEY=your_api_secret_key_here
BILLPLZ_COLLECTION_ID=your_collection_id_here
BILLPLZ_X_SIGNATURE_KEY=your_x_signature_key_here  # Recommended for security
BILLPLZ_SANDBOX=true  # Set to 'true' for testing, 'false' for production
BILLPLZ_EXCHANGE_RATE=3.10  # Optional: AUD to MYR exchange rate (default: 3.10)

# Site URL (required for callbacks and redirects)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Important Notes:**
- Use **Sandbox** credentials when `BILLPLZ_SANDBOX=true`
- Use **Production** credentials when `BILLPLZ_SANDBOX=false`
- Sandbox and Production accounts are separate
- The X Signature Key is optional but highly recommended for security

### Step 4: Database Schema Updates

The integration uses the following fields in your `orders` table. Ensure these columns exist:

```sql
-- Add Billplz-specific columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billplz_bill_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billplz_url TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billplz_state TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billplz_paid_amount NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
```

If you're using Supabase, you can run this migration in the SQL Editor.

## 🔄 Payment Flow

### Normal Payment Flow

1. **Customer selects Billplz** as payment method on checkout
2. **Order is created** in your database with status `pending`
3. **Bill is created** in Billplz via API
4. **Customer is redirected** to Billplz payment page
5. **Customer completes payment** using their preferred method (FPX, Card, E-Wallet)
6. **Billplz sends callback** to `/api/billplz/callback` (server-to-server)
7. **Order status is updated** to `paid` in your database
8. **Customer is redirected** back to your success page

### Callback vs Redirect

- **Callback URL** (`/api/billplz/callback`): Server-to-server notification (compulsory)
  - Receives payment status updates
  - Updates order status in database
  - More reliable than redirect

- **Redirect URL** (`/api/billplz/redirect`): Customer browser redirect (optional but recommended)
  - Redirects customer after payment
  - Provides instant feedback
  - Used for better user experience

**Important:** The order of callback and redirect execution is not guaranteed. Your system should handle both and prevent duplicate updates.

## 📁 File Structure

The integration consists of the following files:

```
apps/web/src/
├── lib/
│   └── billplz.ts                    # Billplz API client library
├── app/
│   ├── api/
│   │   └── billplz/
│   │       ├── create-bill/
│   │       │   └── route.ts          # Create bill API endpoint
│   │       ├── callback/
│   │       │   └── route.ts          # Payment callback handler
│   │       └── redirect/
│   │           └── route.ts          # Payment redirect handler
│   ├── checkout/
│   │   └── page.tsx                  # Checkout page (updated)
│   └── quote/
│       └── [id]/
│           └── payment/
│               └── page.tsx          # Quote payment page (updated)
```

## 🔌 API Endpoints

### POST `/api/billplz/create-bill`

Creates a new bill in Billplz and returns the payment URL.

**Request Body:**
```json
{
  "orderId": "order-uuid",
  "customerInfo": {
    "email": "customer@example.com",
    "fullName": "John Doe",
    "phone": "+60123456789"
  },
  "amount": 100.00,  // Amount in AUD
  "description": "Order for Website Development",
  "reference1": "optional-reference",
  "reference1Label": "Reference Label"
}
```

**Response:**
```json
{
  "billId": "bill-id",
  "url": "https://www.billplz.com/bills/bill-id",
  "amount": 31000,  // Amount in sen
  "state": "due"
}
```

### POST `/api/billplz/callback`

Receives payment status updates from Billplz (server-to-server).

**Form Data:**
- `id`: Bill ID
- `paid`: Payment status ("true" or "false")
- `state`: Bill state ("paid", "failed", etc.)
- `reference_1`: Order ID
- `x_signature`: X Signature for verification (if enabled)

### GET `/api/billplz/redirect`

Handles customer redirects after payment completion.

**Query Parameters:**
- `billplz[id]`: Bill ID
- `billplz[paid]`: Payment status
- `billplz[reference_1]`: Order ID

## 💱 Currency Conversion

The integration automatically converts AUD (Australian Dollars) to MYR (Malaysian Ringgit) for Billplz:

- **Default rate**: 1 AUD = 3.10 MYR
- **Configurable**: Set `BILLPLZ_EXCHANGE_RATE` environment variable
- **Currency unit**: Amounts are converted to sen (1 MYR = 100 sen) for the API

**Example:**
- Customer pays: AUD $100.00
- Converted to: MYR 310.00
- Sent to Billplz: 31000 sen

**Production Recommendation:** Fetch live exchange rates from an external API (e.g., fixer.io, exchangerate-api.com) and update the rate regularly.

## 🔒 Security

### X Signature Verification

X Signature verification is **highly recommended** for production. It ensures that callbacks are actually from Billplz and haven't been tampered with.

**How it works:**
1. Billplz calculates a SHA256 hash of callback data + X Signature Key
2. Your server receives the callback with the X Signature
3. Your server recalculates the hash and compares it
4. If they match, the callback is verified

**Enable it:**
1. Set `BILLPLZ_X_SIGNATURE_KEY` in your environment variables
2. The verification happens automatically in the callback handler

## 🧪 Testing

### Sandbox Mode

1. **Set `BILLPLZ_SANDBOX=true`** in your `.env.local`
2. **Use Sandbox credentials** from [Billplz Sandbox](https://www.billplz-sandbox.com/)
3. **Test payment flow** using test payment methods

### Test Payment Methods (Sandbox Only)

- **Test FPX**: Use any test bank accounts provided by Billplz
- **Test Cards**: Use test card numbers from Billplz documentation
- **Test E-Wallets**: Use test accounts in sandbox environment

### Testing Checklist

- [ ] Create bill successfully
- [ ] Redirect to Billplz payment page
- [ ] Complete payment in sandbox
- [ ] Receive callback and update order status
- [ ] Redirect customer back to success page
- [ ] Verify X Signature (if enabled)
- [ ] Handle payment failures correctly
- [ ] Test currency conversion

## 🐛 Troubleshooting

### Common Issues

**1. "BILLPLZ_API_SECRET_KEY is not configured"**
- Solution: Add `BILLPLZ_API_SECRET_KEY` to your `.env.local` file

**2. "BILLPLZ_COLLECTION_ID is not configured"**
- Solution: Create a collection in Billplz dashboard and set `BILLPLZ_COLLECTION_ID`

**3. "Invalid signature" error**
- Solution: Verify your `BILLPLZ_X_SIGNATURE_KEY` matches the one in Billplz dashboard
- Check that callback data is being parsed correctly

**4. Callbacks not received**
- Solution: Ensure your callback URL is publicly accessible (not localhost)
- Check that your server is running and endpoint is accessible
- Verify callback URL is correctly configured in Billplz dashboard (if setting manually)

**5. Currency conversion incorrect**
- Solution: Update `BILLPLZ_EXCHANGE_RATE` with current exchange rate
- Consider implementing live exchange rate fetching

**6. Orders not updating after payment**
- Solution: Check database logs for errors
- Verify order ID is correctly passed in `reference_1`
- Check that callback handler is receiving requests

### Debugging

Enable detailed logging by checking:
- Server console logs for API errors
- Billplz dashboard → Bills → Check bill status
- Database to verify order updates
- Network tab in browser for API requests

## 📚 Additional Resources

- **Billplz API Documentation**: [https://www.billplz.com/api#introduction](https://www.billplz.com/api#introduction)
- **Billplz Sandbox**: [https://www.billplz-sandbox.com/](https://www.billplz-sandbox.com/)
- **Billplz GitHub**: [https://github.com/billplz](https://github.com/billplz)
- **Payment Gateway Codes**: See Billplz API docs for FPX bank codes and payment gateway abbreviations

## 🔄 Migration from Stripe to Billplz

If you're currently using Stripe and want to add Billplz:

1. Billplz is added as an **additional** payment option (not replacing Stripe)
2. Customers can choose between Stripe and Billplz during checkout
3. Both payment methods work independently
4. Order status tracking is consistent across both methods

## 📝 Production Checklist

Before going live:

- [ ] Switch `BILLPLZ_SANDBOX=false`
- [ ] Use production API credentials
- [ ] Enable X Signature verification
- [ ] Set up proper exchange rate (or live rate fetching)
- [ ] Test complete payment flow in production
- [ ] Configure proper callback URLs in Billplz dashboard
- [ ] Set up monitoring for payment failures
- [ ] Test all supported payment methods (FPX, Cards, E-Wallets)
- [ ] Verify email notifications work with Billplz payments
- [ ] Document your Billplz Collection ID and settings

## 💡 Best Practices

1. **Always use X Signature verification** in production
2. **Handle both callback and redirect** - don't rely on only one
3. **Implement idempotency** - prevent duplicate order updates
4. **Log all payment events** for debugging and auditing
5. **Update exchange rates regularly** (or use live rates)
6. **Test thoroughly** in sandbox before production
7. **Monitor payment success rates** and investigate failures
8. **Keep API keys secure** - never commit them to version control

## 🆘 Support

For issues with:
- **Billplz API**: Contact [Billplz Support](https://www.billplz.com/contact)
- **Integration Code**: Check this documentation or review the code comments
- **Database Issues**: Check your Supabase/SQL logs

