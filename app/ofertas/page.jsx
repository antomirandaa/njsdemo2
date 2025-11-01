"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { ofertas } from "@/data/ofertas";
import Image from "next/image";

export default function OfertasPage() {
  const [productosConDescuento, setProductosConDescuento] = useState([]);
  const [agregados, setAgregados] = useState({}); // guarda qué producto fue agregado

  // Generar descuentos aleatorios (25% - 50%)
  useEffect(() => {
    const productos = ofertas.map((p) => {
      const descuento = Math.floor(Math.random() * (50 - 25 + 1)) + 25; // entre 25 y 50%
      const precioNuevo = Math.round(p.precio * (1 - descuento / 100));

      return {
        ...p,
        descuento,
        precioAnterior: p.precio,
        precioNuevo,
      };
    });

    setProductosConDescuento(productos);
  }, []);

  // Agregar producto al carrito
  const addToCart = (producto) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = cart.find((item) => item.nombre === producto.nombre);

    if (found) {
      found.cantidad += 1;
    } else {
      cart.push({
        ...producto,
        cantidad: 1,
        precio: producto.precioNuevo, // ✅ usa el precio con descuento
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // actualiza Navbar

    // Mostrar mensaje "Agregado" temporalmente
    setAgregados((prev) => ({ ...prev, [producto.nombre]: true }));
    setTimeout(() => {
      setAgregados((prev) => ({ ...prev, [producto.nombre]: false }));
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4 text-danger">
          🎉 Ofertas Especiales 🎉
        </h2>

        <div className="row g-4">
          {productosConDescuento.map((prod, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="card text-center h-100 border-danger shadow-sm">
                <Image
                  src={`/${prod.imagen}`}
                  alt={prod.nombre}
                  width={200}
                  height={200}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.nombre}</h5>

                  {/* Precios */}
                  <p className="card-text mb-1 text-muted text-decoration-line-through">
                    ${prod.precioAnterior.toLocaleString()}
                  </p>
                  <p className="card-text fw-bold text-success">
                    ${prod.precioNuevo.toLocaleString()} (-{prod.descuento}%)
                  </p>

                  {/* Botón de agregar con confirmación */}
                  <button
                    className={`btn ${
                      agregados[prod.nombre] ? "btn-success" : "btn-danger"
                    }`}
                    onClick={() => addToCart(prod)}
                    disabled={agregados[prod.nombre]} // deshabilita temporalmente
                  >
                    {agregados[prod.nombre]
                      ? "¡Agregado!"
                      : "🛒 Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
