"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart.length >= 1) {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated")); // ✅ actualiza Navbar
    }
  }, [cart]);

  const updateQuantity = (index, cantidad) => {
    const newCart = [...cart];
    newCart[index].cantidad = Math.max(1, cantidad);
    setCart(newCart);
    window.dispatchEvent(new Event("cart-updated")); // ✅ actualiza Navbar
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    window.dispatchEvent(new Event("cart-updated")); // ✅ actualiza Navbar
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("cart-updated")); // ✅ actualiza Navbar
    setMessage("🗑️ Carrito vaciado correctamente");
    setTimeout(() => setMessage(""), 3000);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <>
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.cantidad, 0)} />

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
              <div className="col-2">${item.precio}</div>
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
          <h4>Total: ${total}</h4>
          <button
            className="btn btn-success me-2"
            onClick={() => router.push("/checkout")}
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
          <div className="alert alert-warning mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
