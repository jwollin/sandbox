import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: false,
  },
  experimental: {
    swcPlugins: [],
  },
};

export default nextConfig;
