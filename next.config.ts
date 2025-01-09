/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //cloudinary haricindekiler kaldırılacak.
    domains: ['res.cloudinary.com', 'tailwindui.com', 'static.vecteezy.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
