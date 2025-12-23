const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  const baseUrl = process.env.SITE_URL || 'https://newy.com.my';
  
  // Static pages - English (root level, no prefix)
  const staticPagesEN = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-automation`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/website`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Static pages - Bahasa Malaysia (with /bm prefix)
  const staticPagesBM = staticPagesEN.map(page => ({
    ...page,
    url: page.url === baseUrl ? `${baseUrl}/bm` : `${baseUrl}/bm${page.url.replace(baseUrl, '')}`,
  }));

  // Dynamic blog posts
  let blogPosts = [];
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (!error && posts) {
        // English blog posts
        const blogPostsEN = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.published_at || new Date()).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
        
        // Bahasa Malaysia blog posts
        const blogPostsBM = posts.map((post) => ({
          url: `${baseUrl}/bm/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.published_at || new Date()).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
        
        blogPosts = [...blogPostsEN, ...blogPostsBM];
      }
    } else {
      console.warn('Supabase credentials not found. Skipping blog posts in sitemap.');
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Combine all pages (English + Bahasa Malaysia)
  const allPages = [...staticPagesEN, ...staticPagesBM, ...blogPosts];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public folder
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
  console.log(`   Total URLs: ${allPages.length}`);
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});


