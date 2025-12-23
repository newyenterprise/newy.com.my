"use client";

import { Button } from "@newy/ui";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { LocalizedLink } from "@/lib/i18n/link";
import { useTranslations } from "@/hooks/use-translations";

export default function AIAutomationPage() {
  const { t } = useTranslations();
  
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="container relative z-10">
          <ScrollReveal className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              <span className="gradient-text">{t("nav.aiAutomation")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Halaman ini sedang dalam pembangunan. Sila kembali ke laman utama.
            </p>
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4" asChild>
              <LocalizedLink href="/">
                Kembali ke Laman Utama
                <ArrowRight className="ml-2 h-5 w-5" />
              </LocalizedLink>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

