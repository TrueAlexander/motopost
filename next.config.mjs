/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["unsplash.com", "plus.unsplash.com","images.unsplash.com", "res.cloudinary.com"],
    // path: 'https://res.cloudinary.com/dottd6gmb/',
    // loader: 'cloudinary',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**', // Match any path
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Match any path
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**', // Match any path
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Match any path
      },
    ],
  }
}

export default nextConfig;

