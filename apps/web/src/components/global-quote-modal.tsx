"use client";

import { useState, useEffect } from "react";
import { InstantQuoteModal } from "./instant-quote-modal";

export function GlobalQuoteModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    // Listen for the custom event from navigation
    window.addEventListener('openQuoteModal', handleOpenModal);

    return () => {
      window.removeEventListener('openQuoteModal', handleOpenModal);
    };
  }, []);

  return (
    <InstantQuoteModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
