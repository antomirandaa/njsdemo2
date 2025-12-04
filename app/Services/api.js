// services/api.js

// 👉 Cambia esto si tu URL es distinta
export const PRODUCTOS_BASE_URL =
  "https://microservicio-productos-production-544a.up.railway.app";

// 👉 Cambia esto por la URL real de tu microservicio de usuarios en Railway
export const USUARIOS_BASE_URL =
  "https://TU-MICROSERVICIO-USUARIOS.up.railway.app"; // TODO: reemplazar

// Credenciales para endpoints que piden Basic Auth (pagos, quizá otros)
const BASIC_AUTH_ADMIN = "Basic " + btoa("admin:admin123");

// =============== USUARIOS =====================

/**
 * Registro de usuario en el backend.
 * POST /api/v1/usuarios
 */
export async function registrarUsuario(datos) {
  const resp = await fetch(`${USUARIOS_BASE_URL}/api/v1/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(msg || "Error al registrar usuario");
  }

  return resp.json(); // usuario creado
}

/**
 * Login de usuario.
 * POST /api/v1/usuarios/login
 * Body: { correo, password }
 */
export async function loginUsuario(correo, password) {
  const resp = await fetch(`${USUARIOS_BASE_URL}/api/v1/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, password }),
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(msg || "Usuario o contraseña incorrectos");
  }

  return resp.json(); // usuario logueado
}

// =============== PRODUCTOS =====================

/**
 * Obtiene la lista de productos desde el backend.
 * GET /api/v1/productos
 */
export async function obtenerProductos() {
  const resp = await fetch(`${PRODUCTOS_BASE_URL}/api/v1/productos`, {
    method: "GET",
  });

  if (!resp.ok) {
    throw new Error("Error al obtener productos");
  }

  return resp.json();
}

// =============== PAGOS / BOLETAS ===============

/**
 * Crea un pago/boleta en el microservicio de pagos.
 * POST /api/v1/pagos
 *
 * @param usuarioId  ID del usuario (del backend)
 * @param metodoPago "TARJETA", "TRANSFERENCIA", etc.
 * @param items      [{ productoId, cantidad, precioUnitario }]
 */
export async function crearPago(usuarioId, metodoPago, items) {
  const payload = {
    usuarioId,
    metodoPago,
    items,
  };

  const resp = await fetch(`${PRODUCTOS_BASE_URL}/api/v1/pagos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: BASIC_AUTH_ADMIN, // backend de pagos pide Basic Auth
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(msg || "Error al registrar el pago");
  }

  return resp.json(); // boleta creada
}
