module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: false,
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/auth/signin': ['signin']
  },
};