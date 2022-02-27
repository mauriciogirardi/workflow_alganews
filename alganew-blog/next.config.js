/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "storage.googleapis.com",
            "localhost"
        ]
    }
}

module.exports = nextConfig
