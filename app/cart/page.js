"use client"; // Necesario porque usamos useState y useEffect
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // Inicializar carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Actualizar localStorage y contar items
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (index, cantidad) => {
    const newCart = [...cart];
    newCart[index].cantidad = Math.max(1, cantidad);
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const checkout = () => {
    setCart([]);
    setMessage("¡Gracias por tu compra!");
    setTimeout(() => setMessage(""), 3000);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
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
          cart.map((item, i) => (
            <div className="row align-items-center mb-3" key={i}>
              <div className="col-2">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: "60px" }}
                />
              </div>
              <div className="col-4">{item.nombre}</div>
              <div className="col-2">${item.precio.toLocaleString()}</div>
              <div className="col-2">
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    updateQuantity(i, parseInt(e.target.value) || 1)
                  }
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(i)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}

        <div className="mt-4">
          <h4>Total: ${total.toLocaleString()}</h4>
          <button
            className="btn btn-success me-2"
            onClick={checkout}
            disabled={cart.length === 0}
          >
            Finalizar compra
          </button>
          <button
            className="btn btn-danger"
            onClick={clearCart}
            disabled={cart.length === 0}
          >
            Vaciar carrito
          </button>
        </div>

        {message && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
