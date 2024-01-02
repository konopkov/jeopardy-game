/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["joesch.moe"],
  },
  compress: false,
  output: "standalone",
};

module.exports = nextConfig;
