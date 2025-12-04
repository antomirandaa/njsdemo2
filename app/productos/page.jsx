"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/services/api";

export default function ProductosPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        setError("");
        const data = await obtenerProductos();
        setProductos(data);
        if (data.length > 0 && categoriaSeleccionada === null) {
          setCategoriaSeleccionada(data[0].categoriaId || 1);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos desde el servidor.");
      }
    };
    cargar();
  }, [categoriaSeleccionada]);

  const categorias = [
    ...new Set(productos.map((p) => p.categoriaId || p.categoria || 1)),
  ];

  const productosFiltrados =
    categoriaSeleccionada === null
      ? productos
      : productos.filter(
          (p) =>
            (p.categoriaId || p.categoria || 1) === categoriaSeleccionada
        );

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Nuestros productos</h2>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {/* Selector de categorías */}
        <div className="d-flex justify-content-center mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`btn mx-2 ${
                categoriaSeleccionada === cat
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              Categoría {cat}
            </button>
          ))}
        </div>

        {/* Grid productos */}
        <div className="row">
          {productosFiltrados.map((producto) => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <ProductCard producto={producto} />
            </div>
          ))}
          {productosFiltrados.length === 0 && (
            <p className="text-center">
              No hay productos disponibles para esta categoría.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
