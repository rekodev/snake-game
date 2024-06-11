import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const SnakeImage = ({ src, alt, className }: Props) => {
  return (
    <Image
      sizes="(max-width: 700px) 50px, 50px"
      quality={50}
      priority
      loading="eager"
      src={src}
      alt={alt}
      fill
      className={`object-contain ${className}`}
    />
  );
};

export default SnakeImage;
