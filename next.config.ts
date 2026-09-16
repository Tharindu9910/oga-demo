import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Lets phones/tablets on the same LAN load dev JS bundles when testing via
  // the "Network" URL `next dev` prints (e.g. http://192.168.x.x:3000) —
  // Next.js blocks cross-origin dev asset requests by default, which leaves
  // the page looking fully rendered but with no client JS hydrated.
  allowedDevOrigins: ['192.168.100.91'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
