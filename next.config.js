/** @type {import('next').NextConfig} */
const nextConfig = {
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
