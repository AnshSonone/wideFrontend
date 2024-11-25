/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    // async rewrites() {
    //   return [
    //     {
    //       source: '/',
    //       destination: 'http://localhost:8000/', // The :path parameter is used here so will not be automatically passed in the query
    //     },
    //   ]
    // },
    images: {
      domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
