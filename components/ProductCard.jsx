"use client";

import Image from "next/image";

function getImageSrc(producto) {
  if (producto.imagen) {
    if (producto.imagen.startsWith("http")) {
      return producto.imagen;
    }
    return producto.imagen.startsWith("/")
      ? producto.imagen
      : `/${producto.imagen}`;
  }

  return "/images/default.png";
}

export default function ProductCard({ producto, onAgregar }) {
  const src = getImageSrc(producto);

  return (
    <div className="card h-100 shadow-sm">
      {/* IMAGEN */}
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

      {/* CUERPO DEL CARD */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>

        <p className="card-text text-muted small">
          {producto.descripcion ?? "Sin descripción disponible"}
        </p>

        <p className="card-text fw-bold fs-5">${producto.precio}</p>

        {/* BOTÓN AÑADIR AL CARRITO – dentro del grid, responsivo */}
        <button
          className="btn btn-success mt-auto w-100"
          onClick={() => onAgregar && onAgregar(producto)}
        >
          Añadir al carrito 🛒
        </button>
      </div>
    </div>
  );
}
