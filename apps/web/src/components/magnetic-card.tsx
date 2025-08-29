"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

interface MagneticCardProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticCard({ 
  children, 
  strength = 0.2, 
  className = "" 
}: MagneticCardProps) {
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
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(card, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    })();

    return () => ctx?.revert();
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
