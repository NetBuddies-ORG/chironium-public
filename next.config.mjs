/** @type {import('next').NextConfig} */
import { withBotId } from 'botid/next/config';

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Enable as needed
    },
};

export default withBotId(nextConfig);
