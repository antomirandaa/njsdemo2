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

    const datos = {
      correo: form.correo.value,
      password: form.password.value,
    };

    setError("");
    setSuccess("");

    try {
      const usuario = await loginUsuario(datos);
      setSuccess(`Bienvenido, ${usuario.nombre}`);
      // si quieres guardar info en localStorage:
      if (typeof window !== "undefined") {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }
      // redirigir al home o a productos
      router.push("/productos");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <>
      <Head>
        <title>Login - CompraCositas</title>
      </Head>
      <Navbar />
      <div className="container mt-4">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} noValidate>
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
            />
          </div>

          <button type="submit" className="btn btn-primary">
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
