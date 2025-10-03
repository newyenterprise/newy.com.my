"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

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

        // Set initial states
        gsap.set(listItems, { opacity: 0, scale: 0.8 });
        gsap.set(icons, { scale: 0 });

        // Create staggered animation with zoom in effect
        const tl = gsap.timeline();

        tl.to(listItems, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        })
        .to(icons, {
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4");

        // Add hover animations
        listItems.forEach((item) => {
          const icon = item.querySelector('.excellence-icon');
          
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1,
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
    <div ref={containerRef} className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="excellence-item flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="excellence-icon flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
            {item.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
