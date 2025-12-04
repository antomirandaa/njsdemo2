// services/api.js

export const API_BASE_URL =
  "https://microservicio-productos-production-544a.up.railway.app";

// Si usas endpoints protegidos con Basic Auth (ADMIN)
export const BASIC_AUTH_ADMIN =
  typeof btoa !== "undefined"
    ? "Basic " + btoa("admin:admin123")
    : "Basic " + Buffer.from("admin:admin123").toString("base64");

// ================= USUARIOS ===================

// Registro de usuario: POST /api/v1/usuarios/registro
export async function registrarUsuario(datos) {
  // datos = { nombre, correo, password, region, comuna }
  const resp = await fetch(`${API_BASE_URL}/api/v1/usuarios/registro`, {
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

// Login de usuario: POST /api/v1/usuarios/login
export async function loginUsuario({ correo, password }) {
  const resp = await fetch(`${API_BASE_URL}/api/v1/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, password }),
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(msg || "Error al iniciar sesión");
  }

  return resp.json(); // aquí te debería venir un UsuarioResponse
}

// ================= PRODUCTOS ===================

// GET /api/v1/productos
export async function listarProductos() {
  const resp = await fetch(`${API_BASE_URL}/api/v1/productos`, {
    method: "GET",
  });

  if (!resp.ok) {
    throw new Error("Error al obtener productos");
  }

  return resp.json();
}

// ================= PAGOS ===================

// POST /api/v1/pagos (requiere admin/admin123 en Basic Auth)
export async function registrarPago(payload) {
  // payload = { usuarioId, items: [ { productoId, cantidad } ] } según tu DTO
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
