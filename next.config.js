/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  skipTrailingSlashRedirect: true,
  // skipTrailingSlashRedirect: true,
  trailingSlash: true,
  output: "export",
};

module.exports = nextConfig;
