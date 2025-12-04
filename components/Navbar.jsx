"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Carga dinámica del JS de Bootstrap
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window === "undefined") return;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce(
        (acc, item) => acc + (item.cantidad || 1),
        0
      );
      setCartCount(total);
    };

    // Inicializa contador
    updateCount();

    // Escucha cambios de carrito (entre páginas y dentro de la misma)
    window.addEventListener("storage", updateCount);
    window.addEventListener("cart-updated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cart-updated", updateCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          Peluches Express
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/productos" className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ofertas" className="nav-link">
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">
                Contacto
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/registro" className="nav-link">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/cart"
                className="nav-link d-flex align-items-center"
              >
                🛒 Carrito
                <span className="badge bg-primary ms-1">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
