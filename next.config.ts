import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ripley.cl", // Añade el dominio de donde provienen las imágenes
        port: "", //https://rimage.ripley.cl/home.ripley/Attachment/MKP/9567/MPM10001713603/full_image-1
        pathname:
          "/home.ripley/Attachment/MKP/9567/MPM10001713603/full_image-1", // Opcional: especifica una ruta específica
      },
    ],
  },
};

export default nextConfig;
