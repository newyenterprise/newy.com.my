/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://newy.com.my',
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
      'https://newy.com.my/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/dashboard/*', '/auth/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

}

