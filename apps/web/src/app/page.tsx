"use client"; // Updated for deployment test

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import { ArrowRight, Globe, Smartphone, Zap, TrendingUp, CheckCircle, Users, Building2, GraduationCap, ShoppingCart, Heart, Target, Palette, Code } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "../components/scroll-reveal";
import { MagneticButton } from "../components/magnetic-button";
import { ParallaxHero } from "../components/parallax-hero";
import { HoverCard } from "../components/hover-card";
import { AnimatedIndustries } from "../components/animated-industries";
import { AnimatedExcellenceList } from "../components/animated-excellence-list";
import { MagneticCard } from "../components/magnetic-card";

export default function HomePage() {
  const excellenceItems = [
    {
      title: "Web Development",
      description: "",
      icon: <Code className="h-5 w-5 text-primary" />
    },
    {
      title: "AI Automation",
      description: "",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      title: "Digital Marketing",
      description: "",
      icon: <Target className="h-5 w-5 text-primary" />
    },
    {
      title: "App Development",
      description: "",
      icon: <Smartphone className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Digital Linked</span>
                <br />
                Your Strategic Partner for
                <br />
                <span className="text-yellow-400">Digital Success</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We craft stunning websites, build innovative apps, implement intelligent AI automation, 
                and drive impactful marketing strategies to grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-4 animate-glow"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('openQuoteModal'));
                  }}
                >
                  Instant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/contact">Contact Us</Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <MagneticCard strength={0.15}>
                <HoverCard className="bg-background/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 animate-glow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Digital Excellence</h3>
                      <p className="text-muted-foreground">Transforming ideas into digital reality</p>
                    </div>
                  </div>
                  <AnimatedExcellenceList items={excellenceItems} />
                </HoverCard>
              </MagneticCard>
            </ParallaxHero>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end digital solutions that drive growth, 
              enhance user experience, and deliver measurable results for your business.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                title: "Website Development",
                description: "Custom, responsive websites that convert visitors into customers.",
                icon: Globe,
                color: "text-blue-500"
              },
              {
                title: "App Development",
                description: "Native and cross-platform mobile applications for iOS and Android.",
                icon: Smartphone,
                color: "text-green-500"
              },
              {
                title: "AI Automation",
                description: "Intelligent automation solutions that streamline your operations.",
                icon: Zap,
                color: "text-purple-500"
              },
              {
                title: "Digital Marketing",
                description: "Data-driven marketing strategies that grow your online presence.",
                icon: TrendingUp,
                color: "text-orange-500"
              }
            ].map((service, index) => (
              <HoverCard key={index} className="text-center">
                <CardHeader>
                  <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </HoverCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Get Started Quickly & Efficiently
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures a smooth and efficient journey from concept to launch. 
              We prioritize clarity, collaboration, and delivering value fast.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-3 gap-8" stagger={0.1}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Section */}
      <AnimatedIndustries />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <ScrollReveal className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Cut the Chaos & Elevate Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how Digital Linked can become your trusted partner in navigating 
            the complexities of the digital world and achieving your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 animate-glow"
              asChild
            >
              <Link href="/contact?action=strategy-call">Book a Free Strategy Call</Link>
            </MagneticButton>
            <MagneticButton 
              size="lg" 
              variant="outline" 
              className="btn-outline text-lg px-8 py-4"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openQuoteModal'));
              }}
            >
              Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

