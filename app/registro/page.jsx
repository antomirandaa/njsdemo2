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
      form.reportValidity();
      return;
    }

    const datos = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      password: form.password.value,
      region: form.region.value,
      comuna: form.comuna.value,
    };

    setError("");
    setSuccess("");

    try {
      await registrarUsuario(datos);
      setSuccess("Usuario registrado correctamente.");
      form.reset();
    } catch (err) {
      setError(err.message || "Error al registrar usuario.");
    }
  };

  return (
    <>
      <Head>
        <title>Registro - CompraCositas</title>
      </Head>
      <Navbar />
      <div className="container mt-4">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              minLength={6}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Región</label>
            <input
              type="text"
              name="region"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Comuna</label>
            <input
              type="text"
              name="comuna"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Registrarse
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
