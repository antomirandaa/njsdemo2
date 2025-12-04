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
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const usr = localStorage.getItem("currentUser");
    if (usr) {
      const u = JSON.parse(usr);
      setUsuario(u);
      setForm((prev) => ({
        ...prev,
        nombre: u.nombre || "",
        correo: u.correo || "",
      }));
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!usuario) {
      setError("Debes iniciar sesión antes de realizar la compra.");
      return;
    }

    const { nombre, correo, calle, comuna, region } = form;

    if (!nombre || !correo || !calle || !comuna || !region) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    // Construimos items para el backend
    const items = cart.map((item, index) => ({
      productoId: item.id || index + 1,
      cantidad: item.cantidad,
      precioUnitario: item.precio,
    }));

    try {
      setLoading(true);

      const boleta = await crearPago(usuario.id || 1, "TARJETA", items);

      localStorage.removeItem("cart");
      setCart([]);
      setSuccess(
        `✅ Compra realizada con éxito. N° de boleta: ${boleta.id}`
      );
      setError("");

      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (err) {
      console.error(err);
      setError(
        "Ocurrió un error al registrar el pago en el servidor. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4 text-center">Checkout</h2>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        <div className="row">
          {/* Resumen del carrito */}
          <div className="col-md-5 mb-4">
            <div className="card shadow">
              <div className="card-header fw-bold">Resumen de compra</div>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
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
          </div>

          {/* Formulario */}
          <div className="col-md-7">
            <form className="card p-4 shadow" onSubmit={handleSubmit}>
              <h4 className="mb-3 text-center">Datos de envío</h4>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
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
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Calle</label>
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
                  <label className="form-label">Región</label>
                  <input
                    type="text"
                    name="region"
                    className="form-control"
                    value={form.region}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Comuna</label>
                  <input
                    type="text"
                    name="comuna"
                    className="form-control"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Depto / Casa</label>
                  <input
                    type="text"
                    name="departamento"
                    className="form-control"
                    value={form.departamento}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Indicaciones extra</label>
                  <textarea
                    name="indicaciones"
                    className="form-control"
                    rows={3}
                    value={form.indicaciones}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="btn btn-success px-5"
                  disabled={loading || cart.length === 0}
                >
                  {loading ? "Procesando..." : "Confirmar compra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
