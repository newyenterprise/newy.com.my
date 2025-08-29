"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle, Code, Palette, Database, Shield, Zap, Globe, Users, Target, Clock, Smartphone, Layers, Cpu, Server, Wifi, Lock, Cloud, Monitor, Tablet, Bot, Workflow, Brain, MessageSquare, Settings, BarChart, Mail, Calendar, FileText, ShoppingCart, TrendingUp, Activity, Search, Share2, PenTool, Eye, Camera, Award } from "lucide-react";

interface ExcellenceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AnimatedExcellenceListProps {
  items: ExcellenceItem[];
  className?: string;
}

export function AnimatedExcellenceList({ items, className = "" }: AnimatedExcellenceListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const listItems = container.querySelectorAll('.excellence-item');
        const icons = container.querySelectorAll('.excellence-icon');
        const titles = container.querySelectorAll('.excellence-title');
        const descriptions = container.querySelectorAll('.excellence-description');

        // Set initial states
        gsap.set(listItems, { opacity: 0, y: 30 });
        gsap.set(icons, { scale: 0, rotation: -180 });
        gsap.set(titles, { opacity: 0, x: -20 });
        gsap.set(descriptions, { opacity: 0, y: 10 });

        // Create staggered animation
        const tl = gsap.timeline();

        tl.to(listItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        })
        .to(icons, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(titles, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.3")
        .to(descriptions, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");

        // Add hover animations
        listItems.forEach((item) => {
          const icon = item.querySelector('.excellence-icon');
          
          item.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className={`space-y-6 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="excellence-item flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="excellence-icon flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
            {item.icon}
          </div>
          <div className="flex-1">
            <h3 className="excellence-title text-lg font-semibold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="excellence-description text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WebDevelopmentProcessVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const processSteps = container.querySelectorAll('.process-step');
        const icons = container.querySelectorAll('.process-icon');
        const connections = container.querySelectorAll('.process-connection');
        const floatingElements = container.querySelectorAll('.floating-element');
        
        // Set initial states
        gsap.set(processSteps, { opacity: 0, y: 20 });
        gsap.set(icons, { scale: 0, rotation: -180 });
        gsap.set(connections, { scaleX: 0 });
        gsap.set(floatingElements, { opacity: 0, y: 30 });

        // Create main timeline
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        // Animate process steps in sequence
        processSteps.forEach((step, index) => {
          tl.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, index * 0.8);

          // Animate corresponding icon
          tl.to(icons[index], {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
          }, index * 0.8);

          // Animate connection line
          if (connections[index]) {
            tl.to(connections[index], {
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out"
            }, index * 0.8 + 0.3);
          }
        });

        // Animate floating elements
        tl.to(floatingElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=1");

        // Create continuous floating animation for elements
        floatingElements.forEach((element, index) => {
          gsap.to(element, {
            y: -10,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });
        });

        // Add pulse effect to icons
        icons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1.1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add glow effect to connections
        connections.forEach((connection) => {
          gsap.to(connection, {
            opacity: 0.7,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      
      {/* Main process visualization */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {/* Process steps */}
        <div className="space-y-6">
          {/* Discovery & Planning */}
          <div className="process-step flex items-center gap-4">
            <div className="process-icon w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full process-connection"></div>
            </div>
            <div className="text-sm font-medium text-blue-300">Discovery</div>
          </div>

          {/* Design & Prototyping */}
          <div className="process-step flex items-center gap-4">
            <div className="process-icon w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <Palette className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full process-connection"></div>
            </div>
            <div className="text-sm font-medium text-purple-300">Design</div>
          </div>

          {/* Development */}
          <div className="process-step flex items-center gap-4">
            <div className="process-icon w-12 h-12 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-pink-500/30">
              <Code className="h-6 w-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full process-connection"></div>
            </div>
            <div className="text-sm font-medium text-pink-300">Develop</div>
          </div>

          {/* Testing & Launch */}
          <div className="process-step flex items-center gap-4">
            <div className="process-icon w-12 h-12 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-orange-500/30 to-green-500/30 rounded-full process-connection"></div>
            </div>
            <div className="text-sm font-medium text-orange-300">Launch</div>
          </div>
        </div>

        {/* Floating technology elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Globe className="h-4 w-4 text-blue-400" />
          </div>
          <div className="floating-element absolute top-8 right-8 w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Zap className="h-3 w-3 text-purple-400" />
          </div>
          <div className="floating-element absolute bottom-8 left-8 w-7 h-7 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <Database className="h-4 w-4 text-pink-400" />
          </div>
          <div className="floating-element absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <Users className="h-3 w-3 text-orange-400" />
          </div>
          <div className="floating-element absolute top-1/2 left-1/4 w-5 h-5 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Clock className="h-3 w-3 text-green-400" />
          </div>
          <div className="floating-element absolute top-1/3 right-1/4 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <CheckCircle className="h-3 w-3 text-blue-400" />
          </div>
        </div>

        {/* Central success indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppDevelopmentVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const appDevices = container.querySelectorAll('.app-device');
        const techIcons = container.querySelectorAll('.tech-icon');
        const connectionLines = container.querySelectorAll('.connection-line');
        const floatingElements = container.querySelectorAll('.floating-element');
        const platformIcons = container.querySelectorAll('.platform-icon');
        
        // Set initial states
        gsap.set(appDevices, { opacity: 0, scale: 0.8, y: 20 });
        gsap.set(techIcons, { opacity: 0, scale: 0, rotation: -180 });
        gsap.set(connectionLines, { scaleX: 0 });
        gsap.set(floatingElements, { opacity: 0, y: 30 });
        gsap.set(platformIcons, { opacity: 0, scale: 0.5 });

        // Create main timeline
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // Animate app devices in sequence
        appDevices.forEach((device, index) => {
          tl.to(device, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, index * 0.6);

          // Animate corresponding tech icon
          if (techIcons[index]) {
            tl.to(techIcons[index], {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            }, index * 0.6 + 0.3);
          }

          // Animate connection line
          if (connectionLines[index]) {
            tl.to(connectionLines[index], {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out"
            }, index * 0.6 + 0.4);
          }
        });

        // Animate platform icons
        tl.to(platformIcons, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=1");

        // Animate floating elements
        tl.to(floatingElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.5");

        // Create continuous floating animation for elements
        floatingElements.forEach((element, index) => {
          gsap.to(element, {
            y: -15,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
        });

        // Add pulse effect to tech icons
        techIcons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1.15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add glow effect to connection lines
        connectionLines.forEach((line) => {
          gsap.to(line, {
            opacity: 0.8,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add rotation to platform icons
        platformIcons.forEach((icon, index) => {
          gsap.to(icon, {
            rotation: 360,
            duration: 8 + index * 2,
            repeat: -1,
            ease: "none"
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      
      {/* Main app development visualization */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {/* App Development Process */}
        <div className="space-y-5 mb-8">
          {/* Native iOS Development */}
          <div className="app-device flex items-center gap-4">
            <div className="tech-icon w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Smartphone className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-blue-300">iOS</div>
          </div>

          {/* Native Android Development */}
          <div className="app-device flex items-center gap-4">
            <div className="tech-icon w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <Smartphone className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-green-300">Android</div>
          </div>

          {/* Cross-Platform Development */}
          <div className="app-device flex items-center gap-4">
            <div className="tech-icon w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <Layers className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-purple-300">Cross-Platform</div>
          </div>

          {/* Web App Development */}
          <div className="app-device flex items-center gap-4">
            <div className="tech-icon w-12 h-12 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-pink-500/30">
              <Monitor className="h-6 w-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-pink-300">Web App</div>
          </div>
        </div>

        {/* Platform Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Smartphone className="h-5 w-5 text-blue-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Tablet className="h-5 w-5 text-green-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Monitor className="h-5 w-5 text-purple-400" />
          </div>
        </div>

        {/* Floating technology elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-3 left-3 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Cpu className="h-3 w-3 text-blue-400" />
          </div>
          <div className="floating-element absolute top-6 right-6 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Server className="h-3 w-3 text-purple-400" />
          </div>
          <div className="floating-element absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <Cloud className="h-3 w-3 text-pink-400" />
          </div>
          <div className="floating-element absolute bottom-3 right-3 w-5 h-5 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <Wifi className="h-3 w-3 text-orange-400" />
          </div>
          <div className="floating-element absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Lock className="h-2 w-2 text-green-400" />
          </div>
          <div className="floating-element absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Zap className="h-3 w-3 text-blue-400" />
          </div>
        </div>

        {/* Central success indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AIAutomationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const automationSteps = container.querySelectorAll('.automation-step');
        const workflowIcons = container.querySelectorAll('.workflow-icon');
        const connectionLines = container.querySelectorAll('.connection-line');
        const floatingElements = container.querySelectorAll('.floating-element');
        const platformIcons = container.querySelectorAll('.platform-icon');
        const dataFlow = container.querySelectorAll('.data-flow');
        
        // Set initial states
        gsap.set(automationSteps, { opacity: 0, scale: 0.8, y: 20 });
        gsap.set(workflowIcons, { opacity: 0, scale: 0, rotation: -180 });
        gsap.set(connectionLines, { scaleX: 0 });
        gsap.set(floatingElements, { opacity: 0, y: 30 });
        gsap.set(platformIcons, { opacity: 0, scale: 0.5 });
        gsap.set(dataFlow, { opacity: 0, scale: 0 });

        // Create main timeline
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // Animate automation steps in sequence
        automationSteps.forEach((step, index) => {
          tl.to(step, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, index * 0.7);

          // Animate corresponding workflow icon
          if (workflowIcons[index]) {
            tl.to(workflowIcons[index], {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            }, index * 0.7 + 0.3);
          }

          // Animate connection line
          if (connectionLines[index]) {
            tl.to(connectionLines[index], {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out"
            }, index * 0.7 + 0.4);
          }
        });

        // Animate platform icons
        tl.to(platformIcons, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=1");

        // Animate data flow elements
        tl.to(dataFlow, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.8");

        // Animate floating elements
        tl.to(floatingElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.5");

        // Create continuous floating animation for elements
        floatingElements.forEach((element, index) => {
          gsap.to(element, {
            y: -12,
            duration: 2.2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
        });

        // Add pulse effect to workflow icons
        workflowIcons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1.12,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add glow effect to connection lines
        connectionLines.forEach((line) => {
          gsap.to(line, {
            opacity: 0.8,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add rotation to platform icons
        platformIcons.forEach((icon, index) => {
          gsap.to(icon, {
            rotation: 360,
            duration: 10 + index * 2,
            repeat: -1,
            ease: "none"
          });
        });

        // Add data flow animation
        dataFlow.forEach((flow, index) => {
          gsap.to(flow, {
            scale: 1.1,
            duration: 1.5 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      
      {/* Main AI automation visualization */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {/* Automation Workflow Process */}
        <div className="space-y-5 mb-8">
          {/* Lead Capture & Follow-up */}
          <div className="automation-step flex items-center gap-4">
            <div className="workflow-icon w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-blue-300">Lead Capture</div>
          </div>

          {/* Email Marketing Automation */}
          <div className="automation-step flex items-center gap-4">
            <div className="workflow-icon w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-purple-300">Email Marketing</div>
          </div>

          {/* CRM Integration */}
          <div className="automation-step flex items-center gap-4">
            <div className="workflow-icon w-12 h-12 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-pink-500/30">
              <Database className="h-6 w-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-pink-300">CRM Integration</div>
          </div>

          {/* AI Chatbot Support */}
          <div className="automation-step flex items-center gap-4">
            <div className="workflow-icon w-12 h-12 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <Bot className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-orange-500/30 to-green-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-orange-300">AI Chatbot</div>
          </div>
        </div>

        {/* Platform Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Workflow className="h-5 w-5 text-blue-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Brain className="h-5 w-5 text-purple-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <MessageSquare className="h-5 w-5 text-pink-400" />
          </div>
        </div>

        {/* Data Flow Indicators */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="data-flow w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          <div className="data-flow w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          <div className="data-flow w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"></div>
          <div className="data-flow w-3 h-3 bg-gradient-to-r from-orange-400 to-green-400 rounded-full"></div>
        </div>

        {/* Floating technology elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Settings className="h-3 w-3 text-blue-400" />
          </div>
          <div className="floating-element absolute top-6 right-6 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <BarChart className="h-3 w-3 text-purple-400" />
          </div>
          <div className="floating-element absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <Calendar className="h-3 w-3 text-pink-400" />
          </div>
          <div className="floating-element absolute bottom-4 right-4 w-5 h-5 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <TrendingUp className="h-3 w-3 text-orange-400" />
          </div>
          <div className="floating-element absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Activity className="h-2 w-2 text-green-400" />
          </div>
          <div className="floating-element absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <FileText className="h-3 w-3 text-blue-400" />
          </div>
        </div>

        {/* Central success indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const container = containerRef.current!;
        const marketingServices = container.querySelectorAll('.marketing-service');
        const serviceIcons = container.querySelectorAll('.service-icon');
        const connectionLines = container.querySelectorAll('.connection-line');
        const floatingElements = container.querySelectorAll('.floating-element');
        const platformIcons = container.querySelectorAll('.platform-icon');
        const dataPoints = container.querySelectorAll('.data-point');
        
        // Set initial states
        gsap.set(marketingServices, { opacity: 0, scale: 0.8, y: 20 });
        gsap.set(serviceIcons, { opacity: 0, scale: 0, rotation: -180 });
        gsap.set(connectionLines, { scaleX: 0 });
        gsap.set(floatingElements, { opacity: 0, y: 30 });
        gsap.set(platformIcons, { opacity: 0, scale: 0.5 });
        gsap.set(dataPoints, { opacity: 0, scale: 0 });

        // Create main timeline
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // Animate marketing services in sequence
        marketingServices.forEach((service, index) => {
          tl.to(service, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, index * 0.6);

          // Animate corresponding service icon
          if (serviceIcons[index]) {
            tl.to(serviceIcons[index], {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            }, index * 0.6 + 0.3);
          }

          // Animate connection line
          if (connectionLines[index]) {
            tl.to(connectionLines[index], {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out"
            }, index * 0.6 + 0.4);
          }
        });

        // Animate platform icons
        tl.to(platformIcons, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=1");

        // Animate data points
        tl.to(dataPoints, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.8");

        // Animate floating elements
        tl.to(floatingElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.5");

        // Create continuous floating animation for elements
        floatingElements.forEach((element, index) => {
          gsap.to(element, {
            y: -10,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
        });

        // Add pulse effect to service icons
        serviceIcons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add glow effect to connection lines
        connectionLines.forEach((line) => {
          gsap.to(line, {
            opacity: 0.8,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

        // Add rotation to platform icons
        platformIcons.forEach((icon, index) => {
          gsap.to(icon, {
            rotation: 360,
            duration: 12 + index * 2,
            repeat: -1,
            ease: "none"
          });
        });

        // Add data point animation
        dataPoints.forEach((point, index) => {
          gsap.to(point, {
            scale: 1.2,
            duration: 1.8 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      
      {/* Main marketing visualization */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-center">
        {/* Marketing Services Process */}
        <div className="space-y-5 mb-8">
          {/* SEO */}
          <div className="marketing-service flex items-center gap-4">
            <div className="service-icon w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-blue-300">SEO</div>
          </div>

          {/* PPC Advertising */}
          <div className="marketing-service flex items-center gap-4">
            <div className="service-icon w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-purple-300">PPC</div>
          </div>

          {/* Social Media */}
          <div className="marketing-service flex items-center gap-4">
            <div className="service-icon w-12 h-12 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-pink-500/30">
              <Share2 className="h-6 w-6 text-pink-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-pink-300">Social</div>
          </div>

          {/* Content Marketing */}
          <div className="marketing-service flex items-center gap-4">
            <div className="service-icon w-12 h-12 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <PenTool className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gradient-to-r from-orange-500/30 to-green-500/30 rounded-full connection-line"></div>
            </div>
            <div className="text-sm font-medium text-orange-300">Content</div>
          </div>
        </div>

        {/* Platform Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Globe className="h-5 w-5 text-blue-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <BarChart className="h-5 w-5 text-purple-400" />
          </div>
          <div className="platform-icon w-10 h-10 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <TrendingUp className="h-5 w-5 text-pink-400" />
          </div>
        </div>

        {/* Data Points */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="data-point w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          <div className="data-point w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          <div className="data-point w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"></div>
          <div className="data-point w-3 h-3 bg-gradient-to-r from-orange-400 to-green-400 rounded-full"></div>
        </div>

        {/* Floating technology elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Eye className="h-3 w-3 text-blue-400" />
          </div>
          <div className="floating-element absolute top-6 right-6 w-5 h-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Activity className="h-3 w-3 text-purple-400" />
          </div>
          <div className="floating-element absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
            <Mail className="h-3 w-3 text-pink-400" />
          </div>
          <div className="floating-element absolute bottom-4 right-4 w-5 h-5 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <Camera className="h-3 w-3 text-orange-400" />
          </div>
          <div className="floating-element absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
            <Zap className="h-2 w-2 text-green-400" />
          </div>
          <div className="floating-element absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
            <Award className="h-3 w-3 text-blue-400" />
          </div>
        </div>

        {/* Central success indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30 animate-pulse">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}