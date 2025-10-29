"use client"; // Necesario porque usamos estado y eventos de React
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function RegistroPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
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

    // Validaciones manuales
    if (correo !== correo2 || password !== password2) {
      setError(true);
      setSuccess(false);
      return;
    }

    // Guardar usuario en localStorage
    const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (users.some((u) => u.correo === correo)) {
      setError(true);
      setSuccess(false);
      return;
    }

    users.push({ nombre, correo, password, telefono, region, comuna });
    localStorage.setItem("usuarios", JSON.stringify(users));

    form.reset();
    form.classList.remove("was-validated");
    setSuccess(true);
    setError(false);
  };

  return (
    <>
      <Head>
        <title>Registro | Peluches Express</title>
      </Head>

      <Navbar />

      <div className="container mt-5">
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header fw-bold">Registro de usuario</div>
            <div className="card-body">
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
                  Ingrese su nombre completo.
                </div>
              </div>

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
                <div className="invalid-feedback">
                  Ingrese un correo válido.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="correo2" className="form-label">
                  Confirmar correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo2"
                  name="correo2"
                  required
                />
                <div className="invalid-feedback">
                  Los correos no coinciden.
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
                  minLength={6}
                />
                <div className="invalid-feedback">
                  La contraseña debe tener al menos 6 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password2" className="form-label">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  required
                />
                <div className="invalid-feedback">
                  Las contraseñas no coinciden.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="region" className="form-label">
                    Región
                  </label>
                  <select
                    className="form-select"
                    id="region"
                    name="region"
                    required
                  >
                    <option value="">-- Seleccione la región --</option>
                    <option>Región Metropolitana de Santiago</option>
                    <option>Región de la Araucanía</option>
                    <option>Región de Ñuble</option>
                  </select>
                  <div className="invalid-feedback">Seleccione una región.</div>
                </div>
                <div className="col">
                  <label htmlFor="comuna" className="form-label">
                    Comuna
                  </label>
                  <select
                    className="form-select"
                    id="comuna"
                    name="comuna"
                    required
                  >
                    <option value="">-- Seleccione la comuna --</option>
                    <option>Linares</option>
                    <option>Longaví</option>
                    <option>Concepción</option>
                  </select>
                  <div className="invalid-feedback">Seleccione una comuna.</div>
                </div>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>

        {success && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Usuario registrado correctamente!
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            El usuario ya existe o los datos no son válidos.
          </div>
        )}
      </div>
    </>
  );
}
