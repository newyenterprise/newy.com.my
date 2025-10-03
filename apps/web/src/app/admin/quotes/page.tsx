"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@newy/ui";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Star,
  Globe,
  Smartphone,
  Brain,
  TrendingUp
} from "lucide-react";
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
  website: <Globe className="w-5 h-5" />,
  apps: <Smartphone className="w-5 h-5" />,
  ai: <Brain className="w-5 h-5" />,
  marketing: <TrendingUp className="w-5 h-5" />
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

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quotes:', error);
        return;
      }

        setQuotes(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId: string, status: string, finalQuote?: number) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ 
          status,
          final_quote: finalQuote,
          updated_at: new Date().toISOString()
        })
        .eq('id', quoteId);

      if (error) {
        console.error('Error updating quote:', error);
        return;
      }

      // Refresh quotes
      fetchQuotes();
      setSelectedQuote(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredQuotes = quotes.filter(quote => 
    statusFilter === 'all' || quote.status === statusFilter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-700">Loading quotes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote Requests</h1>
          <p className="text-gray-600">Manage and review customer quote requests</p>
      </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All', count: quotes.length },
              { key: 'pending', label: 'Pending', count: quotes.filter(q => q.status === 'pending').length },
              { key: 'reviewed', label: 'Reviewed', count: quotes.filter(q => q.status === 'reviewed').length },
              { key: 'quoted', label: 'Quoted', count: quotes.filter(q => q.status === 'quoted').length },
              { key: 'accepted', label: 'Accepted', count: quotes.filter(q => q.status === 'accepted').length },
              { key: 'rejected', label: 'Rejected', count: quotes.filter(q => q.status === 'rejected').length }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={statusFilter === filter.key ? "default" : "outline"}
                onClick={() => setStatusFilter(filter.key)}
                className={`${
                  statusFilter === filter.key 
                    ? 'bg-gray-900 text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
              </div>
            </div>

        {/* Quotes Grid */}
        <div className="grid gap-6">
          {filteredQuotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {serviceIcons[quote.service as keyof typeof serviceIcons]}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {serviceNames[quote.service as keyof typeof serviceNames]}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {quote.customer_info.fullName} • {quote.customer_info.company || 'No company'}
                    </p>
          </div>
              </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[quote.status]}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedQuote(quote)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
            </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{quote.customer_info.email}</span>
            </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{quote.customer_info.phone}</span>
              </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </span>
            </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold text-gray-900">
                    ${quote.estimated_total.toLocaleString()}
                  </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {quote.selected_addons.length} add-ons selected
                </div>
                <div className="flex gap-2">
                  {quote.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateQuoteStatus(quote.id, 'reviewed')}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Reviewed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
              </div>
            </div>
            </motion.div>
          ))}
      </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotes found</h3>
            <p className="text-gray-600">
              {statusFilter === 'all' 
                ? 'No quote requests have been submitted yet.'
                : `No quotes with status "${statusFilter}" found.`
              }
            </p>
          </div>
          )}
        </div>

      {/* Quote Details Modal */}
        {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Quote Request Details</h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>{selectedQuote.customer_info.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    <span>{selectedQuote.customer_info.phone}</span>
                    </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building className="w-4 h-4" />
                    <span>{selectedQuote.customer_info.company || 'No company'}</span>
                    </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedQuote.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <p className="text-gray-800 mt-1">{selectedQuote.customer_info.projectDescription}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Budget</label>
                      <p className="text-gray-800 mt-1">{selectedQuote.customer_info.budget || 'Not specified'}</p>
                  </div>
                  <div>
                      <label className="text-sm text-gray-500">Timeline</label>
                      <p className="text-gray-800 mt-1">{selectedQuote.customer_info.timeline || 'Not specified'}</p>
                  </div>
                    </div>
                  {selectedQuote.customer_info.additionalNotes && (
                    <div>
                      <label className="text-sm text-gray-500">Additional Notes</label>
                      <p className="text-gray-800 mt-1">{selectedQuote.customer_info.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Breakdown</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Base Price:</span>
                    <span className="text-gray-900">${selectedQuote.base_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Add-ons Total:</span>
                    <span className="text-gray-900">+${selectedQuote.addons_total.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Estimated Total:</span>
                      <span className="text-gray-900">${selectedQuote.estimated_total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedQuote.status === 'pending' && (
                  <>
                  <Button
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'reviewed')}
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                  >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Reviewed
                  </Button>
                  <Button
                    variant="outline"
                      onClick={() => updateQuoteStatus(selectedQuote.id, 'rejected')}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Quote
                  </Button>
                  </>
                )}
                  <Button
                    variant="outline"
                  onClick={() => setSelectedQuote(null)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Close
                  </Button>
                </div>
              </div>
          </motion.div>
              </div>
        )}
    </div>
  );
}
