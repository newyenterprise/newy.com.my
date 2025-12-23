"use client";

import { ArrowRight, Globe, Smartphone, Brain, TrendingUp, Check, Sparkles, Rocket } from "lucide-react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function PricingPage() {
  const { t } = useTranslations();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <ScrollReveal className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">{t("pricing.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                name: "Laman Web",
                icon: Globe,
                price: "RM 1,500",
                description: "Laman web profesional yang menukar pelawat kepada pelanggan",
                features: [
                  "Reka bentuk responsif",
                  "Dioptimumkan SEO",
                  "Kelajuan muat pantas",
                  "Pendekatan mobile-first",
                  "Integrasi analitik",
                  "Sehingga 5 halaman"
                ],
                popular: true,
                gradient: "from-blue-500 to-purple-600"
              },
              {
                name: "Aplikasi",
                icon: Smartphone,
                price: "RM 3,000",
                description: "Aplikasi mudah alih tersuai untuk iOS dan Android",
                features: [
                  "Aplikasi asli atau merentas platform",
                  "Reka bentuk UI/UX",
                  "Integrasi backend",
                  "Ujian & pelancaran",
                  "Sokongan 3 bulan",
                  "Kemaskini percuma"
                ],
                popular: false,
                gradient: "from-purple-500 to-pink-600"
              },
              {
                name: "Automasi AI",
                icon: Brain,
                price: "RM 2,000",
                description: "Automasi aliran kerja dan chatbot pintar",
                features: [
                  "Automasi aliran kerja",
                  "Chatbot AI",
                  "Integrasi platform",
                  "Penyediaan & latihan",
                  "Sokongan 2 bulan",
                  "Dokumentasi lengkap"
                ],
                popular: false,
                gradient: "from-pink-500 to-orange-600"
              },
              {
                name: "Pemasaran",
                icon: TrendingUp,
                price: "RM 1,500",
                description: "Strategi pemasaran digital yang mendorong hasil",
                features: [
                  "SEO & PPC",
                  "Pemasaran media sosial",
                  "Pemasaran kandungan",
                  "Pemasaran e-mel",
                  "Analitik & pelaporan",
                  "Kempen bulanan"
                ],
                popular: false,
                gradient: "from-orange-500 to-yellow-600"
              }
            ].map((service, index) => (
              <HoverCard 
                key={index} 
                className={`group border-purple-500/20 hover:border-purple-500/40 ${service.popular ? 'ring-2 ring-purple-500/50' : ''}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      Paling Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{service.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">mulai dari</span>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton 
                    className={`w-full ${service.popular ? 'btn-primary' : 'btn-outline'}`}
                    asChild
                  >
                    <LocalizedLink href="/contact">
                      Dapatkan Sebut Harga
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </LocalizedLink>
                  </MagneticButton>
                </CardContent>
              </HoverCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Penyelesaian Tersuai</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Setiap projek adalah unik. Kami menawarkan penyelesaian tersuai yang disesuaikan dengan keperluan dan bajet khusus anda.
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Perundingan Percuma",
                description: "Bincangkan projek anda dengan pakar kami dan dapatkan nasihat profesional.",
                icon: Sparkles
              },
              {
                title: "Sebut Harga Tersuai",
                description: "Terima sebut harga terperinci yang disesuaikan dengan keperluan projek anda.",
                icon: Rocket
              },
              {
                title: "Pembayaran Fleksibel",
                description: "Pilihan pembayaran yang fleksibel termasuk bayaran sekali atau ansuran.",
                icon: Check
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                  <benefit.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Memulakan?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hubungi kami hari ini untuk perundingan percuma dan dapatkan sebut harga tersuai untuk projek anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <LocalizedLink href="/contact">Hubungi Kami Sekarang</LocalizedLink>
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
              <LocalizedLink href="/portfolio">Lihat Portfolio Kami</LocalizedLink>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
