// components/ProductCard.jsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ producto }) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = cart.find((item) => item.nombre === producto.nombre);

    if (found) {
      found.cantidad += 1;
    } else {
      cart.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ Avisar al Navbar que el carrito cambió
    window.dispatchEvent(new Event("cart-updated"));

    // Mostrar mensaje temporal de agregado
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="card text-center h-100">
      <Image
        src={`/${producto.imagen}`}
        alt={producto.nombre}
        width={200}
        height={200}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio.toLocaleString()}</p>
        <button className="btn btn-success" onClick={addToCart}>
          {added ? "¡Agregado!" : "Agregar"}
        </button>
      </div>
    </div>
  );
}
