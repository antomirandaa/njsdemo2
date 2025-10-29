// app/nosotros/page.js
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Nosotros | Peluches Express",
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2>Sobre nosotros</h2>

        <div className="card mt-4">
          <div className="card-body">
            <p>
              Somos <strong>Peluches Express</strong>, una tienda dedicada a
              llevar alegría y ternura a tu hogar con los peluches más
              originales y de mejor calidad. Nuestro equipo está comprometido
              con la satisfacción de nuestros clientes y la entrega rápida y
              segura de tus productos favoritos.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
