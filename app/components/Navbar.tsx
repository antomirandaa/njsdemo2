"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";

export default function Navbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <BsNavbar
      bg="light"
      expand="lg"
      expanded={expanded}
      className="shadow-sm"
    >
      <Container fluid>
        <Link href="/" className="navbar-brand">
          Peluches Express
        </Link>

        <BsNavbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(!expanded)}
        />

        <BsNavbar.Collapse id="navbarNav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className={`nav-link ${
                pathname.startsWith("/productos") ? "active" : ""
              }`}
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className={`nav-link ${
                pathname.startsWith("/nosotros") ? "active" : ""
              }`}
            >
              Nosotros
            </Link>
            <Link
              href="/blogs"
              className={`nav-link ${
                pathname.startsWith("/blogs") ? "active" : ""
              }`}
            >
              Blogs
            </Link>
            <Link
              href="/contacto"
              className={`nav-link ${
                pathname.startsWith("/contacto") ? "active" : ""
              }`}
            >
              Contacto
            </Link>
          </Nav>

          <Nav>
            <Link href="/registro" className="nav-link">
              Registro
            </Link>
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/cart" className="nav-link">
              🛒 Carrito <span className="badge bg-primary">0</span>
            </Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}