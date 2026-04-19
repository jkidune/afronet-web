/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afronet.bio',
        pathname: '/wp-content/uploads/**',
      },
      {
        // WordPress Gravatar avatars for author images
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        // Gravatar (non-secure)
        protocol: 'https',
        hostname: '*.gravatar.com',
      },
    ],
  },
};

module.exports = nextConfig;