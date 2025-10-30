// app/productos/page.js
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";

export default function ProductosPage() {
  // Estado para el carrito y el contador
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setCartCount(storedCart.reduce((acc, item) => acc + item.cantidad, 0));
  }, []);

  // Función para agregar al carrito
  const addToCart = (producto) => {
    const updatedCart = [...cart];
    const found = updatedCart.find((item) => item.nombre === producto.nombre);

    if (found) {
      found.cantidad += 1;
    } else {
      updatedCart.push({ ...producto, cantidad: 1 });
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Actualizar estado
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.cantidad, 0));
  };

  return (
    <>
      {/* Pasamos el contador al Navbar */}
      <Navbar cartCount={cartCount} />

      <div className="container my-5">
        <h2 className="text-center mb-4">Todos los productos</h2>

        <div className="row g-4">
          {productos.map((prod, i) => (
            <div key={i} className="col-6 col-md-3">
              {/* Pasamos la función addToCart al componente ProductCard */}
              <ProductCard
                producto={prod}
                onAddToCart={() => addToCart(prod)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
