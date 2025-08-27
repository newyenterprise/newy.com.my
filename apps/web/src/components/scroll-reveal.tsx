"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  y?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  y = 24, 
  stagger = 0.08, 
  once = true, 
  className = "",
  delay = 0,
  duration = 0.8
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !ref.current) return;
      
      const { gsap } = mod;
      ctx = gsap.context(() => {
        gsap.set(ref.current!.children, { autoAlpha: 0, y });
        gsap.to(ref.current!.children, {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once,
          }
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, [y, stagger, once, delay, duration]);

  return <div ref={ref} className={className}>{children}</div>;
}


