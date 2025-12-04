"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Cargar carrito inicial
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Guardar cambios y notificar Navbar
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const updateQuantity = (index, cantidad) => {
    if (cantidad < 1) return;
    setCart((prev) => {
      const nuevo = [...prev];
      nuevo[index] = { ...nuevo[index], cantidad };
      return nuevo;
    });
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
    }
    setMessage("Carrito vaciado.");
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.cantidad || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Tu carrito</h2>

        {cart.length === 0 ? (
          <div className="alert alert-info">Tu carrito está vacío.</div>
        ) : (
          <>
            {cart.map((item, i) => (
              <div className="row align-items-center mb-3" key={i}>
                <div className="col-2">
                  <img
                    src={
                      item.imagen?.startsWith("http")
                        ? item.imagen
                        : `/${item.imagen}`
                    }
                    alt={item.nombre}
                    style={{ width: "60px" }}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-4">
                  <h5 className="mb-1">{item.nombre}</h5>
                  {item.descripcion && (
                    <p className="mb-0 text-muted small">
                      {item.descripcion}
                    </p>
                  )}
                </div>
                <div className="col-3 d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() =>
                      updateQuantity(i, (item.cantidad || 1) - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.cantidad || 1}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2"
                    onClick={() =>
                      updateQuantity(i, (item.cantidad || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="col-2 text-end">
                  <span className="fw-bold">
                    ${ (item.precio || 0) * (item.cantidad || 1) }
                  </span>
                </div>
                <div className="col-1 text-end">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(i)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <h4>Total: ${total}</h4>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => router.push("/checkout")}
                  disabled={cart.length === 0}
                >
                  Finalizar compra
                </button>
                <button className="btn btn-danger" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}

        {message && (
          <div className="alert alert-warning mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
