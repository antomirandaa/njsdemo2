import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="d-flex align-items-center justify-content-center flex-wrap p-5 bg-light">
        <div className="text-center me-4">
          <h1>Bienvenido a Peluches Express</h1>
          <p>¡Los peluches más tiernos y originales, directo a tu casa!</p>
          <Link href="/productos" className="btn btn-primary btn-lg">
            Ver productos
          </Link>
        </div>

        <div>
          <Image
            src="/peluches/PandaBambu/PandaBambu1.PNG"
            alt="Peluche Destacado"
            width={220}
            height={220}
            className="rounded-4"
          />
        </div>
      </section>

      {/* Productos destacados */}
      <div className="products-section container py-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div id="contenedor" className="row">
          {/* Aquí puedes renderizar productos desde una API o array */}
        </div>
      </div>
    </div>
  );
}