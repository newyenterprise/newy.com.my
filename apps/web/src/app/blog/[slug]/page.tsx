import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@newy/ui"
import { ArrowLeft, Calendar, Clock, Eye, Tag, Share2, Twitter, Linkedin, Facebook } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, content, category, tags, featured_image, published_at, read_time')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const description = post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const ogImage = post.featured_image || 'https://newy.com.my/og-image.jpg';

  return {
    title: post.title,
    description,
    keywords: post.tags?.join(', ') || '',
    authors: [{ name: 'Newy Enterprise' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.published_at,
      authors: ['Newy Enterprise'],
      tags: post.tags || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  }
}

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) {
    notFound()
  }

  // Increment view count
  await supabase
    .from('blog_posts')
    .update({ views: (post.views || 0) + 1 })
    .eq('id', post.id)

  const shareUrl = `https://newy.com.my/blog/${post.slug}`;
  const shareTitle = post.title;

  // Structured Data for Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || "",
    "image": post.featured_image || "https://newy.com.my/og-image.jpg",
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": "Newy Enterprise",
      "url": "https://newy.com.my"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Newy Enterprise",
      "logo": {
        "@type": "ImageObject",
        "url": "https://newy.com.my/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "keywords": post.tags?.join(', ') || '',
    "articleSection": post.category || 'Technology',
    "wordCount": post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0,
    "timeRequired": post.read_time ? `PT${post.read_time}M` : undefined
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-purple-900/5 to-background">
      {/* Back to blog */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/blog">
          <Button variant="ghost" className="hover:bg-purple-500/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="container mx-auto px-4 mb-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-purple-500/20">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Container */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
              {post.category && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {post.category}
                </Badge>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {post.read_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </div>
              )}
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views || 0} views
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight gradient-text">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="border-purple-500/30 text-purple-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-purple-500/20">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-purple-400" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-purple-400" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-purple-400" />
              </a>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-readable prose-lg md:prose-xl dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-purple-200
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-purple-300
              prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-gray-200
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-em:text-gray-300
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500/50 prose-blockquote:bg-purple-900/10 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300
              prose-code:bg-purple-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-purple-300 prose-code:text-base
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-purple-500/20 prose-pre:text-gray-200
              prose-ul:my-6 prose-ul:text-gray-200 prose-ol:my-6 prose-ol:text-gray-200
              prose-li:my-3 prose-li:leading-[1.8]
              prose-img:rounded-xl prose-img:border prose-img:border-purple-500/20 prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to transform your digital presence?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Let's discuss how we can help bring your ideas to life with cutting-edge web development, 
              AI automation, and digital marketing solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="btn-primary">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="btn-outline">
                  Instant Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* This would be populated with related articles based on category/tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More from Newy Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Check out our other articles about web development, AI automation, and digital marketing.
              </p>
              <Link href="/blog">
                <Button className="mt-4">View All Articles</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      </div>
    </>
  )
}
