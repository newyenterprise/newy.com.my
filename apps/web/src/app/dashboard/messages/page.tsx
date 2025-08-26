"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { Button } from "@digitallinked/ui";
import { Badge } from "@digitallinked/ui";
import { MessageSquare, Send, Clock, CheckCircle } from "lucide-react";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock messages data - in a real app, this would come from your database
  const messages = [
    {
      id: 1,
      from: "Digital Linked Team",
      subject: "Project Update - Website Development",
      content: "Hi there! We wanted to let you know that we've completed the initial design phase of your website. The mockups are ready for your review. Please check your email for the design files and let us know your feedback.",
      date: "2024-01-15T10:30:00",
      read: false,
      type: "project-update"
    },
    {
      id: 2,
      from: "Support Team",
      subject: "Invoice #INV-001 Available",
      content: "Your invoice for the Website Development Package is now available for download. You can access it from your purchase history or click the link below to download directly.",
      date: "2024-01-14T14:20:00",
      read: true,
      type: "billing"
    },
    {
      id: 3,
      from: "Project Manager",
      subject: "SEO Optimization Complete",
      content: "Great news! We've completed the SEO optimization for your website. The changes have been implemented and we're already seeing improvements in search rankings. We'll send you a detailed report next week.",
      date: "2024-01-12T09:15:00",
      read: true,
      type: "project-complete"
    },
    {
      id: 4,
      from: "Digital Linked Team",
      subject: "Welcome to Digital Linked!",
      content: "Welcome aboard! We're excited to have you as a client. Your account has been set up and you can now access your dashboard to track your projects, view invoices, and communicate with our team.",
      date: "2024-01-10T16:45:00",
      read: true,
      type: "welcome"
    }
  ];

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "project-update":
        return "bg-blue-100 text-blue-800";
      case "billing":
        return "bg-green-100 text-green-800";
      case "project-complete":
        return "bg-purple-100 text-purple-800";
      case "welcome":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMessageTypeText = (type: string) => {
    switch (type) {
      case "project-update":
        return "Project Update";
      case "billing":
        return "Billing";
      case "project-complete":
        return "Project Complete";
      case "welcome":
        return "Welcome";
      default:
        return "General";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Communicate with our team and stay updated on your projects
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">
              All messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter(m => !m.read).length}</div>
            <p className="text-xs text-muted-foreground">
              New messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Recent messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">&lt; 24h</div>
            <p className="text-xs text-muted-foreground">
              Average response
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
              <CardDescription>
                Click on a message to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedMessage === message.id
                        ? 'border-purple-500 bg-purple-50'
                        : message.read
                        ? 'border-gray-200 hover:bg-gray-50'
                        : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {message.subject}
                      </h4>
                      {!message.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      From: {message.from}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${getMessageTypeColor(message.type)}`}>
                        {getMessageTypeText(message.type)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(message.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Message Details</CardTitle>
              <CardDescription>
                {selectedMessage ? 'View and respond to messages' : 'Select a message to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  {(() => {
                    const message = messages.find(m => m.id === selectedMessage);
                    if (!message) return null;
                    
                    return (
                      <>
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {message.subject}
                            </h3>
                            <Badge className={getMessageTypeColor(message.type)}>
                              {getMessageTypeText(message.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>From: {message.from}</span>
                            <span>Date: {new Date(message.date).toLocaleString()}</span>
                            {message.read ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Read
                              </span>
                            ) : (
                              <span className="flex items-center text-blue-600">
                                <Clock className="h-4 w-4 mr-1" />
                                Unread
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Reply</h4>
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your reply here..."
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows={4}
                          />
                          <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={() => setNewMessage("")}>
                              Cancel
                            </Button>
                            <Button onClick={() => {
                              // Handle send message
                              setNewMessage("");
                            }}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a message to view its details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Quick Actions</CardTitle>
          <CardDescription className="text-blue-700">
            Common communication tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-left">
              <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Send New Message</p>
              <p className="text-sm text-blue-700">Contact our team directly</p>
            </button>
            <button className="p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-left">
              <Clock className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-blue-900">Schedule Call</p>
              <p className="text-sm text-blue-700">Book a consultation</p>
            </button>
            <button className="p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-left">
              <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-blue-900">Mark All Read</p>
              <p className="text-sm text-blue-700">Clear unread messages</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
