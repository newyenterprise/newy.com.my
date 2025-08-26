"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { Card } from "@digitallinked/ui";

interface HoverCardProps {
  children: React.ReactNode;
  scale?: number;
  lift?: number;
  className?: string;
  [key: string]: any;
}

export function HoverCard({ 
  children, 
  scale = 1.05, 
  lift = -8,
  className = "", 
  ...props 
}: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !ref.current) return;
      
      const { gsap } = mod;
      const card = ref.current;
      
      ctx = gsap.context(() => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale,
            y: lift,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    })();

    return () => ctx?.revert();
  }, [scale, lift]);

  return (
    <Card 
      ref={ref} 
      className={`transition-shadow duration-300 hover:shadow-xl ${className}`} 
      {...props}
    >
      {children}
    </Card>
  );
}
