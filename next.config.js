/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "lh3.googleusercontent.com" },
            { hostname: "uploadthing.com" },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
