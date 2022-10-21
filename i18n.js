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
    '/admin/forum/categories/[id]': ['adminCategories'],
    '/admin/forum/sub-categories/create': ['adminSubCategories'], 
    '/admin/forum/sub-categories/[id]': ['adminSubCategories'],
  },
};