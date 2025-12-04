// app/productos/page.jsx
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { listarProductos } from "@/services/api";

export default function ProductosPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(1);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        setError("");
        const data = await obtenerProductos();
        // Aquí asumimos que el backend devuelve un array de productos
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      }
    };
    cargar();
  }, []);

  const productosFiltrados =
    productos && productos.length > 0
      ? productos.filter(
          (p) =>
            // asumimos que el backend expone un campo categoriaId
            (p.categoriaId || 1) === categoriaSeleccionada
        )
      : [];

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Nuestros productos</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Selector de categorías */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group" role="group">
            <button
              className={`btn mx-2 ${
                categoriaSeleccionada === 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(1)}
            >
              Peluches temáticos
            </button>
            <button
              className={`btn mx-2 ${
                categoriaSeleccionada === 2
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(2)}
            >
              Nintendo
            </button>
            <button
              className={`btn mx-2 ${
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

        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (
              <div key={prod.id} className="col-6 col-md-3">
                {/* ProductCard espera: { nombre, precio, imagen } */}
                <ProductCard
                  producto={{
                    nombre: prod.nombre,
                    precio: prod.precio,
                    imagen: prod.imagen || "/images/placeholder.png",
                  }}
                />
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
