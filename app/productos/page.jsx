"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState("");

  // Cargar productos del backend
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setError("");
        const data = await obtenerProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      }
    };

    cargarProductos();
  }, []);

  // Cargar carrito desde localStorage al montar
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

  // Añadir un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const copia = [...carritoActual];
      const indice = copia.findIndex((p) => p.id === producto.id);

      if (indice >= 0) {
        copia[indice] = {
          ...copia[indice],
          cantidad: (copia[indice].cantidad || 1) + 1,
        };
      } else {
        copia.push({ ...producto, cantidad: 1 });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(copia));
        // Notificar a Navbar y otras páginas
        window.dispatchEvent(new Event("cart-updated"));
      }

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

      <div className="container my-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
          <h2 className="mb-0">Todos los productos</h2>
          <span className="badge bg-success">
            En carrito: {totalItems} producto{totalItems === 1 ? "" : "s"}
          </span>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          {productos.length === 0 && !error && (
            <p>No hay productos disponibles.</p>
          )}

          {productos.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
            >
              <ProductCard producto={p} onAgregar={agregarAlCarrito} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
