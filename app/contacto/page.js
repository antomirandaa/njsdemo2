// app/contacto/page.js
"use client"; // Necesario porque usaremos estado y eventos de React
import { useState } from "react";
import Navbar from "@/components/Navbar";



export default function ContactoPage() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.reset();
    form.classList.remove("was-validated");
    setSuccess(true);

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2>Contacto</h2>

        <form
          id="contactForm"
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              required
            />
            <div className="invalid-feedback">Ingrese su nombre.</div>
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
            <div className="invalid-feedback">Ingrese un correo válido.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="mensaje"
              name="mensaje"
              rows="4"
              required
            ></textarea>
            <div className="invalid-feedback">Ingrese su mensaje.</div>
          </div>

          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </form>

        {success && (
          <div
            id="contactSuccess"
            className="alert alert-success mt-3"
            role="alert"
          >
            ¡Mensaje enviado correctamente!
          </div>
        )}
      </div>
    </>
  );
}
