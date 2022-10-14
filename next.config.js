/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    //domains: ['cdn.paris.fr'],
  },
  experimental: {
    scrollRestoration: true,
    images: { allowFutureImage: true }
  }
})

module.exports = nextConfig
