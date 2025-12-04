"use client"; // Necesario porque usamos estado y eventos de React
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

    // Validación HTML5
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

      // 👉 Llamada al backend para registrar
      const nuevoUsuario = await registrarUsuario({
        nombre,
        correo,
        password,
        telefono,
        region,
        comuna,
      });

      // Guardamos usuario registrado
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(nuevoUsuario));
      }

      setSuccess("Usuario registrado correctamente.");
      form.reset();
      form.classList.remove("was-validated");
    } catch (err) {
      console.error(err);
      setError(
        err.message || "El usuario ya existe o los datos no son válidos."
      );
      setSuccess("");
    }
  };

  return (
    <>
      <Head>
        <title>Registro - CompraCositas</title>
      </Head>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Registro de usuario</h2>

        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              required
            />
            <div className="invalid-feedback">
              Por favor ingresa tu nombre.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              required
            />
            <div className="invalid-feedback">
              Ingresa un correo válido.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="correo2" className="form-label">
              Repite tu correo
            </label>
            <input
              type="email"
              className="form-control"
              id="correo2"
              name="correo2"
              required
            />
            <div className="invalid-feedback">
              Repite el mismo correo.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              minLength={4}
            />
            <div className="invalid-feedback">
              Mínimo 4 caracteres.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="form-label">
              Repite tu contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              required
              minLength={4}
            />
            <div className="invalid-feedback">
              Repite la misma contraseña.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="telefono"
              name="telefono"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="region" className="form-label">
              Región
            </label>
            <input
              type="text"
              className="form-control"
              id="region"
              name="region"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comuna" className="form-label">
              Comuna
            </label>
            <input
              type="text"
              className="form-control"
              id="comuna"
              name="comuna"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarme
          </button>
        </form>

        {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </>
  );
}
