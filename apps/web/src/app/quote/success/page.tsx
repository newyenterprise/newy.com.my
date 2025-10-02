"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@digitallinked/ui";
import { Check, Mail, Phone, Clock, ArrowRight, Star, DollarSign, Globe, Smartphone, Brain, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

function QuoteSuccessContent() {
  const searchParams = useSearchParams();
  const [quoteData, setQuoteData] = useState({
    service: '',
    serviceType: '',
    platform: '',
    platformName: '',
    selectedAddOns: [],
    basePrice: 0,
    addOnsTotal: 0,
    estimatedTotal: 0
  });

  useEffect(() => {
    // Get quote data from URL parameters
    const service = searchParams.get('service') || '';
    const serviceType = searchParams.get('serviceType') || '';
    const platform = searchParams.get('platform') || '';
    const platformName = searchParams.get('platformName') || '';
    const selectedAddOns = JSON.parse(searchParams.get('addOns') || '[]');
    const basePrice = parseInt(searchParams.get('basePrice') || '0');
    const addOnsTotal = parseInt(searchParams.get('addOnsTotal') || '0');
    const estimatedTotal = parseInt(searchParams.get('estimatedTotal') || '0');

    setQuoteData({
      service,
      serviceType,
      platform,
      platformName,
      selectedAddOns,
      basePrice,
      addOnsTotal,
      estimatedTotal
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          {/* Success Header */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-3xl text-white mb-4">Quote Request Received!</CardTitle>
                <p className="text-gray-300 text-lg">
                  Thank you for your interest in our services. We've received your quote request and sent a detailed quote to your email.
                </p>
              </motion.div>
            </CardHeader>
          </Card>

          {/* Quote Details */}
          {quoteData.service && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Your Quote Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                {serviceIcons[quoteData.service as keyof typeof serviceIcons]}
                <div>
                  <h4 className="font-semibold text-white">
                    {serviceNames[quoteData.service as keyof typeof serviceNames]}
                  </h4>
                  {quoteData.serviceType && (
                    <p className="text-sm text-blue-400">
                      {quoteData.serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  )}
                  {quoteData.platformName && (
                    <p className="text-sm text-green-400">{quoteData.platformName}</p>
                  )}
                  {!quoteData.serviceType && !quoteData.platformName && (
                    <p className="text-sm text-gray-300">Base Package</p>
                  )}
                </div>
              </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Base Price:</span>
                    <span className="text-white font-semibold">${quoteData.basePrice.toLocaleString()}</span>
                  </div>
                  
                  {quoteData.selectedAddOns.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">Selected Add-ons:</p>
                      {quoteData.selectedAddOns.map((addOn, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-400 ml-4">+ {addOn}</span>
                          <span className="text-gray-300">+$500</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Add-ons Total:</span>
                        <span className="text-white">+${quoteData.addOnsTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Estimated Total:</span>
                      <span className="text-yellow-400 text-xl">${quoteData.estimatedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-300">
                    <strong>Note:</strong> This is an estimated price. Final quote may vary based on your specific requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* What's Next Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="space-y-6 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-purple-500/10 to-yellow-500/10 border border-purple-500/20 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  What happens next?
                </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Review & Analysis</h4>
                    <p className="text-gray-300 text-sm">Our team will review your requirements and analyze your project needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Personalized Quote</h4>
                    <p className="text-gray-300 text-sm">We'll prepare a detailed quote tailored to your specific requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Follow-up Call</h4>
                    <p className="text-gray-300 text-sm">We'll contact you within 24 hours to discuss your project and answer any questions.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid md:grid-cols-3 gap-4"
            >
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">Email Confirmation</h4>
                <p className="text-gray-300 text-sm">Check your email for quote details and next steps.</p>
              </div>
              
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">24-Hour Response</h4>
                <p className="text-gray-300 text-sm">We'll contact you within 24 hours to discuss your project.</p>
              </div>
              
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">Quick Turnaround</h4>
                <p className="text-gray-300 text-sm">Detailed quote delivered within 2-3 business days.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/portfolio" className="flex-1">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">
                Questions? Contact us at{" "}
                <a href="mailto:hello@digitallinked.com.au" className="text-purple-400 hover:text-purple-300">
                  hello@digitallinked.com.au
                </a>
              </p>
            </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function QuoteSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-10 text-white">Loading...</div>}>
      <QuoteSuccessContent />
    </Suspense>
  );
}
