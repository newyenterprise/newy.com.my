import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function blogSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://digitallinked.com.au'
  
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at, title')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error)
      return []
    }

    if (!posts) {
      return []
    }

    return posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return []
  }
}
