"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

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
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const comunas = ["Linares", "Longaví", "Concepción"];
  const regiones = [
    "Región Metropolitana de Santiago",
    "Región de la Araucanía",
    "Región de Ñuble",
  ];

  // 🛒 Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length === 0) {
      router.push("/productos");
    } else {
      setCart(storedCart);
    }
  }, [router]);

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Verificación de usuario y campos obligatorios
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, correo, calle, comuna, region } = form;

    if (!nombre || !correo || !calle || !comuna || !region) {
      setError("Por favor completa todos los campos obligatorios.");
      setSuccess("");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      setError("Por favor ingresa un correo electrónico válido.");
      setSuccess("");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.nombre.toLowerCase() === nombre.toLowerCase() &&
        u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (!usuarioEncontrado) {
      setError("Usuario no registrado o datos incorrectos.");
      setSuccess("");
      return;
    }

    // ✅ Compra válida
    setError("");
    setSuccess("¡Compra realizada con éxito!");
    localStorage.removeItem("cart");

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">🧾 Confirmar Compra</h2>

        {/* 🛍️ Resumen del carrito */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Productos en tu carrito</h4>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>
                      {item.nombre} x{item.cantidad}
                    </span>
                    <span>
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </span>
                  </div>
                ))}
                <h5 className="mt-3 text-end">
                  Total: ${total.toLocaleString()}
                </h5>
              </>
            )}
          </div>
        </div>

        {/* 🧍Formulario */}
        <form className="card p-4 shadow" onSubmit={handleSubmit}>
          <h4 className="mb-3 text-center">Datos del comprador</h4>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Nombre <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Correo electrónico <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">
                Calle <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <input
                type="text"
                name="calle"
                className="form-control"
                value={form.calle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Región <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <select
                name="region"
                className="form-select"
                value={form.region}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione región --</option>
                {regiones.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Comuna <span style={{ color: "#dc3545" }}>*</span>
              </label>
              <select
                name="comuna"
                className="form-select"
                value={form.comuna}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione comuna --</option>
                {comunas.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                N° de departamento (opcional)
              </label>
              <input
                type="text"
                name="departamento"
                className="form-control"
                value={form.departamento}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Indicaciones (opcional)</label>
              <input
                type="text"
                name="indicaciones"
                className="form-control"
                value={form.indicaciones}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <button className="btn btn-success px-4" type="submit">
              Confirmar compra
            </button>
          </div>

          {error && (
            <div className="alert alert-danger mt-3 text-center">{error}</div>
          )}
          {success && (
            <div className="alert alert-success mt-3 text-center">
              {success}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
