import { useEffect, useState } from "react";
import { IMAGE_URLS } from "../constants/imageUrls";
import { loadImage } from "../utils/loadImage";

export type GameAssets = {
  [key in keyof typeof IMAGE_URLS]: HTMLImageElement;
};

const useLoadAssets = () => {
  const [assets, setAssets] = useState<GameAssets>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const promises = Object.entries(IMAGE_URLS).map(([key, value]) => {
      return loadImage(value).then((image) => ({
        [key]: image,
      }));
    });

    Promise.all(promises).then((images) => {
      const newAssets = images.reduce(
        (acc, image) => ({ ...acc, ...image }),
        {},
      );
      setAssets(newAssets as GameAssets);
      setIsLoading(false);
    });
  }, []);

  return { assets, isLoading };
};

export default useLoadAssets;
