import Image from "next/image";

export default function Home() {
  return <h1>Productos</h1>;

  function MiImagen() {
    return (
      <Image
        src="https://rimage.ripley.cl/home.ripley/Attachment/MKP/9567/MPM10001713603/full_image-1"
        alt="iamgen panda"
        width={50}
        height={30} //dasdad
      />
    );
  }
}
