import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, BarChart, Search, Check, Star, Globe, Mail, Share2, Eye } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Strategic Digital Marketing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Amplify your brand, engage your audience, and drive measurable results with our 
                comprehensive digital marketing services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Boost Your Marketing ROI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View Case Studies</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Data-Driven Marketing Approach */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Data-Driven Marketing Approach</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe in strategies backed by data and creativity that converts. Our digital 
              marketing services are designed to help you achieve sustainable growth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Search Engine Optimization (SEO)",
                "Pay-Per-Click (PPC) Advertising",
                "Social Media Marketing & Management",
                "Content Creation & Marketing",
                "Email Marketing Campaigns",
                "Analytics & Performance Reporting"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <Button asChild className="btn-primary">
                  <Link href="/portfolio">View Case Studies</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Digital Linked for Marketing */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Why Choose Digital Linked for Marketing?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Proven Strategies",
                description: "Data-backed marketing strategies that deliver measurable results.",
                icon: BarChart,
                features: ["ROI-Focused Campaigns", "Performance Tracking", "Continuous Optimization", "Transparent Reporting"]
              },
              {
                title: "Transparent Reporting",
                description: "Clear, detailed reports showing exactly how your marketing budget is performing.",
                icon: Eye,
                features: ["Real-time Dashboards", "Monthly Reports", "KPI Tracking", "Actionable Insights"]
              },
              {
                title: "Expert Team",
                description: "Experienced marketers who stay current with the latest trends and best practices.",
                icon: Target,
                features: ["Certified Specialists", "Industry Experience", "Creative Excellence", "Strategic Thinking"]
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Grow Your Business Online */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Grow Your Business Online?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's craft a marketing strategy that delivers exceptional results.
          </p>
          <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
            Get a Free Marketing Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say About Our Digital Marketing Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Great experience working on our digital marketing project! Highly recommend.",
                author: "John Doe",
                company: "TechCorp Solutions"
              },
              {
                rating: 4,
                text: "Very knowledgeable team. Our digital marketing results were impressive.",
                author: "Jane Smith",
                company: "ServiceFirst Inc"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                  <div className="text-sm text-muted-foreground">
                    <div className="font-semibold">— {testimonial.author}</div>
                    <div>{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More client reviews will be added here)</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions about Digital Marketing</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a digital marketing project?",
                answer: "Digital marketing is an ongoing process. You can see initial results within 30-60 days, but significant growth typically occurs over 3-6 months of consistent effort. We'll provide a detailed timeline based on your specific goals."
              },
              {
                question: "How do you measure success for digital marketing services?",
                answer: "We track various KPIs including website traffic, lead generation, conversion rates, ROI, brand awareness, and engagement metrics. Success metrics are customized based on your business objectives."
              },
              {
                question: "Can you integrate your digital marketing solutions with our existing systems?",
                answer: "Absolutely! We integrate with popular CRM systems, analytics platforms, e-commerce solutions, and marketing automation tools to ensure seamless data flow and comprehensive reporting."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More FAQs specific to digital marketing will be added here)</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About Digital Marketing</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in Digital Marketing for 2024",
                description: "Discover the latest trends shaping the world of digital marketing and how your business can benefit.",
                image: "600 × 400"
              },
              {
                title: "Maximizing ROI with Digital Marketing",
                description: "Learn strategies to ensure your investment in digital marketing delivers maximum returns.",
                image: "600 × 400"
              }
            ].map((article, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-t-lg border-b border-purple-500/20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground/30">{article.image}</div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More blog posts and resources related to digital marketing will be featured here. Blog functionality to be implemented.)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
