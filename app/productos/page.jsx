// app/productos/page.jsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        setError("");
        const data = await obtenerProductos();
        // asumimos que 'data' es un array de productos
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      }
    };

    cargar();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1>Productos</h1>

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
            <div key={p.id} className="col-md-4 mb-3">
              {/* ProductCard debe aceptar prop 'producto' */}
              <ProductCard producto={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
