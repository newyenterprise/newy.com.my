"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxHero } from "@/components/parallax-hero";
import { HoverCard } from "@/components/hover-card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    messageType: "",
    subject: "",
    message: "",
    // Honeypot fields (hidden from users, filled by bots)
    website: "",
    phone: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side spam prevention
    if (!formStartTime || Date.now() - formStartTime < 3000) {
      alert('Please take your time filling out the form. This helps prevent spam.');
      return;
    }
    
    // Check for honeypot fields (should be empty)
    if (formData.website || formData.phone || formData.company) {
      console.warn('Honeypot fields filled - likely a bot');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email via Resend API
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          messageType: formData.messageType,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      // Also submit to Supabase for record keeping
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            message_type: formData.messageType || null,
            subject: formData.subject,
            message: formData.message,
            status: 'unread'
          }
        ]);

      if (error) {
        console.error('Error storing contact message in database:', error);
        // Continue anyway since email was sent successfully
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          messageType: "",
          subject: "",
          message: "",
          website: "",
          phone: "",
          company: ""
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact message:', error);
      setIsSubmitting(false);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to send message. Please try again or contact us directly.';
      
      if (error instanceof Error) {
        if (error.message.includes('Email service is not configured')) {
          errorMessage = 'Email service is temporarily unavailable. Please contact us directly at hello@digitallinked.com.au or call 0406 612 824.';
        } else if (error.message.includes('Failed to send email')) {
          errorMessage = 'Unable to send email at this time. Please try again later or contact us directly.';
        }
      }
      
      alert(errorMessage);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-display mb-4">Message Sent!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Get In Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                We'd love to hear from you! Whether you have a question about our services, want to 
                discuss a project, or just want to say hello, please reach out.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxHero>

      {/* Contact Form and Information */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold font-display mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                      <p className="text-muted-foreground">
                        Newcastle, NSW, Australia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground">hello@digitallinked.com.au</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">WhatsApp Us</h3>
                      <a 
                        href="https://wa.me/61406612824" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        0406 612 824
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal>
              <div>
                <HoverCard className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      onFocus={() => {
                        if (!formStartTime) {
                          setFormStartTime(Date.now());
                        }
                      }}
                    >
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                        />
                      </div>

                      <div>
                        <label htmlFor="messageType" className="block text-sm font-medium mb-2">
                          Message Type
                        </label>
                        <select
                          id="messageType"
                          name="messageType"
                          value={formData.messageType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                        >
                          <option value="">Select a message type</option>
                          <option value="general">General Inquiry</option>
                          <option value="project">Project Discussion</option>
                          <option value="support">Support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Inquiry about Web Development"
                          className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell us more about your project or query..."
                          className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 resize-none"
                        />
                      </div>

                      {/* Honeypot fields - hidden from users but visible to bots */}
                      <div style={{ display: 'none' }}>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary text-lg py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </MagneticButton>
                    </form>
                  </CardContent>
                </HoverCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-display mb-4">Find Us</h2>
              <p className="text-muted-foreground">
                Located in the heart of Bandar Baru Bangi, Selangor
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">Interactive Map</p>
                <p className="text-muted-foreground">
                  Google Maps integration will be added here to show our exact location
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


    </div>
  );
}
