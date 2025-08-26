"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import { Eye, Mail, Phone, Building, Calendar, Search, Filter, CheckCircle, X, Clock } from "lucide-react";
import { supabase, Quote } from "../../../lib/supabase";

export default function QuotesManagementPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "reviewed" | "quoted" | "accepted" | "rejected">("all");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quotes:', error);
      } else {
        setQuotes(data || []);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating quote:', error);
        alert('Error updating quote');
      } else {
        setQuotes(quotes => 
          quotes.map(quote => 
            quote.id === id 
              ? { ...quote, status, updated_at: new Date().toISOString() }
              : quote
          )
        );
        if (selectedQuote?.id === id) {
          setSelectedQuote(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (error) {
      console.error('Error updating quote:', error);
      alert('Error updating quote');
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.project_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || quote.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'quoted':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'website':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'apps':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ai_automation':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'marketing':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display">Quote Requests</h1>
        <p className="text-muted-foreground mt-2">
          Manage and respond to client quote requests
        </p>
      </div>

      {/* Filters */}
      <Card className="border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="quoted">Quoted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{quotes.length}</p>
              </div>
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'pending').length}</p>
              </div>
              <Clock className="h-4 w-4 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quoted</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'quoted').length}</p>
              </div>
              <Filter className="h-4 w-4 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'accepted').length}</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{quotes.filter(q => q.status === 'rejected').length}</p>
              </div>
              <X className="h-4 w-4 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <Card className="border-purple-500/20">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No quotes found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterStatus !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Quote requests will appear here when submitted"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card 
                key={quote.id} 
                className={`border-purple-500/20 cursor-pointer transition-all hover:shadow-lg ${
                  selectedQuote?.id === quote.id ? 'ring-2 ring-purple-500/40' : ''
                }`}
                onClick={() => setSelectedQuote(quote)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{quote.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{quote.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getProjectTypeColor(quote.project_type)}>
                          {quote.project_type.replace('_', ' ')}
                        </Badge>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm line-clamp-2">{quote.project_description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(quote.created_at).toLocaleDateString()}</span>
                      {quote.budget_range && <span>Budget: {quote.budget_range}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quote Details */}
        {selectedQuote && (
          <Card className="border-purple-500/20 sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quote Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedQuote(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Client Info */}
              <div>
                <h4 className="font-semibold mb-3">Client Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedQuote.email}</span>
                  </div>
                  {selectedQuote.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedQuote.phone}</span>
                    </div>
                  )}
                  {selectedQuote.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedQuote.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(selectedQuote.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h4 className="font-semibold mb-3">Project Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Project Type</p>
                    <Badge className={getProjectTypeColor(selectedQuote.project_type)}>
                      {selectedQuote.project_type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedQuote.project_description}</p>
                  </div>
                  {selectedQuote.budget_range && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
                      <p className="text-sm">{selectedQuote.budget_range}</p>
                    </div>
                  )}
                  {selectedQuote.timeline && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                      <p className="text-sm">{selectedQuote.timeline}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div>
                <h4 className="font-semibold mb-3">Update Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'reviewed')}
                    disabled={selectedQuote.status === 'reviewed'}
                    className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                  >
                    Mark Reviewed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'quoted')}
                    disabled={selectedQuote.status === 'quoted'}
                    className="text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
                  >
                    Mark Quoted
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'accepted')}
                    disabled={selectedQuote.status === 'accepted'}
                    className="text-green-400 border-green-500/30 hover:bg-green-500/10"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'rejected')}
                    disabled={selectedQuote.status === 'rejected'}
                    className="text-red-400 border-red-500/30 hover:bg-red-500/10"
                  >
                    Reject
                  </Button>
                </div>
              </div>

              {/* Contact Actions */}
              <div>
                <h4 className="font-semibold mb-3">Contact Client</h4>
                <div className="space-y-2">
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Re: Your ${selectedQuote.project_type.replace('_', ' ')} Project Quote`}
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </a>
                  {selectedQuote.phone && (
                    <a href={`tel:${selectedQuote.phone}`} className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Client
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
