import { useState, useEffect } from "react";
import { LoadedImages } from "../types";

const usePreloadedImages = (imageUrls: Array<string>): LoadedImages => {
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});

  useEffect(() => {
    const promises = imageUrls.map((url) => {
      return new Promise<{ url: string; img: HTMLImageElement }>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ url, img });
      });
    });

    Promise.all(promises).then((images) => {
      const imagesMap: LoadedImages = images.reduce((acc, { url, img }) => {
        acc[url] = img;
        return acc;
      }, {} as LoadedImages);
      setLoadedImages(imagesMap);
    });
  }, [imageUrls]);

  return loadedImages;
};

export default usePreloadedImages;
