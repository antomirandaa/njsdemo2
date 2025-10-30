// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Actualiza el xcontador con los datos del localStorage
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce((a, b) => a + (b.cantidad || 0), 0);
        setCartCount(count);
      } catch (err) {
        console.error("Error leyendo carrito:", err);
      }
    };

    // Primera carga
    updateCount();

    // Escucha cambios del carrito en otras pestañas
    window.addEventListener("storage", updateCount);

    // Escucha cambios locales (por ejemplo, cuando agregas productos)
    window.addEventListener("cart-updated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cart-updated", updateCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Peluches Express
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/productos" className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/nosotros" className="nav-link">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/blogs" className="nav-link">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">
                Contacto
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/registro" className="nav-link">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link">
                🛒 Carrito <span className="badge bg-primary">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
