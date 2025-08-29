"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle } from "lucide-react";

interface ExcellenceItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const excellenceItems: ExcellenceItem[] = [
  { icon: CheckCircle, text: "Custom Web Development" },
  { icon: CheckCircle, text: "Mobile App Solutions" },
  { icon: CheckCircle, text: "AI-Powered Automation" },
  { icon: CheckCircle, text: "Strategic Digital Marketing" },
];

export function AnimatedExcellenceList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const items = containerRef.current!.children;
        
        // Set initial state - items start at normal size and visible
        gsap.set(items, {
          scale: 1,
          opacity: 1,
          transformOrigin: "left center"
        });

        // Create the main timeline for continuous looping
        const tl = gsap.timeline({
          repeat: -1, // Infinite loop
          delay: 1 // Start after a short delay
        });

        // Create a continuous wave effect - each item zooms in and back to normal sequence
        excellenceItems.forEach((_, index) => {
          const item = items[index] as HTMLElement;
          
                                // Zoom in (get bigger)
           tl.to(item, {
             scale: 1.1,
             duration: 1.2,
             ease: "power2.out"
           }, index * 1.5); // Slower stagger between items
           
           // Zoom back to normal
           tl.to(item, {
             scale: 1,
             duration: 1.2,
             ease: "power2.in"
           }, `+=0.3`); // Small delay before zooming back to normal
        });

        // Add hover effects
        Array.from(items).forEach((item) => {
          item.addEventListener("mouseenter", () => {
            // Pause the animation
            tl.pause();
            
                         // Add hover effect with glow
             gsap.to(item, {
               scale: 1.1,
               duration: 0.2,
               ease: "power2.out"
             });
            
            // Add subtle glow effect
            gsap.set(item, {
              filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))"
            });
          });
          
          item.addEventListener("mouseleave", () => {
            // Resume the animation
            tl.resume();
            
                         // Reset to normal state
             gsap.to(item, {
               scale: 1,
               duration: 0.2,
               ease: "power2.out"
             });
            
            // Remove glow effect
            gsap.set(item, {
              filter: "none"
            });
          });
        });

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-3 overflow-hidden">
      {excellenceItems.map((item, index) => (
        <div 
          key={index} 
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300"
        >
          <item.icon className="h-5 w-5 text-green-500" />
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
