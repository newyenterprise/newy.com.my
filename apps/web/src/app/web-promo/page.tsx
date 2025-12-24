"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@newy/ui";
import { Check, Zap, Clock, Shield, Star, ArrowRight, Loader2, Globe, Smartphone, TrendingUp, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useSearchParams } from "next/navigation";

const PROMO_PRICE = 499; // RM 499
const REGULAR_PRICE = 999; // Regular price for comparison

function WebPromoContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for payment error from redirect
  useEffect(() => {
    const paymentError = searchParams.get('error');
    if (paymentError === 'payment_failed') {
      setError('Payment was cancelled or failed. Please try again.');
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order in database
      // Using the same structure as checkout page to ensure compatibility
      // Explicitly set user_id to null for unauthenticated users (required by RLS policy)
      const orderData = {
        user_id: null, // Must be explicitly NULL for unauthenticated users per RLS policy
        customer_info: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || "",
        },
        items: [
          {
            name: "Website Development - Promo Package",
            description: "Complete website package with modern design, mobile responsive, and SEO optimization",
            price: PROMO_PRICE,
          }
        ],
        subtotal: PROMO_PRICE,
        tax: 0, // No tax for Malaysian customers
        total: PROMO_PRICE,
        status: 'pending',
        payment_method: 'billplz',
      };

      // Try inserting the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        // Enhanced error logging
        console.error('=== Order Creation Error ===');
        console.error('Error object:', orderError);
        console.error('Error stringified:', JSON.stringify(orderError, Object.getOwnPropertyNames(orderError)));
        console.error('Error keys:', Object.keys(orderError || {}));
        console.error('Order data:', JSON.stringify(orderData, null, 2));
        
        // Extract error message - check the stringified version first since error object might not serialize properly
        let errorMessage = 'Failed to create order. ';
        
        try {
          const errorStr = JSON.stringify(orderError, Object.getOwnPropertyNames(orderError));
          const errorParsed = JSON.parse(errorStr);
          
          if (errorParsed?.message) {
            errorMessage = errorParsed.message;
          } else if (errorParsed?.code === '42501') {
            errorMessage = 'Permission denied. Please refresh the page and try again.';
          } else if (errorParsed?.code) {
            errorMessage = `Database error (${errorParsed.code}). Please try again or contact support.`;
          }
        } catch {
          // Fallback to direct property access
          const errorMsg = (orderError as any)?.message;
          const errorCode = (orderError as any)?.code;
          
          if (errorMsg) {
            errorMessage = errorMsg;
          } else if (errorCode === '42501') {
            errorMessage = 'Permission denied. The database policy may have changed. Please refresh and try again.';
          }
        }
        
        console.error('Final error message:', errorMessage);
        throw new Error(errorMessage);
      }

      if (!order?.id) {
        throw new Error('Order was created but no ID was returned. Please contact support.');
      }

      // Create Billplz bill
      const response = await fetch('/api/billplz/create-bill-myr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          customerInfo: {
            email: formData.email,
            fullName: formData.fullName,
            phone: formData.phone,
          },
          amount: PROMO_PRICE, // Amount in MYR
          description: 'Website Development - Promo Package RM499',
          reference1: order.id,
          reference1Label: 'Order ID',
        }),
      });

      const billData = await response.json();

      if (!response.ok || billData.error) {
        // Provide more helpful error message
        let errorMsg = billData.error || 'Failed to create payment. Please try again.';
        
        if (errorMsg.toLowerCase().includes('access denied') || 
            errorMsg.toLowerCase().includes('unauthorized')) {
          errorMsg = 'Payment gateway access denied. Please verify your Billplz API credentials are correct and match your Collection ID.';
        }
        
        console.error('Billplz API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: billData.error,
          fullResponse: billData
        });
        
        throw new Error(errorMsg);
      }

      // Redirect to Billplz payment page
      window.location.href = billData.url;

    } catch (err) {
      console.error('Error processing order:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  const features = [
    { icon: <Globe className="h-5 w-5" />, text: "Modern & Responsive Design" },
    { icon: <Smartphone className="h-5 w-5" />, text: "Mobile-Friendly Layout" },
    { icon: <TrendingUp className="h-5 w-5" />, text: "SEO Optimized" },
    { icon: <Zap className="h-5 w-5" />, text: "Fast Loading Speed" },
    { icon: <Shield className="h-5 w-5" />, text: "SSL Certificate Included" },
    { icon: <Clock className="h-5 w-5" />, text: "7-10 Days Delivery" },
  ];

  const included = [
    "Up to 5 Pages Website",
    "Custom Design & Branding",
    "Mobile Responsive Design",
    "Contact Form Integration",
    "Social Media Integration",
    "Google Analytics Setup",
    "Basic SEO Optimization",
    "SSL Security Certificate",
    "Fast Hosting Included",
    "Free Domain (First Year)",
    "Content Upload Support",
    "1 Month Free Support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Clock className="h-4 w-4" />
              Limited Time Offer - First 30 Clients Only
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Launch Your Dream Website Today!
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
              Professional Website Development at an Unbeatable Price
            </p>

            {/* Price Display */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-5xl md:text-7xl font-bold text-purple-600 dark:text-purple-400">
                RM <span className="text-6xl md:text-8xl">{PROMO_PRICE}</span>
              </div>
              <div className="text-left">
                <div className="text-gray-500 dark:text-gray-400 line-through text-2xl">
                  RM {REGULAR_PRICE}
                </div>
                <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                  Save RM {REGULAR_PRICE - PROMO_PRICE}!
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <div className="text-purple-600 dark:text-purple-400">{feature.icon}</div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Benefits & Features */}
            <div className="space-y-8">
              {/* Problem Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Rasa Macam Website Dah Tak "Represent" Brand Anda? 😩</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Design outdated... loading slow... layout tak mobile friendly. Semua tu bagi "first impression" yang salah & signal "tak yakin" pada pelanggan.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded">
                    <p className="font-semibold text-red-800 dark:text-red-300">
                      Hakikatnya: Website outdated = trust drop = sales drop.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Solution Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">✅ Solution Untuk Anda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Kami buat servis revamp website supaya brand anda nampak lebih premium, lebih fresh & lebih meyakinkan.
                  </p>
                  <div className="space-y-3">
                    {included.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Apa Kata Pelanggan Kami?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                        "Alhamdulillah saya ada 3 bisnes, semua saya ambil slot website rahmah ni. Saya run ads guna website ni, leads memang laju masuk dan sales pun meningkat!"
                      </p>
                      <p className="text-sm font-semibold">- Satisfied Client</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Form */}
            <div className="sticky top-8">
              <Card className="border-2 border-purple-500 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="text-2xl text-center">
                    Claim Your Spot Now! ⏰
                  </CardTitle>
                  <p className="text-center opacity-90">
                    Limited slots available - First come first serve
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded flex items-start gap-2">
                        <X className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold">Error</p>
                          <p className="text-sm">{error}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setError(null)}
                          className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="+60 12-345 6789"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="Your company name"
                      />
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Package:</span>
                        <span className="font-semibold">Website Development</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Regular Price:</span>
                        <span className="line-through text-gray-500">RM {REGULAR_PRICE}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Discount:</span>
                        <span className="text-green-600 font-semibold">-RM {REGULAR_PRICE - PROMO_PRICE}</span>
                      </div>
                      <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-purple-600 dark:text-purple-400">RM {PROMO_PRICE}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay Now - RM {PROMO_PRICE}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Shield className="h-4 w-4" />
                      <span>Secure payment via Billplz</span>
                    </div>
                  </form>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-purple-600 dark:text-purple-400">7-10 Days</div>
                        <div className="text-gray-600 dark:text-gray-400">Fast Delivery</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-600 dark:text-purple-400">100%</div>
                        <div className="text-gray-600 dark:text-gray-400">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebPromoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <WebPromoContent />
    </Suspense>
  );
}

