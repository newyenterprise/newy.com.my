-- Migration: Add Billplz payment integration columns to orders table
-- Run this migration in your Supabase SQL Editor or database migration tool

-- Add Billplz-specific columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS billplz_bill_id TEXT,
ADD COLUMN IF NOT EXISTS billplz_url TEXT,
ADD COLUMN IF NOT EXISTS billplz_state TEXT,
ADD COLUMN IF NOT EXISTS billplz_paid_amount NUMERIC,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Create index on billplz_bill_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_billplz_bill_id ON orders(billplz_bill_id);

-- Add comment to columns for documentation
COMMENT ON COLUMN orders.billplz_bill_id IS 'Bill ID from Billplz payment gateway';
COMMENT ON COLUMN orders.billplz_url IS 'URL of the Billplz payment page';
COMMENT ON COLUMN orders.billplz_state IS 'Current state of the bill (due, paid, failed, etc.)';
COMMENT ON COLUMN orders.billplz_paid_amount IS 'Amount paid in sen (smallest MYR unit)';
COMMENT ON COLUMN orders.payment_status IS 'Payment status: pending, paid, failed';

