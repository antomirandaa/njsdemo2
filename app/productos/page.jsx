"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState("");

  // 1) Cargar productos desde el backend
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

  // 2) Cargar carrito inicial desde localStorage ("cart") solo una vez
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("cart");
      setCarrito(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.error("Error al leer carrito de localStorage", e);
    }
  }, []);

  // 3) Cada vez que cambie `carrito`, sincronizar con localStorage
  //    y avisar al Navbar DESPUÉS del render (evita el error de React)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("cart", JSON.stringify(carrito));
      // Eventos que escucha el Navbar
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      console.error("Error al guardar carrito en localStorage", e);
    }
  }, [carrito]);

  // 4) Agregar producto al carrito (solo actualiza el estado local)
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

      // No tocamos localStorage aquí, solo devolvemos el nuevo array
      return copia;
    });

    alert(`${producto.nombre} fue añadido al carrito 🛒`);
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
          <h1>Productos</h1>
          <span className="badge bg-primary fs-6">
            Carrito: {totalItems} item(s)
          </span>
        </div>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        <div className="row mt-3">
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
