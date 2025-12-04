"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState("");

  // Cargar productos desde el backend
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos. Intenta más tarde.");
      }
    };

    cargarProductos();
  }, []);

  // Cargar carrito inicial desde localStorage ("cart" como en Ofertas / Navbar)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const almacenado = localStorage.getItem("cart");
      if (almacenado) {
        setCarrito(JSON.parse(almacenado));
      }
    } catch (e) {
      console.error("Error al leer carrito de localStorage", e);
    }
  }, []);

  // Añadir producto al carrito (mismo estilo que OfertasPage)
  const agregarAlCarrito = (producto) => {
    if (typeof window === "undefined") return;

    setCarrito((carritoActual) => {
      const copia = [...carritoActual];

      // En productos del backend tenemos ID, lo usamos para identificar
      const indice = copia.findIndex((p) => p.id === producto.id);

      if (indice >= 0) {
        copia[indice] = {
          ...copia[indice],
          cantidad: (copia[indice].cantidad || 1) + 1,
        };
      } else {
        copia.push({
          ...producto,
          cantidad: 1, // precio normal (no hay descuento aquí)
        });
      }

      // Guardar en localStorage con la misma KEY que Ofertas y Cart
      localStorage.setItem("cart", JSON.stringify(copia));

      // Notificar al Navbar igual que en Ofertas
      window.dispatchEvent(new Event("storage"));

      alert(`${producto.nombre} fue añadido al carrito 🛒`);
      return copia;
    });
  };

  const totalItems = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Productos</h2>
          <span className="badge bg-primary">
            En carrito: {totalItems} producto(s)
          </span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {productos.length === 0 && !error && (
            <p>No hay productos disponibles.</p>
          )}

          {productos.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            >
              <ProductCard producto={p} onAgregar={agregarAlCarrito} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
