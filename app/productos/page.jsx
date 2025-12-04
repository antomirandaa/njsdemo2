"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState("");

  // Cargar productos
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
    const almacenado = localStorage.getItem("carrito");
    if (almacenado) {
      try {
        setCarrito(JSON.parse(almacenado));
      } catch (e) {
        console.error("Error al leer carrito de localStorage", e);
      }
    }
  }, []);

  // Función para añadir al carrito
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
        localStorage.setItem("carrito", JSON.stringify(copia));
      }

      // Mensaje simple para verificar que funciona
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
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <ProductCard producto={p} onAgregar={agregarAlCarrito} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
