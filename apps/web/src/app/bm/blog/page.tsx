import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, Search, Calendar, Clock, Eye, User, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxHero } from "@/components/parallax-hero";
import { HoverCard } from "@/components/hover-card";
import { createClient } from '@supabase/supabase-js';
import { LocalizedLink } from "@/lib/i18n/link";

export default async function BlogPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch published blog posts from Supabase
  const { data: blogPosts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  const posts = blogPosts || [];
  const featuredArticles = posts.filter(post => post.featured).slice(0, 2);
  const latestArticles = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Blog Kami</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Pandangan, berita, dan artikel dari pasukan Newy Enterprise. Terokai topik mengenai inovasi digital, 
                trend teknologi, dan strategi pertumbuhan perniagaan.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    className="w-full pl-10 pr-4 py-3 bg-background/50 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <MagneticButton variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                  Semua Kategori
                </MagneticButton>
                {["Automasi AI", "Reka Bentuk Web", "Aplikasi Mudah Alih", "Pemasaran Digital"].map((category) => (
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
              <h2 className="text-4xl font-bold font-display mb-4">Artikel Pilihan</h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.length > 0 ? (
                featuredArticles.map((article) => (
                  <LocalizedLink key={article.id} href={`/blog/${article.slug}`}>
                    <HoverCard className="group border-purple-500/20 hover:border-purple-500/40 overflow-hidden cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-b border-purple-500/20 flex items-center justify-center relative">
                        <div className="text-2xl font-bold text-muted-foreground/30">600 × 400</div>
                        <Badge className="absolute top-4 left-4 bg-purple-500 text-white">Pilihan</Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.published_at || article.created_at).toLocaleDateString('ms-MY')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.read_time || 5} min baca
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views || 0} tontonan
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-400 transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-4">
                          {article.category && (
                            <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                              {article.category}
                            </Badge>
                          )}
                          {article.tags && article.tags.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <MagneticButton variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                          Baca Lagi <ArrowRight className="ml-1 h-4 w-4" />
                        </MagneticButton>
                      </CardContent>
                    </HoverCard>
                  </LocalizedLink>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg">Tiada artikel pilihan pada masa ini. Sila kembali tidak lama lagi!</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold font-display">Artikel Terkini</h2>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                {latestArticles.length} artikel
              </Badge>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.length > 0 ? (
                latestArticles.map((article) => (
                  <LocalizedLink key={article.id} href={`/blog/${article.slug}`}>
                    <HoverCard className="group border-purple-500/20 hover:border-purple-500/40 overflow-hidden cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-b border-purple-500/20 flex items-center justify-center">
                        <div className="text-xl font-bold text-muted-foreground/30">600 × 400</div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.published_at || article.created_at).toLocaleDateString('ms-MY')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.read_time || 5} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views || 0}
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-400 transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.excerpt}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-3">
                          {article.category && (
                            <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                              {article.category}
                            </Badge>
                          )}
                          {article.tags && article.tags.slice(0, 1).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <MagneticButton variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                          Baca Lagi <ArrowRight className="ml-1 h-4 w-4" />
                        </MagneticButton>
                      </CardContent>
                    </HoverCard>
                  </LocalizedLink>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground text-lg">Tiada artikel pada masa ini. Sila kembali tidak lama lagi!</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold font-display mb-4">Ingin Membincangkan Topik Ini Lebih Lanjut?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pasukan kami sentiasa bersedia untuk berbincang tentang bagaimana pandangan ini boleh digunakan untuk 
              perniagaan anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                <LocalizedLink href="/contact">Hubungi Kami</LocalizedLink>
              </MagneticButton>
              <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                <LocalizedLink href="/pricing">Dapatkan Sebut Harga</LocalizedLink>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Note about dynamic content */}
      <section className="py-12 bg-muted/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            <strong>Nota:</strong> Ini adalah pratonton statik halaman blog. Dalam pelaksanaan penuh, 
            artikel akan dimuatkan secara dinamik dari pangkalan data Supabase, dengan fungsi carian, penapisan, 
            dan paginasi penuh. Halaman artikel individu juga akan dicipta dengan paparan kandungan penuh.
          </p>
        </div>
      </section>
    </div>
  );
}


