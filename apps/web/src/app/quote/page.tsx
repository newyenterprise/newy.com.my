"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@digitallinked/ui";
import { ArrowLeft, User, Mail, Phone, Building, MapPin, MessageSquare, Check, Star, Globe, Smartphone, Brain, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

interface QuoteRequest {
  service: string;
  serviceType: string;
  platform: string;
  platformName: string;
  selectedAddOns: string[];
  basePrice: number;
  addOnsTotal: number;
  estimatedTotal: number;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    projectDescription: string;
    budget: string;
    timeline: string;
    additionalNotes: string;
  };
}

const serviceIcons = {
  website: <Globe className="w-6 h-6" />,
  webapp: <Globe className="w-6 h-6" />,
  apps: <Smartphone className="w-6 h-6" />,
  ai: <Brain className="w-6 h-6" />,
  marketing: <TrendingUp className="w-6 h-6" />
};

const serviceNames = {
  website: "Website Development",
  webapp: "Web Applications",
  apps: "Mobile Apps",
  ai: "AI Automation",
  marketing: "Digital Marketing"
};

export default function QuoteRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wantsAccount, setWantsAccount] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>({
    service: searchParams.get('service') || '',
    serviceType: searchParams.get('serviceType') || '',
    platform: searchParams.get('platform') || '',
    platformName: searchParams.get('platformName') || '',
    selectedAddOns: JSON.parse(searchParams.get('addOns') || '[]'),
    basePrice: parseInt(searchParams.get('basePrice') || '0'),
    addOnsTotal: parseInt(searchParams.get('addOnsTotal') || '0'),
    estimatedTotal: parseInt(searchParams.get('estimatedTotal') || '0'),
    customerInfo: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      projectDescription: '',
      budget: '',
      timeline: '',
      additionalNotes: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuoteRequest(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value
      }
    }));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let userId = null;

      // Create user account if requested
      if (wantsAccount && accountPassword) {
        console.log('Attempting to create user account for:', quoteRequest.customerInfo.email);
        
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: quoteRequest.customerInfo.email,
            password: accountPassword,
            options: {
              data: {
                full_name: quoteRequest.customerInfo.fullName,
                company: quoteRequest.customerInfo.company,
                phone: quoteRequest.customerInfo.phone
              }
            }
          });

          if (authError) {
            console.error('Error creating account:', authError);
            console.error('Full auth error details:', JSON.stringify(authError, null, 2));
            alert(`Account creation failed: ${authError.message}. Quote will still be submitted.`);
            // Continue without account creation
          } else {
            console.log('User account created successfully:', authData.user?.id);
            console.log('Full auth data:', JSON.stringify(authData, null, 2));
            userId = authData.user?.id;
            
            // Check if email confirmation is required
            if (authData.user && !authData.user.email_confirmed_at) {
              console.log('Email confirmation required for user:', authData.user.id);
              // User created but needs email confirmation
            }
          }
        } catch (error) {
          console.error('Unexpected error during user creation:', error);
          alert(`Account creation failed due to an unexpected error. Quote will still be submitted.`);
        }
      }

      // Save quote request to database
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([{
          service: quoteRequest.service,
          selected_addons: quoteRequest.selectedAddOns,
          base_price: quoteRequest.basePrice,
          addons_total: quoteRequest.addOnsTotal,
          estimated_total: quoteRequest.estimatedTotal,
          customer_info: quoteRequest.customerInfo,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving quote request:', error);
        throw new Error('Failed to save quote request');
      }

      // Send email notification
      await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteId: data.id,
          customerInfo: quoteRequest.customerInfo,
          service: quoteRequest.service,
          selectedAddOns: quoteRequest.selectedAddOns,
          basePrice: quoteRequest.basePrice,
          addOnsTotal: quoteRequest.addOnsTotal,
          estimatedTotal: quoteRequest.estimatedTotal,
          hasAccount: wantsAccount && userId !== null
        }),
      });

      setIsSuccess(true);
      
      // Redirect to success page with quote data after 3 seconds
      setTimeout(() => {
        const params = new URLSearchParams({
          service: quoteRequest.service,
          serviceType: quoteRequest.serviceType || '',
          platform: quoteRequest.platform || '',
          platformName: quoteRequest.platformName || '',
          addOns: JSON.stringify(quoteRequest.selectedAddOns),
          basePrice: quoteRequest.basePrice.toString(),
          addOnsTotal: quoteRequest.addOnsTotal.toString(),
          estimatedTotal: quoteRequest.estimatedTotal.toString()
        });
        router.push(`/quote/success?${params.toString()}`);
      }, 3000);

    } catch (error) {
      console.error('Error submitting quote request:', error);
      setIsSubmitting(false);
      // Show error message to user
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="h-8 w-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl text-white">Quote Request Sent!</CardTitle>
              <p className="text-gray-300 mt-2">
                Thank you for your interest. We'll review your requirements and send you a detailed quote within 24 hours.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-gray-400"
              >
                Redirecting to success page...
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-yellow-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pricing
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Request Your Quote</h1>
              <p className="text-gray-300">Get a personalized quote for your project</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 sticky top-6 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  Quote Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Service Card */}
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                      {serviceIcons[quoteRequest.service as keyof typeof serviceIcons]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">
                        {serviceNames[quoteRequest.service as keyof typeof serviceNames]}
                      </h4>
                      <p className="text-xs text-gray-400">Base Package</p>
                    </div>
                  </div>
                  
                  {/* Service Type */}
                  {quoteRequest.serviceType && (
                    <div className="mt-3 pt-3 border-t border-gray-600/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Service Type:</span>
                        <span className="text-xs font-medium text-blue-400">
                          {quoteRequest.serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Platform */}
                  {quoteRequest.platformName && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Platform:</span>
                        <span className="text-xs font-medium text-green-400">
                          {quoteRequest.platformName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add-ons Section */}
                {quoteRequest.selectedAddOns.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                      <span className="text-xs text-gray-400 font-medium">Additional Services</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                    </div>
                    <div className="space-y-2">
                      {quoteRequest.selectedAddOns.map((addOn, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg"
                        >
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-gray-300">{addOn}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                {/* Info Message */}
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-300 mb-1">Quote Delivery</p>
                        <p className="text-xs text-gray-400">
                          We'll email your personalized quote within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-green-300 mb-1">No Obligation</p>
                        <p className="text-xs text-gray-400">
                          Free quote with no commitment required
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote Request Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-400" />
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={quoteRequest.customerInfo.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={quoteRequest.customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={quoteRequest.customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+61 400 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={quoteRequest.customerInfo.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                    </div>
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={quoteRequest.customerInfo.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us about your project goals, target audience, and any specific features you need..."
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={quoteRequest.customerInfo.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" className="bg-gray-800 text-gray-400">Select budget range</option>
                        <option value="under-5k" className="bg-gray-800">Under $5,000</option>
                        <option value="5k-10k" className="bg-gray-800">$5,000 - $10,000</option>
                        <option value="10k-25k" className="bg-gray-800">$10,000 - $25,000</option>
                        <option value="25k-50k" className="bg-gray-800">$25,000 - $50,000</option>
                        <option value="over-50k" className="bg-gray-800">Over $50,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={quoteRequest.customerInfo.timeline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" className="bg-gray-800 text-gray-400">Select timeline</option>
                        <option value="asap" className="bg-gray-800">ASAP</option>
                        <option value="1-month" className="bg-gray-800">Within 1 month</option>
                        <option value="2-3-months" className="bg-gray-800">2-3 months</option>
                        <option value="3-6-months" className="bg-gray-800">3-6 months</option>
                        <option value="flexible" className="bg-gray-800">Flexible</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={quoteRequest.customerInfo.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Any additional requirements, preferences, or questions..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* User Account Signup */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-green-400" />
                    </div>
                    Create Account (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-300 mb-2">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Benefits of Creating an Account</span>
                    </div>
                    <ul className="text-sm text-purple-400 space-y-1">
                      <li>• Track your quote status in real-time</li>
                      <li>• Access your quote history anytime</li>
                      <li>• Faster checkout for future projects</li>
                      <li>• Receive project updates and notifications</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      id="wantsAccount"
                      checked={wantsAccount}
                      onChange={(e) => setWantsAccount(e.target.checked)}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                    />
                    <label htmlFor="wantsAccount" className="text-white cursor-pointer flex-1">
                      Yes, create an account for me
                    </label>
                  </div>
                  
                  {wantsAccount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password *
                        </label>
                        <input
                          type="password"
                          value={accountPassword}
                          onChange={(e) => setAccountPassword(e.target.value)}
                          required={wantsAccount}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Create a secure password"
                        />
                      </div>
                      <p className="text-xs text-gray-400">
                        Your account will be created with the email address provided above.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 text-white py-4 text-lg shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Star className="w-5 h-5" />
                      </motion.div>
                      Submitting Quote Request...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
