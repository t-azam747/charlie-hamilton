/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        /*
          Maybourne media library — used if you reference
          their images directly (e.g. during development)
        */
        protocol: 'https',
        hostname: 'library.maybourne.com',
      },
      {
        /*
          Unsplash — for placeholder images during development.
          Remove this once your client's real photos are in /public/images/
        */
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Placeholder for development images
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig