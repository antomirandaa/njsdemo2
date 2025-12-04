// app/productos/page.js
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";

export default function ProductosPage() {
  // Estado para la categoría seleccionada (por defecto 1)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(1);

  // Filtrar productos según la categoría
  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoriaSeleccionada
  );

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Nuestros Productos</h2>

        {/* 🔸 Selector de categorías */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group" role="group">
            <button
              className={`btn ${
                categoriaSeleccionada === 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(1)}
            >
              Animales
            </button>
            <button
              className={`btn ${
                categoriaSeleccionada === 2
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(2)}
            >
              Nintendo
            </button>
            <button
              className={`btn ${
                categoriaSeleccionada === 3
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(3)}
            >
              BTR
            </button>
          </div>
        </div>

        {/* 🔹 Productos filtrados */}
        <div className="row g-4">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod, i) => (
              <div key={i} className="col-6 col-md-3">
                <ProductCard producto={prod} />
              </div>
            ))
          ) : (
            <p className="text-center">No hay productos en esta categoría.</p>
          )}
        </div>
      </div>
    </>
  );
}
