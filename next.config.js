/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  env: {
    // Proměnné prostředí, které budou dostupné v prohlížeči
    SITE_NAME: 'Street Cup 2025',
  },
}

module.exports = nextConfig 