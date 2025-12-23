"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export function Footer() {
  const { t } = useTranslations();
  
  return (
    <footer className="bg-background border-t border-primary/20">
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Image 
                src="/newy_logo.png" 
                alt="NewY Logo" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
                unoptimized
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-accent" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-accent" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-accent" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              <li>
                <LocalizedLink href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.home")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.aboutUs")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/portfolio" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.portfolio")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.blog")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.contactUs")}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t("footer.services")}</h3>
            <ul className="space-y-3">
              <li>
                <LocalizedLink href="/website" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.websiteDevelopment")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/apps" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.mobileApps")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/ai-automation" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.aiAutomation")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/marketing" className="text-muted-foreground hover:text-accent transition-colors">
                  {t("footer.digitalMarketing")}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t("footer.contactUs")}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  Bandar Baru Bangi, Selangor, Malaysia
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a 
                  href="mailto:hello@newy.com.my" 
                  className="text-muted-foreground text-sm hover:text-accent transition-colors"
                >
                  hello@newy.com.my
                </a>
              </div>
                             <div className="flex items-center gap-3">
                 <a 
                   href="https://wa.me/601128908472" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
                 >
                   <svg className="h-5 w-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                   </svg>
                   011 2890 8472
                 </a>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <LocalizedLink href="/privacy-policy" className="text-muted-foreground hover:text-accent transition-colors">
                {t("footer.privacyPolicy")}
              </LocalizedLink>
              <LocalizedLink href="/terms-of-service" className="text-muted-foreground hover:text-accent transition-colors">
                {t("footer.termsOfService")}
              </LocalizedLink>
              <LocalizedLink href="/cookie-policy" className="text-muted-foreground hover:text-accent transition-colors">
                {t("footer.cookiePolicy")}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
