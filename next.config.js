/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  reactStrictMode: true,
  // Add more custom Next.js configuration here
};

module.exports = withTM(nextConfig);
