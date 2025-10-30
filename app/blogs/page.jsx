// app/blog/page.js
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2>Noticias y Blogs</h2>

        <div className="news-section">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">¡Nueva colección de peluches!</h5>
              <p className="card-text">
                Descubre los nuevos modelos inspirados en tus personajes
                favoritos.
              </p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Envíos a todo Chile</h5>
              <p className="card-text">
                Ahora llegamos a todas las regiones del país. ¡Compra desde
                cualquier lugar!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
