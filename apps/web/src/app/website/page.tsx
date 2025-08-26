import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Globe, Smartphone, Zap, TrendingUp, Check, Star, Code, Palette, Search, Shield } from "lucide-react";

export default function WebsitePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Custom Website Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We build beautiful, responsive, and high-performing websites that not only look great 
                but also drive results for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Get a Website Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View Our Portfolio</Link>
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

      {/* Our Web Development Approach */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Web Development Approach</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Digital Linked, we combine cutting-edge technology with creative design to deliver 
              web solutions that are perfectly aligned with your brand identity and business 
              objectives. Our process includes:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {[
                  "In-depth discovery and strategic planning",
                  "User-centric UX/UI design and prototyping",
                  "Agile development with best coding standards",
                  "Rigorous testing and quality assurance",
                  "SEO optimization and performance tuning",
                  "Ongoing support and maintenance options"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="btn-primary">
                  <Link href="/portfolio">View Our Portfolio</Link>
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

      {/* Types of Websites We Build */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Types of Websites We Build</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Stores",
                description: "Tailored solutions for e-commerce stores to achieve specific business outcomes.",
                icon: Globe,
                features: ["Payment Integration", "Inventory Management", "Customer Accounts", "Mobile Responsive"]
              },
              {
                title: "Corporate Websites",
                description: "Custom solutions for corporate websites to achieve specific business outcomes.",
                icon: Code,
                features: ["Professional Design", "CMS Integration", "SEO Optimized", "Analytics Setup"]
              },
              {
                title: "Portfolio Sites",
                description: "Tailored solutions for portfolio sites to achieve specific business outcomes.",
                icon: Palette,
                features: ["Gallery Management", "Contact Forms", "Social Integration", "Fast Loading"]
              },
              {
                title: "Landing Pages",
                description: "Tailored solutions for landing pages to achieve specific business outcomes.",
                icon: TrendingUp,
                features: ["Conversion Focused", "A/B Testing", "Lead Capture", "Analytics"]
              },
              {
                title: "Web Applications",
                description: "Custom solutions for web applications to achieve specific business outcomes.",
                icon: Zap,
                features: ["User Authentication", "Database Integration", "API Development", "Scalable Architecture"]
              },
              {
                title: "Blogs & Content Hubs",
                description: "Tailored solutions for blogs & content hubs to achieve specific business outcomes.",
                icon: Search,
                features: ["Content Management", "SEO Optimization", "Social Sharing", "Comment System"]
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

      {/* Ready to Build Your Online Presence */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Build Your Online Presence?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how we can create a website that sets 
            you apart.
          </p>
          <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
            Schedule a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say About Our Website Development Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Great experience working on our website development project! Highly recommend.",
                author: "John Doe",
                company: "TechCorp Solutions"
              },
              {
                rating: 4,
                text: "Very knowledgeable team. Our website development results were impressive.",
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
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions about Website Development</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a website development project?",
                answer: "Project timelines vary based on complexity, but most websites take 4-12 weeks from start to launch. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "How do you measure success for website development services?",
                answer: "We measure success through various metrics including page load speed, user engagement, conversion rates, search engine rankings, and overall user experience."
              },
              {
                question: "Can you integrate your website development solutions with our existing systems?",
                answer: "Yes, we specialize in creating websites that integrate seamlessly with your existing business systems, CRM, e-commerce platforms, and third-party services."
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
            <p className="text-muted-foreground">(More FAQs specific to website development will be added here)</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About Website Development</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in Website Development for 2024",
                description: "Discover the latest trends shaping the world of website development and how your business can benefit.",
                image: "600 × 400"
              },
              {
                title: "Maximizing ROI with Website Development",
                description: "Learn strategies to ensure your investment in website development delivers maximum returns.",
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
            <p className="text-muted-foreground">(More blog posts and resources related to website development will be featured here. Blog functionality to be implemented.)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
