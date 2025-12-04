"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { crearPago } from "@/services/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    calle: "",
    comuna: "",
    region: "",
    departamento: "",
    indicaciones: "",
    metodoPago: "TARJETA",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const comunas = ["Linares", "Longaví", "Concepción"];
  const regiones = [
    "Región Metropolitana de Santiago",
    "Región de la Araucanía",
    "Región de Ñuble",
  ];

  // Cargar carrito y usuario desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length === 0) {
      router.push("/productos");
      return;
    }
    setCart(storedCart);

    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (storedUser) {
      setForm((prev) => ({
        ...prev,
        nombre: storedUser.nombre || "",
        correo: storedUser.correo || storedUser.email || "",
      }));
    }
  }, [router]);

  const total = cart.reduce(
    (sum, item) => sum + (item.precio || 0) * (item.cantidad || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!storedUser || !storedUser.id) {
      setError("Debes iniciar sesión antes de pagar.");
      return;
    }

    try {
      const items = cart.map((item, idx) => ({
        productoId: item.id || idx + 1,
        cantidad: item.cantidad || 1,
        precioUnitario: item.precio || 0,
      }));

      await crearPago(storedUser.id, form.metodoPago, items);

      setSuccess("Pago registrado correctamente. ¡Gracias por tu compra!");
      localStorage.removeItem("cart");
      setCart([]);

      setTimeout(() => {
        router.push("/productos");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(err.message || "Hubo un problema al procesar el pago.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Checkout</h2>

        <div className="row">
          {/* Resumen de compra */}
          <div className="col-md-5 mb-4">
            <h4>Resumen de tu compra</h4>
            <ul className="list-group">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.nombre} x {item.cantidad || 1}
                  </span>
                  <span>${(item.precio || 0) * (item.cantidad || 1)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-end">
              <strong>Total: ${total}</strong>
            </div>
          </div>

          {/* Formulario de datos y pago */}
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <h4>Datos de contacto</h4>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <h4 className="mt-4">Dirección</h4>
              <div className="mb-3">
                <label className="form-label">Calle</label>
                <input
                  type="text"
                  className="form-control"
                  name="calle"
                  value={form.calle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Comuna</label>
                  <select
                    className="form-select"
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una comuna</option>
                    {comunas.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Región</label>
                  <select
                    className="form-select"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {regiones.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Departamento / Casa (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="departamento"
                  value={form.departamento}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Indicaciones (opcional)</label>
                <textarea
                  className="form-control"
                  name="indicaciones"
                  rows={2}
                  value={form.indicaciones}
                  onChange={handleChange}
                />
              </div>

              <h4 className="mt-4">Método de pago</h4>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="metodoPago"
                  value={form.metodoPago}
                  onChange={handleChange}
                >
                  <option value="TARJETA">Tarjeta de crédito/débito</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                  <option value="EFECTIVO">Efectivo</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Confirmar compra
              </button>
            </form>

            {error && (
              <div className="alert alert-danger mt-3 text-center">{error}</div>
            )}
            {success && (
              <div className="alert alert-success mt-3 text-center">
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
