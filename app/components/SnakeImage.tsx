import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const SnakeImage = ({ src, alt }: Props) => {
  return (
    <Image
      sizes="(max-width: 700px) 50px, 50px"
      quality={50}
      priority
      loading="eager"
      src={src}
      alt={alt}
      fill
      className="object-contain"
    />
  );
};

export default SnakeImage;
