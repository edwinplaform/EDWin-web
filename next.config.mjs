/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: 'https',
                hostname: "img.clerk.com",
            },
            {
                protocol: 'https',
                hostname: "yhymeplupvqgrlndemyj.supabase.co",
            }
        ],
    },
};

export default nextConfig;
