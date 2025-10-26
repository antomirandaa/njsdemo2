import Image from "next/image";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Peluche Panda Bambú",
    precio: 24.99,
    imagen: "/peluches/PandaBambu/PandaBambu1.PNG",
  },
  {
    id: 2,
    nombre: "Peluche Osito Amoroso",
    precio: 19.99,
    imagen: "/peluches/OsitoAmoroso.png",
  },
  {
    id: 3,
    nombre: "Peluche Gato Suave",
    precio: 21.5,
    imagen: "/peluches/GatoSuave.png",
  },
  {
    id: 4,
    nombre: "Peluche Unicornio Mágico",
    precio: 27.0,
    imagen: "/peluches/UnicornioMagico.png",
  },
];

export default function ProductosPage() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Todos los productos</h2>

      <div className="products-grid">
        {productos.map((p) => (
          <div key={p.id} className="product-card">
            <Image
              src={p.imagen}
              alt={p.nombre}
              width={200}
              height={160}
              className="rounded"
            />
            <div className="product-title">{p.nombre}</div>
            <div className="product-price">${p.precio.toFixed(2)}</div>
            <button className="btn-agregar add-btn">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
