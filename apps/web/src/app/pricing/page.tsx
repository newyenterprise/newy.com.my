"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Globe, Smartphone, Brain, TrendingUp, ArrowRight, Sparkles, Rocket, X } from "lucide-react";
import { Button } from "@newy/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@newy/ui";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Platform {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  platforms: Platform[];
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
}

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  basePrice: number;
  popular?: boolean;
  features: string[];
  addOns: AddOn[];
  color: string;
  gradient: string;
  serviceTypes?: ServiceType[];
}

const services: Service[] = [
  {
    id: "website",
    name: "Website Development",
    icon: <Globe className="w-8 h-8" />,
    description: "Professional websites that convert visitors into customers",
    basePrice: 1500,
    popular: true,
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading Speed",
      "Mobile-First Approach",
      "Analytics Integration",
      "Up to 5 Pages Included"
    ],
    serviceTypes: [
      {
        id: "new-website",
        name: "New Website",
        description: "Build a brand new website from scratch",
        basePrice: 1500,
        platforms: [
          {
            id: "wordpress",
            name: "WordPress",
            description: "Most popular CMS platform",
            price: 4500,
            features: ["Up to 5 Pages", "Theme Customization", "Plugin Integration", "Easy Content Management"]
          },
          {
            id: "wix",
            name: "Wix",
            description: "User-friendly website builder",
            price: 3600,
            features: ["Up to 5 Pages", "Drag & Drop Editor", "Wix App Market", "Built-in SEO Tools"]
          },
          {
            id: "shopify",
            name: "Shopify",
            description: "E-commerce focused platform",
            price: 6000,
            features: ["Up to 20 Products", "Payment Processing", "Inventory Management", "Shopify App Integration"]
          },
          {
            id: "squarespace",
            name: "Squarespace",
            description: "Beautiful design templates",
            price: 3900,
            features: ["Up to 5 Pages", "Modern Templates", "Built-in Analytics", "Mobile Responsive"]
          },
          {
            id: "webflow",
            name: "Webflow",
            description: "Professional design platform",
            price: 5400,
            features: ["Up to 5 Pages", "Custom Animations", "CMS Integration", "Advanced Design Control"]
          }
        ]
      },
      {
        id: "upgrade-website",
        name: "Upgrade Existing Website",
        description: "Enhance your current website",
        basePrice: 2400,
        platforms: [
          {
            id: "wordpress-upgrade",
            name: "WordPress Upgrade",
            description: "Modernize your WordPress site",
            price: 3600,
            features: ["Theme Update", "Performance Optimization", "Security Enhancement", "Plugin Updates"]
          },
          {
            id: "wix-upgrade",
            name: "Wix Upgrade",
            description: "Enhance your Wix site",
            price: 3000,
            features: ["Design Refresh", "New Features", "SEO Improvements", "Mobile Optimization"]
          },
          {
            id: "shopify-upgrade",
            name: "Shopify Upgrade",
            description: "Upgrade your online store",
            price: 4500,
            features: ["Store Optimization", "Checkout Enhancement", "Product Page Redesign", "App Integration"]
          },
          {
            id: "platform-migration",
            name: "Platform Migration",
            description: "Move to a better platform",
            price: 7500,
            features: ["Content Migration", "Design Transfer", "SEO Preservation", "Training & Support"]
          },
          {
            id: "redesign",
            name: "Complete Redesign",
            description: "Fresh new look and feel",
            price: 6000,
            features: ["Modern Design", "UX Improvements", "Branding Update", "Performance Boost"]
          }
        ]
      }
    ],
    addOns: [
      { id: "ecommerce", name: "E-commerce Integration", description: "Online store (up to 20 products)", price: 4500, popular: true },
      { id: "additional-pages", name: "Additional Pages", description: "5 extra pages beyond base package", price: 1500 },
      { id: "domain", name: "Domain Registration", description: "Custom domain (.com, .com.my, etc.)", price: 150 },
      { id: "hosting", name: "Hosting Setup (1 Year)", description: "Managed hosting with SSL & backups", price: 900 },
      { id: "additional-products", name: "Additional Products", description: "20 extra products for e-commerce", price: 2400 },
      { id: "professional-email", name: "Professional Email", description: "5 custom email addresses", price: 300 },
      { id: "monthly-maintenance", name: "Monthly Maintenance", description: "Updates, backups & monitoring", price: 600 },
      { id: "ssl", name: "Premium SSL Certificate", description: "Enhanced security certificate", price: 450 }
    ]
  },
  {
    id: "webapp",
    name: "Web Applications",
    icon: <Rocket className="w-8 h-8" />,
    description: "Custom web applications built with modern frameworks",
    basePrice: 7500,
    color: "from-cyan-500 to-blue-600",
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    features: [
      "Modern Framework",
      "Scalable Architecture",
      "Database Integration",
      "API Development",
      "User Authentication",
      "Admin Dashboard"
    ],
    serviceTypes: [
      {
        id: "new-webapp",
        name: "New Web Application",
        description: "Build a custom web application",
        basePrice: 7500,
        platforms: [
          {
            id: "nextjs",
            name: "Next.js",
            description: "React framework for production",
            price: 15000,
            features: ["Server-Side Rendering", "API Routes", "Optimized Performance", "SEO Friendly"]
          },
          {
            id: "nuxtjs",
            name: "Nuxt.js",
            description: "Vue.js framework",
            price: 13500,
            features: ["Universal Rendering", "Auto Routing", "Static Generation", "Module System"]
          },
          {
            id: "flutter-web",
            name: "Flutter Web",
            description: "Cross-platform framework",
            price: 16500,
            features: ["Single Codebase", "Beautiful UI", "Fast Performance", "Native Feel"]
          },
          {
            id: "react-spa",
            name: "React SPA",
            description: "Single Page Application",
            price: 12000,
            features: ["Fast Navigation", "Component-Based", "State Management", "Modern UI"]
          },
          {
            id: "vue-spa",
            name: "Vue.js SPA",
            description: "Progressive JavaScript framework",
            price: 11400,
            features: ["Reactive Components", "Easy Learning Curve", "Flexible Architecture", "Performance Optimized"]
          },
          {
            id: "angular",
            name: "Angular",
            description: "Enterprise-grade framework",
            price: 15600,
            features: ["TypeScript Based", "Complete Solution", "Enterprise Ready", "Rich Ecosystem"]
          },
          {
            id: "svelte",
            name: "Svelte/SvelteKit",
            description: "Compile-time framework",
            price: 12600,
            features: ["No Virtual DOM", "Smaller Bundles", "Better Performance", "Simple Syntax"]
          },
          {
            id: "laravel",
            name: "Laravel + Blade/Inertia",
            description: "PHP full-stack framework",
            price: 13500,
            features: ["MVC Architecture", "Built-in Auth", "Database ORM", "Admin Panel"]
          }
        ]
      },
      {
        id: "webapp-enhancement",
        name: "Web App Enhancement",
        description: "Improve existing web application",
        basePrice: 4500,
        platforms: [
          {
            id: "nextjs-upgrade",
            name: "Next.js Upgrade",
            description: "Enhance your Next.js app",
            price: 9000,
            features: ["Performance Optimization", "Feature Addition", "SEO Enhancement", "Code Refactoring"]
          },
          {
            id: "nuxt-upgrade",
            name: "Nuxt.js Upgrade",
            description: "Improve your Nuxt app",
            price: 8400,
            features: ["Module Integration", "Performance Tuning", "UI Enhancement", "Bug Fixes"]
          },
          {
            id: "react-upgrade",
            name: "React App Upgrade",
            description: "Modernize your React app",
            price: 7500,
            features: ["Component Refactoring", "State Management", "Performance Boost", "UI Improvements"]
          },
          {
            id: "vue-upgrade",
            name: "Vue.js Upgrade",
            description: "Enhance your Vue app",
            price: 7200,
            features: ["Composition API", "Vuex Integration", "Performance Optimization", "Feature Addition"]
          },
          {
            id: "framework-migration",
            name: "Framework Migration",
            description: "Migrate to modern framework",
            price: 18000,
            features: ["Code Migration", "Architecture Redesign", "Data Preservation", "Testing & QA"]
          },
          {
            id: "feature-enhancement",
            name: "Feature Enhancement",
            description: "Add new capabilities",
            price: 6000,
            features: ["New Features", "Integration", "Testing", "Documentation"]
          }
        ]
      }
    ],
    addOns: [
      { id: "domain", name: "Domain Registration", description: "Custom domain (.com, .com.my, etc.)", price: 150 },
      { id: "cloud-hosting", name: "Cloud Hosting Setup", description: "AWS/Vercel/Railway deployment (1 year)", price: 1500 },
      { id: "database-hosting", name: "Database Hosting", description: "Managed database (PostgreSQL/MySQL)", price: 900 },
      { id: "admin-dashboard", name: "Admin Dashboard", description: "Custom admin panel (up to 10 models)", price: 6000, popular: true },
      { id: "additional-models", name: "Additional Data Models", description: "5 extra database models/tables", price: 2400 },
      { id: "monthly-maintenance", name: "Monthly Maintenance", description: "Updates, monitoring & support", price: 1200 }
    ]
  },
  {
    id: "apps",
    name: "Mobile Apps",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Native & cross-platform mobile applications",
    basePrice: 9000,
    color: "from-green-500 to-teal-600",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    features: [
      "Cross-Platform Support",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
      "App Store Submission",
      "Up to 10 Screens Included"
    ],
    serviceTypes: [
      {
        id: "new-app",
        name: "New Mobile App",
        description: "Build a new mobile application",
        basePrice: 9000,
        platforms: [
          {
            id: "flutter",
            name: "Flutter",
            description: "Cross-platform framework by Google",
            price: 24000,
            features: ["iOS & Android", "Native Performance", "Beautiful UI", "Hot Reload"]
          },
          {
            id: "react-native",
            name: "React Native",
            description: "Popular cross-platform framework",
            price: 22500,
            features: ["iOS & Android", "JavaScript/TypeScript", "Large Community", "Reusable Components"]
          },
          {
            id: "ios-native",
            name: "Native iOS",
            description: "Swift/SwiftUI development",
            price: 30000,
            features: ["Best Performance", "iOS Only", "Native Features", "App Store Optimized"]
          },
          {
            id: "android-native",
            name: "Native Android",
            description: "Kotlin development",
            price: 27000,
            features: ["Best Performance", "Android Only", "Material Design", "Google Play Optimized"]
          },
          {
            id: "both-native",
            name: "Both Native (iOS + Android)",
            description: "Separate native apps",
            price: 48000,
            features: ["Maximum Performance", "Platform-Specific Features", "Best User Experience", "Separate Codebases"]
          },
          {
            id: "pwa",
            name: "Progressive Web App (PWA)",
            description: "Web-based mobile experience",
            price: 15000,
            features: ["Works Everywhere", "No App Store", "Offline Support", "Push Notifications"]
          }
        ]
      },
      {
        id: "app-enhancement",
        name: "App Enhancement",
        description: "Improve existing mobile app",
        basePrice: 6000,
        platforms: [
          {
            id: "flutter-upgrade",
            name: "Flutter App Upgrade",
            description: "Enhance your Flutter app",
            price: 12000,
            features: ["New Features", "Performance Optimization", "Bug Fixes", "UI Enhancement"]
          },
          {
            id: "react-native-upgrade",
            name: "React Native Upgrade",
            description: "Improve your RN app",
            price: 11400,
            features: ["Library Updates", "Performance Tuning", "Feature Addition", "UI Refresh"]
          },
          {
            id: "native-upgrade",
            name: "Native App Upgrade",
            description: "Enhance native iOS/Android app",
            price: 15000,
            features: ["New Features", "OS Updates", "Performance Boost", "Security Enhancement"]
          },
          {
            id: "cross-platform-migration",
            name: "Cross-Platform Migration",
            description: "Migrate to Flutter/React Native",
            price: 30000,
            features: ["Code Migration", "Feature Parity", "Testing", "App Store Submission"]
          }
        ]
      }
    ],
    addOns: [
      { id: "additional-screens", name: "Additional Screens", description: "5 extra screens beyond base package", price: 3000 },
      { id: "push-notifications", name: "Push Notifications", description: "Firebase Cloud Messaging integration", price: 2400 },
      { id: "backend-api", name: "Backend API", description: "Custom REST/GraphQL API", price: 9000, popular: true },
      { id: "app-analytics", name: "App Analytics", description: "Firebase Analytics & Crashlytics", price: 1500 },
      { id: "in-app-payments", name: "In-App Payments", description: "Stripe/Apple Pay/Google Pay", price: 4500 },
      { id: "app-store-optimization", name: "App Store Optimization", description: "ASO for better visibility", price: 1800 },
      { id: "monthly-maintenance", name: "Monthly Maintenance", description: "Updates & bug fixes", price: 900 }
    ]
  },
  {
    id: "ai",
    name: "AI Automation",
    icon: <Brain className="w-8 h-8" />,
    description: "Workflow automation & intelligent chatbots",
    basePrice: 4500,
    color: "from-purple-500 to-pink-600",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    features: [
      "Workflow Automation",
      "AI Chatbot Development",
      "Platform Integration",
      "CRM Integration",
      "Email Automation",
      "Data Collection & Reporting"
    ],
    serviceTypes: [
      {
        id: "new-automation",
        name: "New Automation Project",
        description: "Build custom automation workflow",
        basePrice: 4500,
        platforms: [
          {
            id: "lead-generation",
            name: "Lead Generation Automation",
            description: "Automate lead capture and follow-up",
            price: 6000,
            features: ["Form Integration", "Auto-Response", "CRM Sync", "Lead Scoring"]
          },
          {
            id: "email-marketing",
            name: "Email Marketing Automation",
            description: "Automated email campaigns",
            price: 5400,
            features: ["Email Sequences", "Segmentation", "A/B Testing", "Analytics"]
          },
          {
            id: "customer-support-chatbot",
            name: "Customer Support Chatbot",
            description: "AI-powered customer support",
            price: 9000,
            features: ["24/7 Support", "Natural Language", "Knowledge Base", "Multi-Channel"]
          },
          {
            id: "social-media-automation",
            name: "Social Media Automation",
            description: "Schedule and manage posts",
            price: 4500,
            features: ["Post Scheduling", "Multi-Platform", "Analytics", "Content Calendar"]
          },
          {
            id: "data-collection",
            name: "Data Collection & Reporting",
            description: "Automated data aggregation",
            price: 7500,
            features: ["Data Scraping", "API Integration", "Custom Reports", "Dashboard"]
          },
          {
            id: "ecommerce-automation",
            name: "E-commerce Automation",
            description: "Order and inventory automation",
            price: 10500,
            features: ["Order Processing", "Inventory Sync", "Customer Notifications", "Analytics"]
          },
          {
            id: "n8n-workflow",
            name: "n8n Workflow Automation",
            description: "Visual workflow builder",
            price: 6600,
            features: ["Visual Builder", "400+ Integrations", "Self-Hosted", "Custom Workflows"]
          },
          {
            id: "make-zapier",
            name: "Make/Zapier Automation",
            description: "No-code automation platform",
            price: 5400,
            features: ["Easy Setup", "1000+ Apps", "Templates", "Cloud-Based"]
          }
        ]
      },
      {
        id: "automation-enhancement",
        name: "Automation Enhancement",
        description: "Optimize existing automation",
        basePrice: 3000,
        platforms: [
          {
            id: "workflow-optimization",
            name: "Workflow Optimization",
            description: "Improve existing workflows",
            price: 4500,
            features: ["Performance Analysis", "Bottleneck Removal", "Error Handling", "Monitoring"]
          },
          {
            id: "integration-expansion",
            name: "Integration Expansion",
            description: "Add more integrations",
            price: 3600,
            features: ["New Platforms", "API Connections", "Data Sync", "Testing"]
          },
          {
            id: "chatbot-training",
            name: "Chatbot Training & Enhancement",
            description: "Improve AI responses",
            price: 6000,
            features: ["Training Data", "Intent Recognition", "Response Quality", "Analytics"]
          },
          {
            id: "automation-consulting",
            name: "Automation Consulting",
            description: "Strategy and planning",
            price: 2400,
            features: ["Process Analysis", "ROI Calculation", "Implementation Plan", "Best Practices"]
          }
        ]
      }
    ],
    addOns: [
      { id: "crm-integration", name: "CRM Integration", description: "HubSpot, Salesforce, etc.", price: 3000, popular: true },
      { id: "advanced-chatbot", name: "Advanced Chatbot Training", description: "Custom training on your data", price: 4500 },
      { id: "multi-platform", name: "Multi-Platform Deployment", description: "Website, Slack, Teams, etc.", price: 2400 },
      { id: "email-platform", name: "Email Platform Integration", description: "Mailchimp, SendGrid, etc.", price: 1800 },
      { id: "social-integration", name: "Social Media Integration", description: "Facebook, Twitter, LinkedIn", price: 2100 },
      { id: "analytics-dashboard", name: "Analytics Dashboard", description: "Custom metrics & reporting", price: 3600 },
      { id: "slack-teams", name: "Slack/Teams Integration", description: "Internal notifications", price: 1500 },
      { id: "database-integration", name: "Database Integration", description: "Connect to existing databases", price: 2700 },
      { id: "additional-workflows", name: "Additional Workflows", description: "3 extra automation workflows", price: 4500 },
      { id: "ongoing-optimization", name: "Ongoing Optimization", description: "Continuous improvement (per month)", price: 1200 },
      { id: "team-training", name: "Team Training Session", description: "2-hour training for your team", price: 1500 },
      { id: "monthly-maintenance", name: "Monthly Maintenance", description: "Monitoring & updates", price: 750 }
    ]
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: <TrendingUp className="w-8 h-8" />,
    description: "Data-driven marketing strategies & campaigns",
    basePrice: 3000,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    features: [
      "Marketing Strategy",
      "Target Audience Analysis",
      "Campaign Planning",
      "Monthly Reporting",
      "ROI Tracking",
      "A/B Testing"
    ],
    serviceTypes: [
      {
        id: "new-campaign",
        name: "New Marketing Campaign",
        description: "Launch a new marketing initiative",
        basePrice: 3000,
        platforms: [
          {
            id: "seo-campaign",
            name: "SEO Campaign",
            description: "Search engine optimization",
            price: 6000,
            features: ["Keyword Research", "On-Page SEO", "Link Building", "Monthly Reporting"]
          },
          {
            id: "ppc-advertising",
            name: "PPC Advertising",
            description: "Google Ads & social ads",
            price: 7500,
            features: ["Ad Creation", "Targeting Setup", "Budget Management", "Performance Tracking"]
          },
          {
            id: "social-media-marketing",
            name: "Social Media Marketing",
            description: "Organic social media growth",
            price: 5400,
            features: ["Content Creation", "Daily Posting", "Community Management", "Analytics"]
          },
          {
            id: "content-marketing",
            name: "Content Marketing",
            description: "Blog posts and articles",
            price: 4500,
            features: ["4 Blog Posts/Month", "SEO Optimization", "Keyword Targeting", "Content Calendar"]
          },
          {
            id: "email-marketing",
            name: "Email Marketing",
            description: "Email campaigns",
            price: 3600,
            features: ["4 Campaigns/Month", "List Segmentation", "A/B Testing", "Analytics"]
          },
          {
            id: "full-digital",
            name: "Full Digital Strategy",
            description: "Comprehensive marketing solution",
            price: 15000,
            features: ["Multi-Channel", "SEO + PPC + Social", "Content Creation", "Full Reporting"]
          },
          {
            id: "ecommerce-marketing",
            name: "E-commerce Marketing",
            description: "Online store promotion",
            price: 9000,
            features: ["Product Ads", "Shopping Campaigns", "Retargeting", "Conversion Optimization"]
          },
          {
            id: "local-marketing",
            name: "Local Marketing",
            description: "Local business promotion",
            price: 4500,
            features: ["Google My Business", "Local SEO", "Review Management", "Local Ads"]
          }
        ]
      },
      {
        id: "campaign-enhancement",
        name: "Campaign Enhancement",
        description: "Optimize existing campaigns",
        basePrice: 2400,
        platforms: [
          {
            id: "campaign-audit",
            name: "Campaign Audit",
            description: "Comprehensive performance review",
            price: 3000,
            features: ["Performance Analysis", "Competitor Research", "Recommendations", "Action Plan"]
          },
          {
            id: "campaign-optimization",
            name: "Campaign Optimization",
            description: "Improve ROI",
            price: 4500,
            features: ["A/B Testing", "Targeting Refinement", "Budget Optimization", "Creative Refresh"]
          },
          {
            id: "channel-expansion",
            name: "Channel Expansion",
            description: "Add new marketing channels",
            price: 6000,
            features: ["New Platforms", "Strategy Development", "Implementation", "Tracking Setup"]
          },
          {
            id: "marketing-consulting",
            name: "Marketing Consulting",
            description: "Strategic guidance",
            price: 2400,
            features: ["Strategy Session", "Market Analysis", "Growth Plan", "Recommendations"]
          }
        ]
      }
    ],
    addOns: [
      { id: "additional-content", name: "Additional Content", description: "4 extra blog posts per month", price: 1800 },
      { id: "video-marketing", name: "Video Marketing", description: "2 videos per month", price: 4500, popular: true },
      { id: "landing-pages", name: "Landing Page Design", description: "2 custom landing pages", price: 3000 },
      { id: "ongoing-management", name: "Ongoing Management", description: "Monthly campaign management", price: 2400 },
      { id: "influencer-marketing", name: "Influencer Marketing", description: "Influencer outreach & collaboration", price: 3600 },
      { id: "reputation-management", name: "Reputation Management", description: "Review monitoring & response", price: 1800 }
    ]
  }
];

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const router = useRouter();

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev =>
      prev.find(a => a.id === addOn.id)
        ? prev.filter(a => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const requestQuote = () => {
    if (!selectedService) return;

    const platformPrice = selectedPlatform?.price || selectedServiceType?.basePrice || selectedService.basePrice;
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const estimatedTotal = platformPrice + addOnsTotal;

    // Build query parameters for quote request
    const params = new URLSearchParams({
      service: selectedService.id,
      serviceType: selectedServiceType?.id || '',
      platform: selectedPlatform?.id || '',
      platformName: selectedPlatform?.name || '',
      addOns: JSON.stringify(selectedAddOns.map(addOn => addOn.name)),
      basePrice: platformPrice.toString(),
      addOnsTotal: addOnsTotal.toString(),
      estimatedTotal: estimatedTotal.toString()
    });

    // Redirect to quote request page
    router.push(`/quote?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"
        />
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-yellow-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Get Your Custom Quote
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Flexible Pricing
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your service, select your platform, and add features you need. We'll send you a personalized quote.
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Card className="relative overflow-hidden cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:shadow-2xl transition-all duration-300">
                <motion.div
                  className={`absolute inset-0 ${service.gradient} opacity-10`}
                />
                
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg">
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="relative">
                  <div className={`p-3 rounded-xl ${service.gradient} text-white shadow-lg w-fit mb-4`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">
                    {service.name}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setSelectedService(service)}
                    className={`w-full ${service.gradient} hover:opacity-90 transition-all`}
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => {
                setSelectedService(null);
                setSelectedServiceType(null);
                setSelectedPlatform(null);
                setSelectedAddOns([]);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800/95 backdrop-blur-sm rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`${selectedService.gradient} text-white p-8 rounded-t-2xl sticky top-0 z-10`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        {selectedService.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{selectedService.name}</h2>
                        <p className="text-white/90">{selectedService.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        setSelectedServiceType(null);
                        setSelectedPlatform(null);
                        setSelectedAddOns([]);
                      }}
                      className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Step 1: Service Type Selection */}
                  {selectedService.serviceTypes && selectedService.serviceTypes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                          1
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Choose Service Type</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.serviceTypes.map((serviceType) => (
                          <motion.div
                            key={serviceType.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              setSelectedServiceType(serviceType);
                              setSelectedPlatform(null);
                            }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedServiceType?.id === serviceType.id
                                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/50'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                            }`}
                          >
                            <h4 className="font-semibold text-white text-lg mb-2">{serviceType.name}</h4>
                            <p className="text-gray-300 text-sm">{serviceType.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Platform Selection */}
                  {selectedServiceType && (
                    <div>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-8" />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                          2
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Select Platform</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedServiceType.platforms.map((platform) => (
                          <motion.div
                            key={platform.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedPlatform(platform)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedPlatform?.id === platform.id
                                ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/50'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                            }`}
                          >
                            <h4 className="font-semibold text-white text-lg mb-2">{platform.name}</h4>
                            <p className="text-gray-300 text-sm mb-4">{platform.description}</p>
                            <ul className="space-y-2">
                              {platform.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-300">
                                  <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Add-ons */}
                  {selectedPlatform && (
                    <div>
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-8" />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                          3
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Additional Services (Optional)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.addOns.map((addOn) => (
                          <motion.div
                            key={addOn.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => toggleAddOn(addOn)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedAddOns.find(a => a.id === addOn.id)
                                ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/50'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-white">{addOn.name}</h4>
                                  {addOn.popular && (
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-300">{addOn.description}</p>
                              </div>
                              <div className={`ml-3 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                selectedAddOns.find(a => a.id === addOn.id)
                                  ? 'border-yellow-500 bg-yellow-500'
                                  : 'border-gray-500'
                              }`}>
                                {selectedAddOns.find(a => a.id === addOn.id) && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quote Summary */}
                  {selectedPlatform && (
                    <div>
                      <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent my-8" />
                      <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-6 border border-gray-600">
                        <h3 className="text-xl font-semibold text-white mb-4">Ready to Get Your Quote?</h3>
                        <div className="space-y-2 text-gray-300 mb-6">
                          <p><strong>Service:</strong> {selectedService.name}</p>
                          <p><strong>Type:</strong> {selectedServiceType?.name}</p>
                          <p><strong>Platform:</strong> {selectedPlatform?.name}</p>
                          {selectedAddOns.length > 0 && (
                            <p><strong>Add-ons:</strong> {selectedAddOns.length} selected</p>
                          )}
                        </div>
                        <Button
                          onClick={requestQuote}
                          className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 text-lg py-6"
                        >
                          Request Custom Quote
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <p className="text-center text-sm text-gray-400 mt-4">
                          We'll send you a personalized quote within 24 hours
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
