"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { loginUsuario } from "@/services/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const correo = form.correo.value.trim();
    const password = form.password.value;

    try {
      setError("");
      setSuccess("");

      // 👉 Llamamos al backend
      const usuario = await loginUsuario(correo, password);

      // Guardamos usuario actual
      localStorage.setItem("currentUser", JSON.stringify(usuario));

      setSuccess("¡Inicio de sesión exitoso!");
      form.reset();
      form.classList.remove("was-validated");

      setTimeout(() => {
        router.push("/productos");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Usuario o contraseña incorrectos.");
      setSuccess("");
    }
  };

  return (
    <>
      <Head>
        <title>Login - Comprar Cositas</title>
      </Head>

      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Iniciar sesión</h2>

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
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              required
            />
            <div className="invalid-feedback">
              Ingresa tu correo electrónico.
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
            />
            <div className="invalid-feedback">
              Ingresa tu contraseña.
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
