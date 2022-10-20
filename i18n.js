module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: false,
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/auth/signin': ['signin'],
    '/admin/forum/categories': ['adminCategories'],
    '/admin/forum/categories/create': ['adminCategories'],
  },
};