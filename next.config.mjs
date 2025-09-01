/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// next.config.ts
import { withPWA } from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
import { withPWA } from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
}

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  }
})
module.exports = withPWA({
  reactStrictMode: true,
});
import { withPWA } from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
