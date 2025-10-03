"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@newy/ui";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Calendar, 
  Mail, 
  Phone,
  Building,
  Star,
  Globe,
  Smartphone,
  Brain,
  TrendingUp,
  CreditCard,
  FileText
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

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
    projectDescription: string;
    budget: string;
    timeline: string;
    additionalNotes: string;
  };
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  final_quote?: number;
  created_at: string;
  updated_at: string;
}

const serviceIcons = {
  website: <Globe className="w-6 h-6" />,
  apps: <Smartphone className="w-6 h-6" />,
  ai: <Brain className="w-6 h-6" />,
  marketing: <TrendingUp className="w-6 h-6" />
};

const serviceNames = {
  website: "Website Development",
  apps: "Mobile Apps",
  ai: "AI Automation",
  marketing: "Digital Marketing"
};

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  reviewed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  quoted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  accepted: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30"
};

export default function QuoteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const acceptQuote = async () => {
    if (!quote) return;
    
    setIsProcessing(true);
    try {
      // Update quote status to accepted
      const { error } = await supabase
        .from('quote_requests')
        .update({ 
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', quote.id);

      if (error) {
        console.error('Error accepting quote:', error);
        return;
      }

      // Redirect to payment page
      router.push(`/quote/${quote.id}/payment`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectQuote = async () => {
    if (!quote) return;
    
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', quote.id);

      if (error) {
        console.error('Error rejecting quote:', error);
        return;
      }

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading quote...</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Quote</h1>
            <p className="text-gray-400">Review your personalized quote and project details</p>
          </div>

          {/* Quote Status */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {serviceIcons[quote.service as keyof typeof serviceIcons]}
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {serviceNames[quote.service as keyof typeof serviceNames]}
                    </h2>
                    <p className="text-gray-400">Quote #{quote.id.slice(0, 8)}</p>
                  </div>
                </div>
                <Badge className={statusColors[quote.status]}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Breakdown */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Base Package</span>
                  <span className="text-white font-semibold">${quote.base_price.toLocaleString()}</span>
                </div>
                
                {quote.selected_addons.length > 0 && (
                  <div className="border-t border-gray-600 pt-3">
                    <h4 className="text-gray-300 mb-2">Selected Add-ons:</h4>
                    {quote.selected_addons.map((addon, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">+ {addon}</span>
                        <span className="text-gray-300">+$500</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
                      <span className="text-gray-300">Add-ons Total</span>
                      <span className="text-white">+${quote.addons_total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Quote</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${(quote.final_quote || quote.estimated_total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-gray-300 mb-2">Project Description</h4>
                <p className="text-white">{quote.customer_info.projectDescription}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-300 mb-2">Budget Range</h4>
                  <p className="text-white">{quote.customer_info.budget || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="text-gray-300 mb-2">Timeline</h4>
                  <p className="text-white">{quote.customer_info.timeline || 'Not specified'}</p>
                </div>
              </div>
              
              {quote.customer_info.additionalNotes && (
                <div>
                  <h4 className="text-gray-300 mb-2">Additional Notes</h4>
                  <p className="text-white">{quote.customer_info.additionalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{quote.customer_info.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{quote.customer_info.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building className="w-4 h-4" />
                  <span>{quote.customer_info.company || 'No company'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Created {new Date(quote.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {quote.status === 'quoted' && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-400">
                    Accept this quote to proceed with your project. We'll contact you within 24 hours to begin.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={acceptQuote}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white px-8 py-3"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Accept Quote
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={rejectQuote}
                      disabled={isProcessing}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-3"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Decline Quote
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          )}

          {quote.status === 'accepted' && (
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">Quote Accepted!</h3>
                <p className="text-gray-400 mb-4">
                  Thank you for accepting our quote. We'll contact you within 24 hours to begin your project.
                </p>
                <Button
                  onClick={() => router.push(`/quote/${quote.id}/payment`)}
                  className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 text-white"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
