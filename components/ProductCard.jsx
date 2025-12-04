"use client";

import Image from "next/image";

function getImageSrc(producto) {
  // Si el producto tiene un campo 'imagen' en la BD
  if (producto.imagen) {
    // Si ya viene como URL absoluta (http/https), la usamos tal cual
    if (producto.imagen.startsWith("http")) {
      return producto.imagen;
    }
    // Si viene como 'images/peluches/...' la convertimos a '/images/peluches/...'
    const path = producto.imagen.startsWith("/")
      ? producto.imagen
      : `/${producto.imagen}`;
    return path;
  }

  // Imagen por defecto si no hay nada en BD
  return "/images/default.png";
}

export default function ProductCard({ producto }) {
  const src = getImageSrc(producto);
  const descripcion =
    producto.descripcion && producto.descripcion.trim().length > 0
      ? producto.descripcion
      : "Sin descripción disponible.";

  return (
    <div className="card h-100">
      <div
        className="card-img-top"
        style={{ position: "relative", width: "100%", height: "220px" }}
      >
        <Image
          src={src}
          alt={producto.nombre}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text fw-bold">${producto.precio}</p>
      </div>
    </div>
  );
}
