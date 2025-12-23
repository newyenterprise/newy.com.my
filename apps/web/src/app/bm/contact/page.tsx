"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@newy/ui";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { useTranslations } from "@/hooks/use-translations";

export default function ContactPage() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    website: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formStartTime || Date.now() - formStartTime < 3000) {
      alert('Sila ambil masa anda untuk mengisi borang. Ini membantu mencegah spam.');
      return;
    }
    
    if (formData.website || formData.company) {
      console.warn('Honeypot fields filled - likely a bot');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          messageType: "general",
          subject: "Pertanyaan dari Laman Web",
          message: formData.message,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || 'Gagal menghantar e-mel');
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            message_type: "general",
            subject: "Pertanyaan dari Laman Web",
            message: formData.message,
            status: 'unread'
          }
        ]);

      if (error) {
        console.error('Error storing contact message in database:', error);
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          website: "",
          company: ""
        });
        setFormStartTime(Date.now());
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Maaf, terdapat ralat. Sila cuba lagi atau hubungi kami secara langsung.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
                <span className="gradient-text">{t("contact.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxHero>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Hantar Mesej</CardTitle>
                  <CardDescription>
                    Isi borang di bawah dan kami akan menghubungi anda secepat mungkin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Terima Kasih!</h3>
                      <p className="text-muted-foreground">
                        Mesej anda telah dihantar. Kami akan menghubungi anda tidak lama lagi.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                          {t("contact.form.name")}
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          {t("contact.form.phone")}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                        />
                      </div>
                      
                      {/* Honeypot fields */}
                      <div className="hidden">
                        <input type="text" name="website" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                      </div>
                      
                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary"
                      >
                        {isSubmitting ? (
                          "Menghantar..."
                        ) : (
                          <>
                            {t("contact.form.submit")}
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </MagneticButton>
                    </form>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold font-display mb-6">Maklumat Hubungan</h2>
                  <p className="text-muted-foreground mb-8">
                    Kami sentiasa bersedia untuk membantu anda. Hubungi kami melalui mana-mana kaedah di bawah.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">E-mel</h3>
                      <p className="text-muted-foreground">info@newy.com.my</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                      <Phone className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+60 12-345 6789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                      <MapPin className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Alamat</h3>
                      <p className="text-muted-foreground">
                        Kuala Lumpur, Malaysia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                      <Clock className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Waktu Operasi</h3>
                      <p className="text-muted-foreground">
                        Isnin - Jumaat: 9:00 AM - 6:00 PM<br />
                        Sabtu: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
