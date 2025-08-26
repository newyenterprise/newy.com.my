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
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
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
        console.error('Error submitting contact message:', error);
        // In a real app, you'd show an error message to the user
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
          message: ""
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact message:', error);
      setIsSubmitting(false);
      // In a real app, you'd show an error message to the user
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
      <ParallaxHero className="relative py-24 bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
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
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground">0406 612 824</p>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Note about functionality */}
      <section className="py-12 bg-muted/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            <strong>Note:</strong> This contact form is currently a demo. In the full implementation, 
            form submissions will be stored in the Supabase database and email notifications will be sent. 
            The map will also be integrated with Google Maps for precise location display.
          </p>
        </div>
      </section>
    </div>
  );
}
