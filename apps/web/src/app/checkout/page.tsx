"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@newy/ui";
import { ArrowLeft, CreditCard, Shield, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../contexts/auth-context";
import { supabase } from "../../lib/supabase";

interface CheckoutItem {
  id: string;
  name: string;
  description: string;
  price: number;
  addOns?: Array<{
    name: string;
    price: number;
  }>;
}

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CheckoutItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "Australia",
    postalCode: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("billplz"); // Default to Billplz for Malaysian customers

  // Load cart from localStorage or state management
  useEffect(() => {
    // In a real app, you'd get this from your state management or localStorage
    // For now, we'll simulate some cart items
    const mockCartItems: CheckoutItem[] = [
      {
        id: "business-website",
        name: "Business Website",
        description: "Professional website with CMS",
        price: 4500,
        addOns: [
          { name: "SEO Optimization", price: 1200 },
          { name: "Blog System", price: 800 }
        ]
      }
    ];
    setCartItems(mockCartItems);

    // Pre-fill user info if logged in
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        email: user.email || "",
        fullName: user.user_metadata?.full_name || ""
      }));
    }
  }, [user]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const addOnTotal = item.addOns?.reduce((addOnSum, addOn) => addOnSum + addOn.price, 0) || 0;
      return sum + item.price + addOnTotal;
    }, 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // 10% GST for Australia
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order in database
      const orderData = {
        user_id: user?.id || null,
        customer_info: customerInfo,
        items: cartItems,
        subtotal: calculateSubtotal(),
        tax: calculateTax(calculateSubtotal()),
        total: calculateTotal(),
        status: 'pending',
        payment_method: paymentMethod
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

      // Handle different payment methods
      if (paymentMethod === 'billplz') {
        // Create Billplz bill
        const response = await fetch('/api/billplz/create-bill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: order.id,
            customerInfo: {
              email: customerInfo.email,
              fullName: customerInfo.fullName,
              phone: customerInfo.phone,
            },
            amount: calculateTotal(),
            description: `Order for ${cartItems.map(item => item.name).join(', ')}`,
            reference1: order.id,
            reference1Label: 'Order ID',
          }),
        });

        const { url, error } = await response.json();

        if (error) {
          throw new Error(error);
        }

        // Redirect to Billplz payment page
        window.location.href = url;
      } else if (paymentMethod === 'card') {
        // Create Stripe checkout session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: order.id,
            items: cartItems,
            customerInfo,
            total: calculateTotal()
          }),
        });

        const { url, error } = await response.json();

        if (error) {
          throw new Error(error);
        }

        // Redirect to Stripe checkout
        window.location.href = url;
      } else {
        // Bank transfer - just mark as pending
        setIsProcessing(false);
        setOrderComplete(true);
      }

    } catch (error) {
      console.error('Error processing order:', error);
      setIsProcessing(false);
      // Show error message to user
      alert('Failed to process payment. Please try again.');
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Order Complete!</CardTitle>
            <CardDescription>
              Thank you for your order. We'll be in touch within 24 hours to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pricing
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="opacity-90">Complete your order</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>
                    Please provide your contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+61 400 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={customerInfo.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>
                    Where should we send your invoice?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Sydney"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={customerInfo.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={customerInfo.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="2000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Choose how you'd like to pay
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                      <label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card (Stripe)</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="billplz"
                        name="paymentMethod"
                        value="billplz"
                        checked={paymentMethod === "billplz"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-purple-500"
                      />
                      <label htmlFor="billplz" className="flex items-center gap-2 cursor-pointer">
                        <span>Billplz (FPX, Credit Card, E-Wallet)</span>
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
                      <label htmlFor="bank" className="cursor-pointer">
                        Bank Transfer (Invoice will be sent)
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {paymentMethod === 'billplz' 
                        ? 'Your payment is processed securely through Billplz. Supports FPX, Credit Cards, and E-Wallets (Boost, Touch n Go, GrabPay, ShopeePay, etc.).'
                        : 'Your payment information is encrypted and secure. We use Stripe for payment processing.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Complete Order - ${calculateTotal().toLocaleString()}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>${item.price.toLocaleString()}</span>
                      </div>
                      {item.addOns && item.addOns.map((addOn, addOnIndex) => (
                        <div key={addOnIndex} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">+ {addOn.name}:</span>
                          <span>${addOn.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (10%):</span>
                      <span>${calculateTax(calculateSubtotal()).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-purple-600">
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    What happens next?
                  </h5>
                  <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                    <li>• We'll contact you within 24 hours</li>
                    <li>• Project kickoff call scheduled</li>
                    <li>• Development begins immediately</li>
                    <li>• Regular progress updates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
