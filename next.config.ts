import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["*.localhost", "firebasestorage.googleapis.com"], // Allow all subdomains of localhost
    },
};

export default nextConfig;
