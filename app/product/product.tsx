import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Productos</h1>
      <MiImagen />
    </>
  );
}

function MiImagen() {
  return (
    <Image
      src="/images/images.jpg"
      alt="iamgen panda"
      width={200}
      height={200} //dasdad
    />
  );
}
