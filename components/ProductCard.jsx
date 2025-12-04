"use client";

import Image from "next/image";

// Función para obtener la ruta correcta de la imagen
function getImageSrc(producto) {
  if (producto.imagen) {
    // Si viene como URL absoluta (http/https)
    if (producto.imagen.startsWith("http")) {
      return producto.imagen;
    }

    // Si viene como ruta relativa desde BD (images/...)
    return producto.imagen.startsWith("/")
      ? producto.imagen
      : `/${producto.imagen}`;
  }

  // Imagen por defecto si no existe la imagen en BD
  return "/images/default.png";
}

export default function ProductCard({ producto }) {
  const src = getImageSrc(producto);

  // Función para agregar productos al carrito usando localStorage
  const agregarAlCarrito = () => {
    let carrito = [];

    if (typeof window !== "undefined") {
      const almacenado = localStorage.getItem("carrito");
      carrito = almacenado ? JSON.parse(almacenado) : [];
    }

    const existente = carrito.find((p) => p.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    alert(`${producto.nombre} fue agregado al carrito 🛒`);
  };

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

        {/* BOTÓN DE CARRITO — RESPONSIVO, FULL WIDTH */}
        <button
          className="btn btn-success mt-auto w-100"
          onClick={agregarAlCarrito}
        >
          Añadir al carrito 🛒
        </button>
      </div>
    </div>
  );
}
