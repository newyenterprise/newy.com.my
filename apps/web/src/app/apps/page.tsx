import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield } from "lucide-react";

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Innovative App Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We build custom mobile and web applications that engage users, solve problems, and 
                drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Discuss Your App Idea
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">See App Projects</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center max-w-sm mx-auto">
                <div className="text-4xl font-bold text-muted-foreground/30">600 × 450</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our App Development Expertise */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our App Development Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in creating a wide range of applications, from sophisticated enterprise 
              solutions to engaging consumer apps. Our services include:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Native iOS & Android App Development",
                "Cross-Platform App Development (React Native, Flutter)",
                "Progressive Web App (PWA) Development",
                "Backend Development & API Integration",
                "UI/UX Design for Engaging Experiences",
                "App Store Submission & Post-Launch Support"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <Button asChild className="btn-primary">
                  <Link href="/portfolio">See App Projects</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center max-w-sm mx-auto">
                <div className="text-4xl font-bold text-muted-foreground/30">600 × 450</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies We Master */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Technologies We Master</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
            {[
              "Swift", "Kotlin", "React Native", "Flutter", "Node.js", "Python", "Firebase", "AWS"
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-2 border border-purple-500/20">
                  <Code className="h-8 w-8 text-purple-400" />
                </div>
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transform Your Idea Into a Reality */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Transform Your Idea Into a Reality</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have an app idea? Let's collaborate to bring it to life.
          </p>
          <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
            Get a Free App Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say About Our App Development Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Great experience working on our app development project! Highly recommend.",
                author: "John Doe",
                company: "TechCorp Solutions"
              },
              {
                rating: 4,
                text: "Very knowledgeable team. Our app development results were impressive.",
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
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions about App Development</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a app development project?",
                answer: "App development timelines vary based on complexity and features. Simple apps take 8-12 weeks, while complex enterprise apps can take 4-6 months. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "How do you measure success for app development services?",
                answer: "We measure success through user engagement metrics, app store ratings, download numbers, user retention rates, and achievement of your specific business objectives."
              },
              {
                question: "Can you integrate your app development solutions with our existing systems?",
                answer: "Absolutely! We specialize in creating apps that integrate seamlessly with your existing business systems, APIs, databases, and third-party services."
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
            <p className="text-muted-foreground">(More FAQs specific to app development will be added here)</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About App Development</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in App Development for 2024",
                description: "Discover the latest trends shaping the world of app development and how your business can benefit.",
                image: "600 × 400"
              },
              {
                title: "Maximizing ROI with App Development",
                description: "Learn strategies to ensure your investment in app development delivers maximum returns.",
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
            <p className="text-muted-foreground">(More blog posts and resources related to app development will be featured here. Blog functionality to be implemented.)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
