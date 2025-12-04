// services/api.js

// URL base de tu backend en Railway
export const API_BASE_URL =
  "https://microservicio-productos-production-544a.up.railway.app";

// Credenciales para endpoints que usan Basic Auth (pagos, etc.)
const BASIC_AUTH_ADMIN = "Basic " + btoa("admin:admin123");

// =============== USUARIOS =====================

/**
 * Registro de usuario.
 * POST /api/v1/usuarios
 */
export async function registrarUsuario(datos) {
  const resp = await fetch(`${API_BASE_URL}/api/v1/usuarios`, {
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

  return resp.json();
}

/**
 * Login de usuario.
 * POST /api/v1/usuarios/login
 * Body: { correo, password }
 */
export async function loginUsuario(correo, password) {
  const resp = await fetch(`${API_BASE_URL}/api/v1/usuarios/login`, {
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

  return resp.json();
}

// =============== PRODUCTOS =====================

/**
 * Obtiene la lista de productos.
 * GET /api/v1/productos
 */
export async function obtenerProductos() {
  const resp = await fetch(`${API_BASE_URL}/api/v1/productos`, {
    method: "GET",
  });

  if (!resp.ok) {
    throw new Error("Error al obtener productos");
  }

  return resp.json();
}

// =============== PAGOS =====================

/**
 * Crea un pago/boleta.
 * POST /api/v1/pagos
 *
 * @param {number} usuarioId
 * @param {string} metodoPago
 * @param {Array<{ productoId:number, cantidad:number, precioUnitario:number }>} items
 */
export async function crearPago(usuarioId, metodoPago, items) {
  const payload = { usuarioId, metodoPago, items };

  const resp = await fetch(`${API_BASE_URL}/api/v1/pagos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: BASIC_AUTH_ADMIN,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(msg || "Error al registrar el pago");
  }

  return resp.json();
}
