/**
 * Billplz API Client
 * 
 * Documentation: https://www.billplz.com/api#introduction
 * 
 * This module provides functions to interact with the Billplz API
 * for payment processing in Malaysia.
 */

export interface BillplzConfig {
  apiSecretKey: string;
  collectionId?: string; // Optional: Use existing collection or create new one
  isSandbox?: boolean;
  xSignatureKey?: string; // For X Signature verification (recommended)
}

export interface CreateBillParams {
  collectionId: string;
  email: string;
  name: string;
  amount: number; // Amount in sen (smallest MYR unit, e.g., 1000 = RM10.00)
  description: string;
  callbackUrl: string;
  redirectUrl?: string;
  mobile?: string;
  reference1?: string; // Order ID or reference
  reference1Label?: string;
  reference2?: string;
  reference2Label?: string;
}

export interface BillResponse {
  id: string;
  collection_id: string;
  email: string;
  mobile: string | null;
  name: string;
  amount: number;
  description: string;
  paid: boolean;
  state: string;
  due_at: string;
  url: string;
  reference_1: string | null;
  reference_1_label: string | null;
  reference_2: string | null;
  reference_2_label: string | null;
  redirect_url: string | null;
  callback_url: string;
  created_at: string;
}

export interface CreateCollectionParams {
  title: string;
}

export interface CollectionResponse {
  id: string;
  title: string;
  logo?: {
    thumb_url: string;
    avatar_url: string;
  };
}

/**
 * Get the Billplz API base URL
 */
function getApiBaseUrl(isSandbox: boolean = false): string {
  return isSandbox
    ? 'https://www.billplz-sandbox.com/api'
    : 'https://www.billplz.com/api';
}

/**
 * Make an authenticated request to Billplz API
 */
async function billplzRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
  apiSecretKey: string,
  isSandbox: boolean = false,
  body?: Record<string, any>
): Promise<T> {
  const baseUrl = getApiBaseUrl(isSandbox);
  const url = `${baseUrl}${endpoint}`;

  // Create Basic Auth header
  const credentials = Buffer.from(`${apiSecretKey}:`).toString('base64');

  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Add body for POST/PATCH requests
  if (body && (method === 'POST' || method === 'PATCH')) {
    // Convert object to URL-encoded format
    const formData = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, String(value));
      }
    });
    options.body = formData.toString();
  }

  try {
    const response = await fetch(url, options);
    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = `Billplz API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // Use default error message
      }
      throw new Error(errorMessage);
    }

    // Parse JSON response
    try {
      return JSON.parse(responseText) as T;
    } catch {
      // If response is not JSON, return the text
      return responseText as unknown as T;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while calling Billplz API');
  }
}

/**
 * Create a new collection in Billplz
 * Collections are used to group bills together
 */
export async function createCollection(
  config: BillplzConfig,
  params: CreateCollectionParams
): Promise<CollectionResponse> {
  const response = await billplzRequest<{ collection: CollectionResponse }>(
    '/v3/collections',
    'POST',
    config.apiSecretKey,
    config.isSandbox,
    { title: params.title }
  );

  return (response as any).collection || response as CollectionResponse;
}

/**
 * Create a bill in Billplz
 * This generates a payment URL for the customer
 */
export async function createBill(
  config: BillplzConfig,
  params: CreateBillParams
): Promise<BillResponse> {
  // Ensure amount is in sen (smallest MYR unit)
  const amountInSen = Math.round(params.amount);

  const billData: Record<string, any> = {
    collection_id: params.collectionId,
    email: params.email,
    name: params.name,
    amount: amountInSen,
    description: params.description,
    callback_url: params.callbackUrl,
  };

  // Optional fields
  if (params.redirectUrl) {
    billData.redirect_url = params.redirectUrl;
  }
  if (params.mobile) {
    billData.mobile = params.mobile;
  }
  if (params.reference1) {
    billData.reference_1 = params.reference1;
  }
  if (params.reference1Label) {
    billData.reference_1_label = params.reference1Label;
  }
  if (params.reference2) {
    billData.reference_2 = params.reference2;
  }
  if (params.reference2Label) {
    billData.reference_2_label = params.reference2Label;
  }

  const response = await billplzRequest<{ bill: BillResponse }>(
    '/v3/bills',
    'POST',
    config.apiSecretKey,
    config.isSandbox,
    billData
  );

  return (response as any).bill || response as BillResponse;
}

/**
 * Get bill details by ID
 */
export async function getBill(
  config: BillplzConfig,
  billId: string
): Promise<BillResponse> {
  const response = await billplzRequest<{ bill: BillResponse }>(
    `/v3/bills/${billId}`,
    'GET',
    config.apiSecretKey,
    config.isSandbox
  );

  return (response as any).bill || response as BillResponse;
}

import crypto from 'crypto';

/**
 * Verify X Signature from Billplz callback
 * This is the recommended way to verify callbacks are from Billplz
 * 
 * Documentation: https://www.billplz.com/api#x-signature
 */
export function verifyXSignature(
  xSignatureKey: string,
  data: Record<string, string>,
  receivedSignature: string
): boolean {
  // Build the string to sign
  // Format: key1|value1|key2|value2|x_signature_key
  // Keys should be sorted alphabetically
  const sortedKeys = Object.keys(data).filter(key => key !== 'x_signature').sort();
  
  let stringToSign = '';
  sortedKeys.forEach(key => {
    if (data[key]) {
      stringToSign += `${key}|${data[key]}|`;
    }
  });
  stringToSign += xSignatureKey;

  // Calculate SHA256 hash
  const calculatedSignature = crypto
    .createHash('sha256')
    .update(stringToSign)
    .digest('hex');

  return calculatedSignature === receivedSignature;
}

/**
 * Convert AUD to MYR (Malaysian Ringgit)
 * Note: In production, you should fetch live exchange rates from an API
 * For now, using a static conversion rate (update as needed)
 */
export function convertAUDToMYR(audAmount: number, exchangeRate?: number): number {
  // Default exchange rate: 1 AUD = 3.10 MYR (approximate, update as needed)
  // In production, fetch from an exchange rate API
  const defaultRate = 3.10;
  const rate = exchangeRate || defaultRate;
  return audAmount * rate;
}

/**
 * Convert MYR to sen (smallest currency unit)
 * 1 MYR = 100 sen
 */
export function convertMYRToSen(myrAmount: number): number {
  return Math.round(myrAmount * 100);
}

/**
 * Convert AUD amount to sen (for Billplz API)
 * This combines AUD to MYR conversion and MYR to sen conversion
 */
export function convertAUDToSen(audAmount: number, exchangeRate?: number): number {
  const myrAmount = convertAUDToMYR(audAmount, exchangeRate);
  return convertMYRToSen(myrAmount);
}

