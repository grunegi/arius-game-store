export default function robots() {
  const baseUrl = 'https://arius.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products/',
          '/categories/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/cart',
          '/checkout',
          '/account',
          '/login',
          '/register',
          '/search',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.js`,
    host: baseUrl,
  };
}
