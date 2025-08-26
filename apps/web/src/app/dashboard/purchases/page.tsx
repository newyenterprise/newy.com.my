"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { Badge } from "@digitallinked/ui";
import { ShoppingCart, Download, Eye } from "lucide-react";

export default function PurchasesPage() {
  // Mock purchase data - in a real app, this would come from your database
  const purchases = [
    {
      id: "PUR-001",
      service: "Website Development Package",
      amount: "$1,200",
      date: "2024-01-15",
      status: "completed",
      description: "Custom website development with responsive design and SEO optimization",
      invoice: "INV-001.pdf"
    },
    {
      id: "PUR-002",
      service: "SEO Optimization",
      amount: "$800",
      date: "2024-01-10",
      status: "completed",
      description: "Search engine optimization for improved online visibility",
      invoice: "INV-002.pdf"
    },
    {
      id: "PUR-003",
      service: "Mobile App Development",
      amount: "$2,500",
      date: "2024-01-05",
      status: "in-progress",
      description: "iOS and Android mobile application development",
      invoice: "INV-003.pdf"
    },
    {
      id: "PUR-004",
      service: "Digital Marketing Campaign",
      amount: "$600",
      date: "2023-12-20",
      status: "completed",
      description: "Social media marketing and Google Ads campaign",
      invoice: "INV-004.pdf"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        <p className="text-gray-600 mt-2">
          View all your past purchases and download invoices
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
            <p className="text-xs text-muted-foreground">
              All time purchases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,100</div>
            <p className="text-xs text-muted-foreground">
              Lifetime spending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Finished projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Current projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Purchases List */}
      <Card>
        <CardHeader>
          <CardTitle>All Purchases</CardTitle>
          <CardDescription>
            A list of all your purchases and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{purchase.service}</h3>
                      <Badge className={getStatusColor(purchase.status)}>
                        {getStatusText(purchase.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{purchase.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Order ID: {purchase.id}</span>
                      <span>Date: {new Date(purchase.date).toLocaleDateString()}</span>
                      <span className="font-medium text-green-600">{purchase.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Need Help?</CardTitle>
          <CardDescription className="text-blue-700">
            Questions about your purchases or invoices?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Contact Support</h4>
              <p className="text-sm text-blue-700 mb-3">
                Get help with your purchases or request invoice copies
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Contact Support →
              </button>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">FAQ</h4>
              <p className="text-sm text-blue-700 mb-3">
                Find answers to common questions about billing and invoices
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View FAQ →
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
