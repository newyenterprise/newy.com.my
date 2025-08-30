"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { Check, ArrowRight, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

interface OrderDetails {
  id: string;
  customer_info: {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
  };
  items: Array<{
    name: string;
    description: string;
    price: number;
  }>;
  total: number;
  status: string;
  created_at: string;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateOrderAndFetchDetails = async () => {
      if (!orderId || !sessionId) {
        setError("Missing order information");
        setLoading(false);
        return;
      }

      try {
        // Update order status to paid
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            stripe_session_id: sessionId,
            paid_at: new Date().toISOString()
          })
          .eq('id', orderId);

        if (updateError) {
          console.error('Error updating order:', updateError);
        }

        // Fetch order details
        const { data: order, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (fetchError) {
          console.error('Error fetching order:', fetchError);
          setError("Could not load order details");
        } else {
          setOrderDetails(order);
          
          // Send confirmation email
          try {
            await fetch('/api/send-order-confirmation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: order.id,
                customerInfo: order.customer_info,
                items: order.items,
                total: order.total
              }),
            });
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
          }
        }
      } catch (err) {
        console.error('Error processing order:', err);
        setError("An error occurred while processing your order");
      } finally {
        setLoading(false);
      }
    };

    updateOrderAndFetchDetails();
  }, [orderId, sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Processing your order...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Order Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl opacity-90">
              Thank you for choosing Digital Linked
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Confirmation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Order Confirmed
                </CardTitle>
                <CardDescription>
                  Order #{orderDetails?.id.slice(-8).toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {orderDetails?.customer_info.fullName}</p>
                      <p><strong>Email:</strong> {orderDetails?.customer_info.email}</p>
                      <p><strong>Phone:</strong> {orderDetails?.customer_info.phone}</p>
                      {orderDetails?.customer_info.company && (
                        <p><strong>Company:</strong> {orderDetails.customer_info.company}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {orderDetails?.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                          <p className="font-medium">${item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Paid:</span>
                      <span className="text-green-600">
                        ${orderDetails?.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  What Happens Next?
                </CardTitle>
                <CardDescription>
                  Here's what you can expect from us
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Confirmation Email</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a detailed confirmation email within the next few minutes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Project Manager Contact</h4>
                      <p className="text-sm text-muted-foreground">
                        Our project manager will contact you within 24 hours to schedule your kickoff call.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Project Kickoff</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll discuss your requirements, timeline, and begin development immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Regular Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive regular progress updates and have access to our project portal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    Need immediate assistance?
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Mail className="h-4 w-4" />
                      <span>hello@digitallinked.com.au</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Phone className="h-4 w-4" />
                      <span>0406 612 824</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  View Your Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Questions? Check out our{" "}
              <Link href="/contact" className="text-purple-600 hover:underline">
                support center
              </Link>{" "}
              or contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
