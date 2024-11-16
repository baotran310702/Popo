const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.alias['@content_images'] = path.join(__dirname, 'public/content_images');
    return config;
  },
}

module.exports = nextConfig 