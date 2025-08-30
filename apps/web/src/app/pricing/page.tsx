"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Shield, Globe, Smartphone, Brain, TrendingUp, Plus, Minus, ShoppingCart, ArrowRight, Sparkles, Heart, Users, Clock, Award, Rocket, Target } from "lucide-react";
import { Button } from "@digitallinked/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@digitallinked/ui";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

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
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular?: boolean;
}

interface CartItem {
  service: Service;
  selectedAddOns: AddOn[];
  quantity: number;
}

const services: Service[] = [
  {
    id: "website",
    name: "Website Development",
    icon: <Globe className="w-8 h-8" />,
    description: "Custom websites that convert visitors into customers",
    basePrice: 2500,
    popular: true,
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "Mobile First",
      "Content Management",
      "Analytics Integration"
    ],
    addOns: [
      { id: "ecommerce", name: "E-commerce Integration", description: "Online store with payment processing", price: 1500, category: "website", popular: true },
      { id: "blog", name: "Blog System", description: "Content management with SEO tools", price: 800, category: "website" },
      { id: "seo", name: "SEO Package", description: "Search engine optimization", price: 1200, category: "website" },
      { id: "cms", name: "Advanced CMS", description: "Easy content management system", price: 1000, category: "website" },
      { id: "analytics", name: "Analytics Setup", description: "Google Analytics & tracking", price: 500, category: "website" },
      { id: "ssl", name: "SSL Certificate", description: "Secure HTTPS connection", price: 200, category: "website" }
    ]
  },
  {
    id: "apps",
    name: "Mobile Apps",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Native & cross-platform mobile applications",
    basePrice: 8000,
    color: "from-green-500 to-teal-600",
    gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    features: [
      "Cross-Platform",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
      "App Store Ready",
      "User Authentication"
    ],
    addOns: [
      { id: "backend", name: "Backend API", description: "Custom backend with database", price: 3000, category: "apps", popular: true },
      { id: "push", name: "Push Notifications", description: "Real-time notifications", price: 800, category: "apps" },
      { id: "analytics", name: "App Analytics", description: "User behavior tracking", price: 600, category: "apps" },
      { id: "payments", name: "In-App Payments", description: "Stripe integration", price: 1200, category: "apps" },
      { id: "social", name: "Social Features", description: "User profiles & sharing", price: 1500, category: "apps" },
      { id: "offline", name: "Offline Mode", description: "Work without internet", price: 1000, category: "apps" }
    ]
  },
  {
    id: "ai",
    name: "AI Automation",
    icon: <Brain className="w-8 h-8" />,
    description: "Intelligent automation solutions",
    basePrice: 3500,
    color: "from-purple-500 to-pink-600",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    features: [
      "Machine Learning",
      "Data Processing",
      "Automated Workflows",
      "Smart Analytics",
      "API Integration",
      "Real-time Processing"
    ],
    addOns: [
      { id: "chatbot", name: "AI Chatbot", description: "Intelligent customer support", price: 2000, category: "ai", popular: true },
      { id: "analytics", name: "Predictive Analytics", description: "Data-driven insights", price: 1500, category: "ai" },
      { id: "automation", name: "Workflow Automation", description: "Process automation", price: 1200, category: "ai" },
      { id: "integration", name: "API Integration", description: "Connect with existing systems", price: 1000, category: "ai" },
      { id: "training", name: "Custom Training", description: "Train on your data", price: 2500, category: "ai" },
      { id: "monitoring", name: "Performance Monitoring", description: "Real-time system monitoring", price: 800, category: "ai" }
    ]
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: <TrendingUp className="w-8 h-8" />,
    description: "Data-driven marketing strategies",
    basePrice: 1500,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    features: [
      "SEO Strategy",
      "Social Media",
      "Content Marketing",
      "Email Campaigns",
      "Analytics & Reporting",
      "Conversion Optimization"
    ],
    addOns: [
      { id: "ppc", name: "PPC Campaigns", description: "Google Ads & social ads", price: 1000, category: "marketing", popular: true },
      { id: "social", name: "Social Media Management", description: "Daily content & engagement", price: 800, category: "marketing" },
      { id: "email", name: "Email Marketing", description: "Automated email campaigns", price: 600, category: "marketing" },
      { id: "content", name: "Content Creation", description: "Blog posts & social content", price: 500, category: "marketing" },
      { id: "seo", name: "Technical SEO", description: "On-page optimization", price: 1200, category: "marketing" },
      { id: "analytics", name: "Advanced Analytics", description: "Conversion tracking", price: 700, category: "marketing" }
    ]
  }
];

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const router = useRouter();

  // Animate price changes
  useEffect(() => {
    if (selectedService) {
      const targetPrice = selectedService.basePrice + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
      const duration = 800;
      const steps = 30;
      const increment = (targetPrice - animatedPrice) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedPrice(prev => prev + increment);
        
        if (currentStep >= steps) {
          setAnimatedPrice(targetPrice);
          clearInterval(timer);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [selectedService, selectedAddOns]);

  const totalCartValue = cart.reduce((total, item) => {
    const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return total + (item.service.basePrice + addOnsTotal) * item.quantity;
  }, 0);

  const addToCart = () => {
    if (!selectedService) return;
    
    const existingItem = cart.find(item => item.service.id === selectedService.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.service.id === selectedService.id 
          ? { ...item, selectedAddOns: selectedAddOns, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        service: selectedService,
        selectedAddOns: selectedAddOns,
        quantity: 1
      }]);
    }
    
    setSelectedAddOns([]);
    setSelectedService(null);
    setShowCart(true);
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart(cart.map(item => 
      item.service.id === serviceId ? { ...item, quantity } : item
    ));
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addOn.id)
        ? prev.filter(a => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const proceedToCheckout = () => {
    const checkoutData = {
      items: cart,
      total: totalCartValue
    };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
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
        <motion.div
          animate={{ 
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"
        />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-yellow-500 opacity-10"></div>
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
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-yellow-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Choose Your Perfect Package
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Transparent
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {" "}Pricing
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Build your custom solution with our flexible pricing. Start with a base package and add the features you need.
            </motion.p>

            {/* Interactive Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex justify-center items-center gap-8 mb-8"
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full text-white mb-2 mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white mb-2 mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white mb-2 mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-700">
            <div className="flex space-x-2">
              {[
                { id: 'services', label: 'Services', icon: <Rocket className="w-4 h-4" /> },
                { id: 'packages', label: 'Packages', icon: <Target className="w-4 h-4" /> }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatePresence mode="wait">
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                >
                                <Card className={`relative overflow-hidden cursor-pointer transition-all duration-500 bg-gray-800/50 backdrop-blur-sm border-gray-700 ${
                hoveredService === service.id ? 'shadow-2xl ring-2 ring-purple-400' : 'shadow-lg hover:shadow-xl'
              }`}>
                {/* Animated Background */}
                <motion.div 
                  className={`absolute inset-0 ${service.gradient}`}
                  initial={{ opacity: 0.1 }}
                  animate={{ 
                    opacity: hoveredService === service.id ? 0.25 : 0.1,
                    scale: hoveredService === service.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Elements */}
                {hoveredService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                )}
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className={`p-3 rounded-xl ${service.gradient} text-white shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                    {service.popular && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Star className="w-3 h-3 mr-1" />
                          </motion.div>
                          Popular
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">
                    {service.name}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="relative">
                  <motion.div 
                    className="mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-3xl font-bold text-white">
                      ${service.basePrice.toLocaleString()}
                    </span>
                    <span className="text-gray-400 ml-2">starting</span>
                  </motion.div>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="mr-2"
                        >
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => setSelectedService(service)}
                      className={`w-full ${service.gradient} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <span className="mr-2">Choose Package</span>
                      <motion.div
                        animate={{ x: hoveredService === service.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {/* Package Cards */}
              {[
                {
                  name: "Starter Package",
                  price: 2500,
                  description: "Perfect for small businesses",
                  features: ["Website Development", "Basic SEO", "Mobile Responsive", "1 Month Support"],
                  gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
                  popular: false
                },
                {
                  name: "Business Package",
                  price: 5500,
                  description: "Ideal for growing companies",
                  features: ["Website + E-commerce", "Advanced SEO", "Analytics Setup", "3 Months Support", "Social Media Integration"],
                  gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
                  popular: true
                },
                {
                  name: "Enterprise Package",
                  price: 12000,
                  description: "Complete digital solution",
                  features: ["Website + Mobile App", "AI Automation", "Marketing Campaign", "6 Months Support", "Priority Support", "Custom Integrations"],
                  gradient: "bg-gradient-to-br from-orange-500 to-red-600",
                  popular: false
                }
              ].map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 bg-gray-800/50 backdrop-blur-sm border-gray-700 ${
                    pkg.popular ? 'ring-2 ring-yellow-400 shadow-2xl' : 'shadow-lg hover:shadow-xl'
                  }`}>
                    <div className={`absolute inset-0 ${pkg.gradient} opacity-10`}></div>
                    
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white px-4 py-2 shadow-lg">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="relative text-center pt-8">
                      <CardTitle className="text-2xl font-bold text-white mb-2">
                        {pkg.name}
                      </CardTitle>
                      <p className="text-gray-300 mb-4">{pkg.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">
                          ${pkg.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 ml-2">total</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                          >
                            <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <Button
                        className={`w-full ${pkg.gradient} hover:opacity-90 transition-all duration-300 shadow-lg`}
                        onClick={() => {
                          // Add package to cart logic
                          const packageData = {
                            items: [{
                              service: { id: 'package', name: pkg.name, basePrice: pkg.price },
                              selectedAddOns: [],
                              quantity: 1
                            }],
                            total: pkg.price
                          };
                          localStorage.setItem('checkoutData', JSON.stringify(packageData));
                          router.push('/checkout');
                        }}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800/90 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`${selectedService.gradient} text-white p-8 rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                        {selectedService.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{selectedService.name}</h2>
                        <p className="text-white text-opacity-90">{selectedService.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedService(null)}
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">What's Included</h3>
                      <ul className="space-y-3">
                        {selectedService.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Add-ons */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Customize Your Package</h3>
                      <div className="space-y-3">
                        {selectedService.addOns.map((addOn) => (
                          <motion.div
                            key={addOn.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              selectedAddOns.find(a => a.id === addOn.id)
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                            }`}
                            onClick={() => toggleAddOn(addOn)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-white">{addOn.name}</h4>
                                  {addOn.popular && (
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-300 mt-1">{addOn.description}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-white">
                                  +${addOn.price.toLocaleString()}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  selectedAddOns.find(a => a.id === addOn.id)
                                    ? 'border-purple-500 bg-purple-500'
                                    : 'border-gray-500'
                                }`}>
                                  {selectedAddOns.find(a => a.id === addOn.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Total and Add to Cart */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-400">Base Price</p>
                        <motion.p 
                          className="text-2xl font-bold text-white"
                          key={selectedService.basePrice}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          ${selectedService.basePrice.toLocaleString()}
                        </motion.p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-400">Add-ons</p>
                        <motion.p 
                          className="text-xl font-semibold text-white"
                          key={selectedAddOns.length}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          +${selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0).toLocaleString()}
                        </motion.p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-400">Total</p>
                        <motion.p 
                          className="text-3xl font-bold text-white"
                          key={animatedPrice}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            color: ["#FFFFFF", "#FCD34D", "#FFFFFF"]
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          ${Math.round(animatedPrice).toLocaleString()}
                        </motion.p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={addToCart}
                          className={`w-full ${selectedService.gradient} hover:opacity-90 px-8 py-3 shadow-lg hover:shadow-xl`}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 0.5 }}
                            className="mr-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </motion.div>
                          Add to Cart
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Shopping Cart */}
        <AnimatePresence>
          {showCart && cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className="fixed bottom-6 right-6 z-40"
            >
              <Card className="w-80 shadow-2xl border-0 bg-gray-800/95 backdrop-blur-sm border-gray-700">
                <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-yellow-500 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.div>
                      <CardTitle className="text-lg">Your Cart ({cart.length})</CardTitle>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowCart(false)}
                      className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                    >
                      ✕
                    </motion.button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item, index) => (
                    <motion.div 
                      key={item.service.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-700 pb-3 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{item.service.name}</h4>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3 text-gray-300" />
                          </motion.button>
                          <motion.span 
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="w-8 text-center font-medium text-white"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </motion.button>
                        </div>
                      </div>
                      {item.selectedAddOns.length > 0 && (
                        <div className="ml-4 space-y-1">
                          {item.selectedAddOns.map((addOn, addOnIndex) => (
                            <motion.div 
                              key={addOn.id} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: addOnIndex * 0.05 }}
                              className="flex items-center justify-between text-xs text-gray-300"
                            >
                              <span>+ {addOn.name}</span>
                              <span>${addOn.price.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400">Subtotal</span>
                        <motion.span 
                          className="font-semibold text-yellow-400"
                          key={item.quantity}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                        >
                          ${((item.service.basePrice + item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)) * item.quantity).toLocaleString()}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <motion.span 
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"
                        key={totalCartValue}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        ${totalCartValue.toLocaleString()}
                      </motion.span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={proceedToCheckout}
                        className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:opacity-90 shadow-lg hover:shadow-xl"
                      >
                        <span className="mr-2">Proceed to Checkout</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Cart Button */}
        {cart.length > 0 && !showCart && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 z-30"
          >
            <motion.button
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: ["0 10px 30px rgba(147, 51, 234, 0.3)", "0 10px 30px rgba(251, 191, 36, 0.3)", "0 10px 30px rgba(147, 51, 234, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cart.length}
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
