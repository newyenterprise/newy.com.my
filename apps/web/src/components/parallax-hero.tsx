"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

interface ParallaxHeroProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxHero({ 
  children, 
  className = "", 
  speed = 0.5 
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !ref.current) return;
      
      const { gsap } = mod;
      ctx = gsap.context(() => {
        // Parallax effect on scroll
        gsap.to(ref.current, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

