// app/productos/page.js
"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";
/*
export const metadata = {
  title: "Productos | Peluches Express",
};
*/
export default function ProductosPage() {
  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Todos los productos</h2>

        <div className="row g-4">
          {productos.map((prod, i) => (
            <div key={i} className="col-6 col-md-3">
              <ProductCard producto={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
