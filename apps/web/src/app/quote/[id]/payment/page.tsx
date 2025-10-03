"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@newy/ui";
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  DollarSign,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

interface QuoteRequest {
  id: string;
  service: string;
  selected_addons: string[];
  base_price: number;
  addons_total: number;
  estimated_total: number;
  customer_info: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
  };
  status: string;
  final_quote?: number;
}

export default function QuotePaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (params.id) {
      fetchQuote(params.id as string);
    }
  }, [params.id]);

  const fetchQuote = async (quoteId: string) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .eq('id', quoteId)
        .single();

      if (error) {
        console.error('Error fetching quote:', error);
        return;
      }

      setQuote(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!quote) return;
    
    setIsProcessing(true);
    try {
      // Create order in database
      const orderData = {
        quote_id: quote.id,
        customer_info: quote.customer_info,
        service: quote.service,
        selected_addons: quote.selected_addons,
        total_amount: quote.final_quote || quote.estimated_total,
        status: 'pending_payment',
        payment_method: paymentMethod,
        created_at: new Date().toISOString()
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Failed to create order');
      }

      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          quoteId: quote.id,
          customerInfo: quote.customer_info,
          total: quote.final_quote || quote.estimated_total,
          service: quote.service
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe checkout
      window.location.href = url;

    } catch (error) {
      console.error('Error processing payment:', error);
      setIsProcessing(false);
      // Show error message to user
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading payment details...</div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Quote Not Found</h1>
          <p className="text-gray-400 mb-6">The quote you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/')} className="bg-purple-600 hover:bg-purple-700 text-white">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const totalAmount = quote.final_quote || quote.estimated_total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push(`/quote/${quote.id}`)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quote
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Complete Payment</h1>
              <p className="text-gray-400">Secure payment for your accepted quote</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-purple-500"
                      />
                      <label htmlFor="card" className="flex items-center gap-2 cursor-pointer text-white">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="bank"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-purple-500"
                      />
                      <label htmlFor="bank" className="cursor-pointer text-white">
                        Bank Transfer (Invoice will be sent)
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-300 mb-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-400">
                      Your payment information is encrypted and secure. We use Stripe for payment processing.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Billing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Name:</span>
                      <span className="text-white">{quote.customer_info.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white">{quote.customer_info.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Phone:</span>
                      <span className="text-white">{quote.customer_info.phone}</span>
                    </div>
                    {quote.customer_info.company && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Company:</span>
                        <span className="text-white">{quote.customer_info.company}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Base Price:</span>
                      <span className="text-white">${quote.base_price.toLocaleString()}</span>
                    </div>
                    
                    {quote.selected_addons.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-300">Add-ons:</p>
                        {quote.selected_addons.map((addOn, index) => (
                          <div key={index} className="flex justify-between text-xs text-gray-400 ml-2">
                            <span>+ {addOn}</span>
                            <span>+$500</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Add-ons Total:</span>
                      <span className="text-white">+${quote.addons_total.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total Amount:</span>
                        <span className="text-yellow-400 text-lg">${totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 text-white py-4 text-lg shadow-lg hover:shadow-xl"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          {paymentMethod === 'card' ? 'Pay with Card' : 'Request Invoice'}
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      What happens next?
                    </h5>
                    <ul className="text-sm text-green-400 space-y-1">
                      <li>• Payment processed securely</li>
                      <li>• Project kickoff call scheduled</li>
                      <li>• Development begins immediately</li>
                      <li>• Regular progress updates</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
