"use client";

import { Button } from "@digitallinked/ui";
import { ArrowLeft, Home, Search, Zap, Globe, Smartphone, Target, Code, RefreshCw, Rocket } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MagneticButton } from "../components/magnetic-button";
import { ScrollReveal } from "../components/scroll-reveal";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.x <= 0 || particle.x >= window.innerWidth ? -particle.vx : particle.vx,
        vy: particle.y <= 0 || particle.y >= window.innerHeight ? -particle.vy : particle.vy,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { icon: <Code className="h-6 w-6" />, name: "Web Development", href: "/website" },
    { icon: <Smartphone className="h-6 w-6" />, name: "App Development", href: "/apps" },
    { icon: <Zap className="h-6 w-6" />, name: "AI Automation", href: "/ai-automation" },
    { icon: <Target className="h-6 w-6" />, name: "Digital Marketing", href: "/marketing" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Trail */}
      <div
        className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />

      <div className="container relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          {/* Main 404 Content */}
          <ScrollReveal>
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold font-display mb-4">
                <span className="gradient-text">404</span>
              </h1>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Oops! You're Lost in
                  <br />
                  <span className="text-yellow-400">Digital Space</span>
                </h2>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-bounce" />
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Don't worry! Even the best digital explorers get lost sometimes. 
                Let's get you back on track to discover amazing digital solutions.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Search Bar */}
          <ScrollReveal delay={0.2}>
            <div className="mb-12">
              <div className="relative max-w-md mx-auto">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search for something amazing..."
                    className="w-full px-6 py-4 bg-background/50 backdrop-blur-sm border border-primary/30 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    onFocus={() => setIsHovering(true)}
                    onBlur={() => setIsHovering(false)}
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <MagneticButton 
                size="lg" 
                className="btn-primary text-lg px-8 py-4 animate-glow"
                asChild
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </MagneticButton>
              <MagneticButton 
                size="lg" 
                variant="outline" 
                className="btn-outline text-lg px-8 py-4"
                asChild
              >
                <Link href="/contact">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Services Grid */}
          <ScrollReveal delay={0.4}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-display mb-6">
                While You're Here, Explore Our
                <br />
                <span className="gradient-text">Digital Services</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {services.map((service, index) => (
                  <MagneticButton
                    key={service.name}
                    variant="outline"
                    className="btn-outline p-4 h-auto flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href={service.href}>
                      <div className="text-primary">{service.icon}</div>
                      <span className="text-sm font-medium">{service.name}</span>
                    </Link>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Fun Interactive Element */}
          <ScrollReveal delay={0.5}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-background/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Rocket className="h-8 w-8 text-accent animate-bounce" />
                  <h4 className="text-xl font-bold font-display">Ready to Launch?</h4>
                  <Rocket className="h-8 w-8 text-accent animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <p className="text-muted-foreground mb-4">
                  Let's get your digital journey back on track with our instant quote system.
                </p>
                <MagneticButton 
                  size="lg" 
                  className="btn-primary w-full"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('openQuoteModal'));
                  }}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Instant Quote
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Easter Egg */}
          <ScrollReveal delay={0.6}>
            <div className="mt-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => {
                  const messages = [
                    "You found the secret button! 🎉",
                    "DigitalLinked appreciates your curiosity! 🚀",
                    "404 errors happen to the best of us! 💫",
                    "Thanks for exploring our digital space! 🌟"
                  ];
                  alert(messages[Math.floor(Math.random() * messages.length)]);
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                <RefreshCw className="inline h-4 w-4 mr-1" />
                Click for a digital surprise
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
}
