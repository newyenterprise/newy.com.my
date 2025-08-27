"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@digitallinked/ui";
import { ButtonProps } from "@digitallinked/ui";

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({ 
  children, 
  strength = 0.3, 
  className = "", 
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !ref.current) return;
      
      const { gsap } = mod;
      const button = ref.current;
      
      ctx = gsap.context(() => {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
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
    <Button ref={ref} className={className} {...props}>
      {children}
    </Button>
  );
}


