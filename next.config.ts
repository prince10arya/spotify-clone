import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns: [{
        protocol: 'https',
        hostname: 'cppisrduxndclpgicsra.supabase.co',
        pathname: '/storage/v1/object/public/**',
      
    },]
  }
};

export default nextConfig;
