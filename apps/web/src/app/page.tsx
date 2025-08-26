"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import { ArrowRight, Globe, Smartphone, Zap, TrendingUp, CheckCircle, Users, Building2, GraduationCap, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { InstantQuoteModal } from "../components/instant-quote-modal";

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
                <span className="gradient-text">Digital Linked</span>
                <span className="block text-foreground mt-2">Your Strategic Partner for</span>
                <span className="block gradient-text">Digital Success</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We craft stunning websites, build innovative apps, implement intelligent AI automation, 
                and drive impactful marketing strategies to grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-4 animate-glow"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Globe className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Digital Excellence</h3>
                  <p className="text-muted-foreground">Transforming ideas into digital reality</p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse delay-75"></div>
                    <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              <span className="text-foreground">Tired of Digital</span> <span className="gradient-text">Complexity?</span>
              <br />
              <span className="text-foreground">Overwhelmed by</span> <span className="gradient-text">Endless Options?</span>
              <br />
              <span className="text-foreground">Ready for a</span> <span className="gradient-text">Streamlined Solution?</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Our Process to Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven 5-step process to ensure your digital projects are delivered 
              efficiently and effectively, driving tangible results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                title: "Plan",
                description: "Strategic planning and roadmap creation.",
                icon: CheckCircle,
              },
              {
                title: "Design",
                description: "User-centric design and prototyping.",
                icon: CheckCircle,
              },
              {
                title: "Develop",
                description: "Robust development and integration.",
                icon: CheckCircle,
              },
              {
                title: "Automate",
                description: "AI-powered automation solutions.",
                icon: Zap,
              },
              {
                title: "Grow",
                description: "Continuous growth and optimization.",
                icon: TrendingUp,
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer a comprehensive suite of digital services designed to elevate your brand 
              and accelerate your growth in the digital landscape.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Website Development",
                description: "Crafting responsive, high-performance websites that captivate and convert visitors.",
                icon: Globe,
                href: "/website",
              },
              {
                title: "App Development",
                description: "Building intuitive and scalable mobile & web applications tailored to your needs.",
                icon: Smartphone,
                href: "/apps",
              },
              {
                title: "AI Automation",
                description: "Leveraging artificial intelligence to streamline processes and unlock new efficiencies.",
                icon: Zap,
                href: "/ai-automation",
              },
              {
                title: "Digital Marketing",
                description: "Driving growth with data-driven marketing strategies across all digital channels.",
                icon: TrendingUp,
                href: "/marketing",
              },
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Get Started Quickly & Efficiently
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures a smooth and efficient journey from concept to launch. 
              We prioritize clarity, collaboration, and delivering value fast.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Rapid onboarding & strategy alignment.",
              "Transparent project management & communication.",
              "Flexible solutions tailored to your budget & goals.",
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Serving Diverse Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We adapt our expertise to meet the unique challenges and opportunities of various sectors, 
              delivering tailored digital solutions that drive success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { name: "Real Estate", icon: Building2 },
              { name: "E-commerce", icon: ShoppingCart },
              { name: "Healthcare", icon: Heart },
              { name: "Education", icon: GraduationCap },
              { name: "Startups", icon: Users },
            ].map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{industry.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Cut the Chaos & Elevate Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how Digital Linked can become your trusted partner in navigating 
            the complexities of the digital world and achieving your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/contact?action=strategy-call">Book a Free Strategy Call</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <InstantQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
