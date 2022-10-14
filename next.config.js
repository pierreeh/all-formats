/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
