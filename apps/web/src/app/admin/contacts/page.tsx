"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { Mail, Calendar, Search, Eye, CheckCircle, Reply, Trash2, X } from "lucide-react";
import { supabase, ContactMessage } from "../../../lib/supabase";

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read" | "replied">("all");
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating contact:', error);
        alert('Error updating contact');
      } else {
        setContacts(contacts => 
          contacts.map(contact => 
            contact.id === id 
              ? { ...contact, status, updated_at: new Date().toISOString() }
              : contact
          )
        );
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Error updating contact');
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact');
      } else {
        setContacts(contacts => contacts.filter(contact => contact.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'read':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'replied':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getMessageTypeColor = (type?: string) => {
    if (!type) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    
    switch (type) {
      case 'general':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'project':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'support':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'partnership':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Mark as read when selecting a contact
  const handleSelectContact = (contact: ContactMessage) => {
    setSelectedContact(contact);
    if (contact.status === 'unread') {
      updateContactStatus(contact.id, 'read');
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
        <h1 className="text-3xl font-bold font-display">Contact Messages</h1>
        <p className="text-muted-foreground mt-2">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-gray-900"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <Mail className="h-4 w-4 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'unread').length}</p>
              </div>
              <Eye className="h-4 w-4 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Read</p>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'read').length}</p>
              </div>
              <CheckCircle className="h-4 w-4 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Replied</p>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'replied').length}</p>
              </div>
              <Reply className="h-4 w-4 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                  <p className="text-gray-500">
                    {searchTerm || filterStatus !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Contact messages will appear here when submitted"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => (
              <Card 
                key={contact.id} 
                className={`border border-gray-200 bg-white shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  selectedContact?.id === contact.id ? 'ring-2 ring-gray-300' : ''
                } ${contact.status === 'unread' ? 'bg-yellow-50' : ''}`}
                onClick={() => handleSelectContact(contact)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${contact.status === 'unread' ? 'text-yellow-700' : 'text-gray-900'}`}>
                          {contact.full_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <p className={`text-sm mt-1 ${contact.status === 'unread' ? 'font-medium' : ''}`}>
                          {contact.subject}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        {contact.message_type && (
                          <Badge className={getMessageTypeColor(contact.message_type)}>
                            {contact.message_type}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm line-clamp-2 text-gray-600">{contact.message}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(contact.created_at).toLocaleString()}
                      </div>
                      {contact.status === 'unread' && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message Details */}
        {selectedContact && (
          <Card className="border border-gray-200 bg-white shadow-sm sticky top-6">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle>Message Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedContact(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm text-gray-900">{selectedContact.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                  {selectedContact.message_type && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Message Type</p>
                      <Badge className={getMessageTypeColor(selectedContact.message_type)}>
                        {selectedContact.message_type}
                      </Badge>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Received</p>
                    <p className="text-sm text-gray-900">{new Date(selectedContact.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h4 className="font-semibold mb-3">Message</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Subject</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg text-gray-900">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Message</p>
                    <div className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-wrap text-gray-900">
                      {selectedContact.message}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div>
                <h4 className="font-semibold mb-3">Update Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, 'read')}
                    disabled={selectedContact.status === 'read'}
                    className="text-blue-700 border-blue-200 hover:bg-blue-50"
                  >
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                    disabled={selectedContact.status === 'replied'}
                    className="text-green-700 border-green-200 hover:bg-green-50"
                  >
                    Mark Replied
                  </Button>
                </div>
              </div>

              {/* Contact Actions */}
              <div>
                <h4 className="font-semibold mb-3">Actions</h4>
                <div className="space-y-2">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Reply via Email
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteContact(selectedContact.id)}
                    className="w-full text-red-700 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
