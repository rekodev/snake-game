import SnakeImage from "./SnakeImage";

type Props = {
  imageUrls: Array<string>;
};

const PreloadedSnakeImages = ({ imageUrls }: Props) => {
  return (
    <div className="relative hidden">
      {imageUrls.map((url) => (
        <SnakeImage key={url} src={url} alt="Snake" />
      ))}
    </div>
  );
};

export default PreloadedSnakeImages;
