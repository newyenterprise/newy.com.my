import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Search, Calendar, Clock, Eye, User, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxHero } from "@/components/parallax-hero";
import { HoverCard } from "@/components/hover-card";

export default function BlogPage() {
  // Sample blog data - in a real app, this would come from Supabase
  const featuredArticles = [
    {
      id: 1,
      title: "Understanding AI Automation: A Beginner's Guide",
      excerpt: "Dive into the world of AI automation and discover how it can transform your business processes, improve efficiency, and drive growth.",
      category: "AI Automation",
      tags: ["AI", "Automation", "Business Process"],
      readTime: 8,
      views: 234,
      publishedAt: "Jan 15, 2024",
      featured: true,
      image: "600 × 400"
    },
    {
      id: 2,
      title: "Top 5 Web Design Trends to Watch in 2024",
      excerpt: "Explore the cutting-edge web design trends that are shaping user experiences. From immersive 3D visuals to minimalist aesthetics.",
      category: "Web Design",
      tags: ["Web Design", "UX/UI", "Trends"],
      readTime: 6,
      views: 189,
      publishedAt: "Jan 16, 2024",
      featured: true,
      image: "600 × 400"
    }
  ];

  const latestArticles = [
    {
      id: 1,
      title: "Understanding AI Automation: A Beginner's Guide",
      excerpt: "Dive into the world of AI automation and discover how it can transform your business processes, improve efficiency, and drive growth.",
      category: "AI Automation",
      tags: ["AI", "Automation"],
      readTime: 8,
      views: 234,
      publishedAt: "Jan 15, 2024",
      image: "600 × 400"
    },
    {
      id: 2,
      title: "Top 5 Web Design Trends to Watch in 2024",
      excerpt: "Explore the cutting-edge web design trends that are shaping user experiences. From immersive 3D visuals to minimalist aesthetics.",
      category: "Web Design",
      tags: ["Web Design", "UX/UI"],
      readTime: 6,
      views: 189,
      publishedAt: "Jan 16, 2024",
      image: "600 × 400"
    },
    {
      id: 3,
      title: "Mobile App vs. PWA: Which is Right for Your Business?",
      excerpt: "Explore the pros and cons of native mobile apps versus Progressive Web Apps (PWAs) to make an informed decision for your business.",
      category: "Mobile Apps",
      tags: ["Mobile Apps", "PWA"],
      readTime: 7,
      views: 156,
      publishedAt: "Jan 18, 2024",
      image: "600 × 400"
    },
    {
      id: 4,
      title: "SEO Essentials for Startups: Boosting Your Online Visibility",
      excerpt: "Learn the fundamental SEO strategies that can help your startup gain traction and attract organic traffic without breaking the bank.",
      category: "Digital Marketing",
      tags: ["SEO", "Startups"],
      readTime: 10,
      views: 312,
      publishedAt: "Jan 19, 2024",
      image: "600 × 400"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero className="relative py-24 bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Our Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Insights, news, and articles from the Digital Linked team. Explore topics on digital 
                innovation, technology trends, and business growth strategies.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 bg-background/50 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <MagneticButton variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                  All Categories
                </MagneticButton>
                {["AI Automation", "Web Design", "Mobile Apps", "Digital Marketing"].map((category) => (
                  <MagneticButton key={category} variant="ghost" size="sm" className="text-muted-foreground hover:text-purple-300">
                    {category}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxHero>

      {/* Featured Articles */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">Featured Articles</h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <HoverCard key={article.id} className="group border-purple-500/20 hover:border-purple-500/40 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-b border-purple-500/20 flex items-center justify-center relative">
                    <div className="text-2xl font-bold text-muted-foreground/30">{article.image}</div>
                    <Badge className="absolute top-4 left-4 bg-purple-500 text-white">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime} min read
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views} views
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-400 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        {article.category}
                      </Badge>
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MagneticButton variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </MagneticButton>
                  </CardContent>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold font-display">Latest Articles</h2>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                4 articles
              </Badge>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <HoverCard key={article.id} className="group border-purple-500/20 hover:border-purple-500/40 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-b border-purple-500/20 flex items-center justify-center">
                    <div className="text-xl font-bold text-muted-foreground/30">{article.image}</div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-purple-400 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                        {article.category}
                      </Badge>
                      {article.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MagneticButton variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </MagneticButton>
                  </CardContent>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold font-display mb-4">Want to Discuss These Topics Further?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team is always ready to chat about how these insights can apply to 
              your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                <Link href="/contact">Get In Touch</Link>
              </MagneticButton>
              <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4">
                Get a Quote
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Note about dynamic content */}
      <section className="py-12 bg-muted/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            <strong>Note:</strong> This is a static preview of the blog page. In the full implementation, 
            articles will be dynamically loaded from the Supabase database, with full search, filtering, 
            and pagination functionality. Individual article pages will also be created with full content display.
          </p>
        </div>
      </section>
    </div>
  );
}
