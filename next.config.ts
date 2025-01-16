import path from 'path'; 

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // İzin verilen alan adları
    domains: ['res.cloudinary.com', 'tailwindui.com', 'static.vecteezy.com', 'images.unsplash.com'],
  },
  webpack: (config:any) => {
    config.resolve.alias['generatedWidgets'] = path.resolve(__dirname, 'app/widgets/generated');
    return config;
  },
};

module.exports = nextConfig;
