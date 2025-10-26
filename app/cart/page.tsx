"use client";

import { useState } from "react";

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, nombre: "Peluche Panda Bambú", precio: 24.99, cantidad: 1 },
    { id: 2, nombre: "Peluche Osito Amoroso", precio: 19.99, cantidad: 2 },
  ]);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const incrementar = (id: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );

  const decrementar = (id: number) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );

  const eliminar = (id: number) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const vaciarCarrito = () => setCart([]);

  const finalizarCompra = () => {
    alert("¡Gracias por tu compra! 🧸✨");
    setCart([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div id="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="row mb-3 align-items-center">
              <div className="col-md-6">
                <h5>{item.nombre}</h5>
              </div>
              <div className="col-md-2">${item.precio.toFixed(2)}</div>
              <div className="col-md-2">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decrementar(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => incrementar(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h4>
          Total: $<span id="cart-total">{total.toFixed(2)}</span>
        </h4>
        <button
          className="btn btn-success me-2"
          id="checkout-btn"
          onClick={finalizarCompra}
          disabled={cart.length === 0}
        >
          Finalizar compra
        </button>
        <button
          className="btn btn-danger"
          id="clear-cart-btn"
          onClick={vaciarCarrito}
          disabled={cart.length === 0}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
