/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://digitallinked.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
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
    ],
  },
  exclude: ['/admin/*', '/dashboard/*', '/auth/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
