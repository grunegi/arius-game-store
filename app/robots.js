export default function robots() {
  const baseUrl = 'https://arius.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/games/',
          '/categories/',
        ],
        disallow: [
          '/admin/',
          '/js/',
          '/cart',
          '/profile',
          '/login',
          '/register',
          '/components',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.js`,
    host: baseUrl,
  };
}
