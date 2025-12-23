"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@newy/ui";
import { Menu, X } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { LanguageSwitcher } from "./language-switcher";
import { LocalizedLink } from "@/lib/i18n/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslations();

  const navigation = [
    { name: t("nav.website"), href: "/website", key: "website" },
    { name: t("nav.apps"), href: "/apps", key: "apps" },
    { name: t("nav.aiAutomation"), href: "/ai-automation", key: "aiAutomation" },
    { name: t("nav.marketing"), href: "/marketing", key: "marketing" },
    { name: t("nav.pricing"), href: "/pricing", key: "pricing" },
    { name: t("nav.portfolio"), href: "/portfolio", key: "portfolio" },
    { name: t("nav.blog"), href: "/blog", key: "blog" },
    { name: t("nav.contact"), href: "/contact", key: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LocalizedLink href="/" className="flex items-center">
            <Image 
              src="/newy_logo.png" 
              alt="NewY Logo" 
              width={120} 
              height={40} 
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </LocalizedLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <LocalizedLink
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                {item.name}
              </LocalizedLink>
            ))}
          </div>

          {/* CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button 
              className="btn-primary"
              asChild
            >
              <LocalizedLink href="/pricing">{t("nav.instantQuote")}</LocalizedLink>
            </Button>
          </div>

          {/* Mobile menu button & Language Switcher */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-primary/20">
              {navigation.map((item) => (
                <LocalizedLink
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </LocalizedLink>
              ))}
              <div className="px-3 py-2">
                <Button 
                  className="btn-primary w-full"
                  asChild
                >
                  <LocalizedLink href="/pricing" onClick={() => setIsOpen(false)}>{t("nav.instantQuote")}</LocalizedLink>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
