"use client"; // Necesario porque usamos estado y eventos de React
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function LoginPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const correo = form.correo.value.trim();
    const password = form.password.value;

    const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const user = users.find(
      (u) => u.correo === correo && u.password === password
    );

    if (user) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        // Redirigir al inicio después del login exitoso
        window.location.href = "/";
      }, 1200);
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Peluches Express</title>
      </Head>

      <Navbar />

      <div className="container mt-5">
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header fw-bold">Iniciar sesión</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  required
                />
                <div className="invalid-feedback">Ingrese su correo.</div>
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
                />
                <div className="invalid-feedback">Ingrese su contraseña.</div>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </form>

        {success && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Inicio de sesión exitoso!
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            Usuario o contraseña incorrectos.
          </div>
        )}
      </div>
    </>
  );
}
