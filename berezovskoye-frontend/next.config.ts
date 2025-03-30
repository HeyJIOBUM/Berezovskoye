import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // To add support for Docker to an existing project
    // https://github.com/vercel/next.js/tree/canary/examples/with-docker
    output: "standalone",
};

export default nextConfig;
