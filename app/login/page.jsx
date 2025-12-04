"use client"; // Necesario porque usamos estado y eventos de React
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

      // 👉 Llamamos a la API de login
      const usuario = await loginUsuario(correo, password);

      // Guardamos usuario actual para usarlo luego en el checkout
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(usuario));
      }

      setSuccess("Inicio de sesión exitoso.");
      form.classList.remove("was-validated");
      form.reset();

      // Redirigimos a productos
      setTimeout(() => {
        router.push("/productos");
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Usuario o contraseña incorrectos.");
      setSuccess("");
    }
  };

  return (
    <>
      <Head>
        <title>Login - CompraCositas</title>
      </Head>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
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
              Por favor ingresa un correo válido.
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
              La contraseña es obligatoria (mínimo 4 caracteres).
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
      </div>
    </>
  );
}
