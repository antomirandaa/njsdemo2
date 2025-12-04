"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar.jsx";
import ProductCard from "@/components/ProductCard.jsx";
import { productos } from "@/data/productos";

// 🔹 Lee carrito desde localStorage
function leerCarrito() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error leyendo carrito:", e);
    return [];
  }
}

// 🔹 Guarda carrito y actualiza Navbar
function guardarCarrito(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));
}

export default function HomePage() {
  const addToCart = (producto) => {
    if (typeof window === "undefined") return;

    const cart = leerCarrito();
    const index = cart.findIndex((p) => p.nombre === producto.nombre);

    if (index >= 0) {
      cart[index].cantidad = (cart[index].cantidad || 1) + 1;
    } else {
      cart.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(cart);
    alert(`${producto.nombre} fue añadido al carrito 🛒`);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="main-section d-flex align-items-center justify-content-center py-5">
        <div className="text-center">
          <h1>Bienvenido a Peluches Express</h1>
          <p>¡Los peluches más tiernos y originales, directo a tu casa!</p>
          <Link href="/productos" className="btn btn-primary btn-lg">
            Ver productos
          </Link>
        </div>
        <div className="main-image ms-4">
          <Image
            src="/images/peluches/PandaBambu/PandaBambu1.PNG"
            alt="Peluche Destacado"
            width={220}
            height={220}
            className="rounded-4"
          />
        </div>
      </section>

      {/* Destacados */}
      <div className="products-section container my-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row g-4">
          {productos.slice(0, 8).map((prod, i) => (
            <div key={i} className="col-6 col-md-3">
              <ProductCard producto={prod} onAgregar={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
