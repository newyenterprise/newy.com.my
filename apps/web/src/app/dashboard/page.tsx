"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { 
  ShoppingCart, 
  MessageSquare, 
  CreditCard, 
  TrendingUp,
  Package,
  Calendar,
  ArrowUpRight,
  Rocket,
  Star,
  Clock,
  CheckCircle
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@digitallinked.com.au" || user?.user_metadata?.role === "admin";

  // Mock data - in a real app, this would come from your database
  const stats = [
    {
      title: "Total Purchases",
      value: "3",
      description: "Services purchased",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Projects",
      value: "2",
      description: "Currently in progress",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: "+25%",
      changeType: "positive"
    },
    {
      title: "Messages",
      value: "5",
      description: "Unread messages",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      change: "New",
      changeType: "neutral"
    },
    {
      title: "Total Spent",
      value: "$2,450",
      description: "Lifetime spending",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      change: "+8%",
      changeType: "positive"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "purchase",
      title: "Website Development Package",
      description: "Purchase completed",
      date: "2024-01-15",
      amount: "$1,200",
      status: "completed"
    },
    {
      id: 2,
      type: "message",
      title: "Project Update",
      description: "New message from Digital Linked team",
      date: "2024-01-14",
      amount: null,
      status: "new"
    },
    {
      id: 3,
      type: "purchase",
      title: "SEO Optimization",
      description: "Purchase completed",
      date: "2024-01-10",
      amount: "$800",
      status: "completed"
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                        Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}!
                      </h1>
                      <p className="text-purple-100 text-lg mt-2">
                        Ready to continue your digital journey?
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-purple-100 text-lg leading-relaxed max-w-2xl mb-6">
                    Track your projects, manage your purchases, and stay connected with our team. 
                    Everything you need is right here at your fingertips.
                  </p>

                  {isAdmin && (
                    <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                      <span className="text-2xl">👑</span>
                      <div>
                        <p className="text-sm font-semibold">Administrator Access</p>
                        <p className="text-xs text-purple-100">Full system control enabled</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <div className="text-6xl">🎯</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`relative overflow-hidden border-2 ${stat.borderColor} bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-full ${
                    stat.changeType === 'positive' ? 'bg-green-100 text-green-700 border border-green-200' : 
                    stat.changeType === 'negative' ? 'bg-red-100 text-red-700 border border-red-200' : 
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {stat.changeType === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>

                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-purple-500 transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Activity - Takes 2 columns */}
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-purple-600" />
                      <span>Recent Activity</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      Your latest purchases and interactions
                    </CardDescription>
                  </div>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1">
                    <span>View All</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-purple-200 hover:shadow-md group">
                      <div className={`p-4 rounded-2xl ${
                        activity.type === 'purchase' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                      } group-hover:scale-110 transition-transform duration-200`}>
                        {activity.type === 'purchase' ? (
                          <ShoppingCart className="h-6 w-6 text-green-600" />
                        ) : (
                          <MessageSquare className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-base font-semibold text-gray-900">
                            {activity.title}
                          </p>
                          {activity.status === 'new' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                        {activity.amount && (
                          <p className="text-lg font-bold text-green-600">
                            {activity.amount}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-left group">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-semibold text-gray-900">View Purchases</p>
                        <p className="text-sm text-gray-600">Order history</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left group">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-semibold text-gray-900">Send Message</p>
                        <p className="text-sm text-gray-600">Contact team</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-left group">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-semibold text-gray-900">Track Projects</p>
                        <p className="text-sm text-gray-600">Monitor progress</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-left group">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-semibold text-gray-900">Schedule Call</p>
                        <p className="text-sm text-gray-600">Book consultation</p>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Card */}
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center space-x-2">
                  <Rocket className="h-5 w-5" />
                  <span>Coming Soon</span>
                </CardTitle>
                <CardDescription className="text-purple-700">
                  Exciting new features in development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-purple-800 font-medium">Project timeline tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-purple-800 font-medium">File sharing & collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-purple-800 font-medium">Real-time notifications</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}