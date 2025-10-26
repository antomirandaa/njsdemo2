import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Peluches Express",
  description: "¡Los peluches más tiernos y originales, directo a tu casa!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="pt-3">{children}</main>
      </body>
    </html>
  );
}