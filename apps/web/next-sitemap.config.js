/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://digitallinked.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/auth/'],
      },
    ],
    additionalSitemaps: [
      'https://digitallinked.com.au/sitemap.xml',
      'https://digitallinked.com.au/blog-sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/dashboard/*', '/auth/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Add dynamic sitemap generation for blog posts
  additionalPaths: async (config) => {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    try {
      // Fetch published blog posts
      const { data: blogPosts, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts for sitemap:', error);
        return [];
      }

      // Convert blog posts to sitemap entries
      return blogPosts.map((post) => ({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.updated_at || post.published_at,
      }));
    } catch (error) {
      console.error('Error generating blog sitemap:', error);
      return [];
    }
  },
}

