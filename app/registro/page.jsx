"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { registrarUsuario } from "@/services/api";

export default function RegistroPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const correo2 = form.correo2.value.trim();
    const password = form.password.value;
    const password2 = form.password2.value;
    const telefono = form.telefono.value.trim();
    const region = form.region.value;
    const comuna = form.comuna.value;

    // Validaciones manuales básicas
    if (correo !== correo2) {
      setError("Los correos no coinciden.");
      setSuccess("");
      return;
    }
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      setSuccess("");
      return;
    }

    try {
      setError("");
      setSuccess("");

      // 👉 Llamamos al backend
      const usuarioCreado = await registrarUsuario({
        nombre,
        correo,
        password,
        telefono,
        region,
        comuna,
      });

      // Guardamos el usuario logueado en localStorage
      localStorage.setItem("currentUser", JSON.stringify(usuarioCreado));

      form.reset();
      form.classList.remove("was-validated");
      setSuccess("Usuario registrado correctamente. ¡Ya puedes comprar!");
    } catch (err) {
      console.error(err);
      setError(
        "Ocurrió un error al registrar el usuario en el servidor. Revisa los datos o inténtalo más tarde."
      );
      setSuccess("");
    }
  };

  return (
    <>
      <Head>
        <title>Registro - Comprar Cositas</title>
      </Head>

      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Registro de usuario</h2>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Ingresa tu nombre completo.
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Ingresa un número telefónico.
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Ingresa un correo válido.
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Repetir correo electrónico</label>
              <input
                type="email"
                name="correo2"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Repite tu correo.
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                minLength={4}
              />
              <div className="invalid-feedback">
                Ingresa una contraseña (mínimo 4 caracteres).
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Repetir contraseña</label>
              <input
                type="password"
                name="password2"
                className="form-control"
                required
                minLength={4}
              />
              <div className="invalid-feedback">
                Repite tu contraseña.
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Región</label>
              <input
                type="text"
                name="region"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Ingresa tu región.</div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <input
                type="text"
                name="comuna"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Ingresa tu comuna.</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-primary px-5">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
