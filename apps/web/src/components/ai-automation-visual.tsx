"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle, Users, Mail, Database, Bot, Workflow, Brain, MessageSquare, Settings, BarChart, Calendar, TrendingUp, Activity, FileText } from "lucide-react";

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

