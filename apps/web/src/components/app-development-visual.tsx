"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle, Smartphone, Layers, Monitor, Tablet, Cpu, Server, Cloud, Wifi, Lock, Zap } from "lucide-react";

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

