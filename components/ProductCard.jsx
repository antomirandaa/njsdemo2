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
        className="card-img-top position-relative"
        style={{ width: "100%", height: "220px" }}
      >
        <Image
          src={src}
          alt={producto.nombre}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 200px"
        />
      </div>

      {/* CUERPO DEL CARD */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>

        <p className="card-text text-muted small">
          {producto.descripcion ?? "Sin descripción disponible"}
        </p>

        <p className="card-text fw-bold fs-5 mb-3">${producto.precio}</p>

        {/* BOTÓN AÑADIR AL CARRITO – dentro del grid, responsivo */}
        <button
          type="button"
          className="btn btn-success mt-auto w-100"
          onClick={() => onAgregar?.(producto)}
        >
          Añadir al carrito 🛒
        </button>
      </div>
    </div>
  );
}
