"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@newy/ui";
import { FileText, Briefcase, MessageSquare, Users, Star, TrendingUp, Calendar, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalBlogPosts: number;
  totalPortfolioProjects: number;
  totalQuotes: number;
  totalContacts: number;
  totalTestimonials: number;
  pendingQuotes: number;
  unreadContacts: number;
  publishedPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogPosts: 0,
    totalPortfolioProjects: 0,
    totalQuotes: 0,
    totalContacts: 0,
    totalTestimonials: 0,
    pendingQuotes: 0,
    unreadContacts: 0,
    publishedPosts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch all stats in parallel
      const [
        blogPosts,
        portfolioProjects,
        quotes,
        contacts,
        testimonials,
        pendingQuotes,
        unreadContacts,
        publishedPosts,
      ] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('portfolio_projects').select('id', { count: 'exact' }),
        supabase.from('quotes').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('quotes').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'unread'),
        supabase.from('blog_posts').select('id', { count: 'exact' }).eq('published', true),
      ]);

      setStats({
        totalBlogPosts: blogPosts.count || 0,
        totalPortfolioProjects: portfolioProjects.count || 0,
        totalQuotes: quotes.count || 0,
        totalContacts: contacts.count || 0,
        totalTestimonials: testimonials.count || 0,
        pendingQuotes: pendingQuotes.count || 0,
        unreadContacts: unreadContacts.count || 0,
        publishedPosts: publishedPosts.count || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      subtitle: `${stats.publishedPosts} published`,
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Portfolio Projects",
      value: stats.totalPortfolioProjects,
      subtitle: "Total projects",
      icon: Briefcase,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Quote Requests",
      value: stats.totalQuotes,
      subtitle: `${stats.pendingQuotes} pending`,
      icon: MessageSquare,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      subtitle: `${stats.unreadContacts} unread`,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      subtitle: "Client reviews",
      icon: Star,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
  ];

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
        <h1 className="text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Digital Linked admin panel. Here's an overview of your content and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-100">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and actions in your admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System initialized</p>
                  <p className="text-xs text-gray-500">Admin dashboard is ready</p>
                </div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database connected</p>
                  <p className="text-xs text-gray-500">All tables are accessible</p>
                </div>
                <span className="text-xs text-gray-500">1 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <FileText className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">New Blog Post</p>
                <p className="text-xs text-gray-500">Create article</p>
              </button>
              <button className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Briefcase className="h-5 w-5 text-green-600 mb-2" />
                <p className="text-sm font-medium">Add Project</p>
                <p className="text-xs text-gray-500">Portfolio item</p>
              </button>
              <button className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MessageSquare className="h-5 w-5 text-yellow-600 mb-2" />
                <p className="text-sm font-medium">View Quotes</p>
                <p className="text-xs text-gray-500">Pending requests</p>
              </button>
              <button className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Eye className="h-5 w-5 text-gray-600 mb-2" />
                <p className="text-sm font-medium">Site Preview</p>
                <p className="text-xs text-gray-500">View website</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current status of all integrated services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Supabase Database</p>
                <p className="text-xs text-gray-500">Connected & Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Stripe Payments</p>
                <p className="text-xs text-gray-500">Test Mode Active</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Authentication</p>
                <p className="text-xs text-gray-500">Secure & Active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
