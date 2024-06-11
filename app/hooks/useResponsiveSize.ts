import { useEffect, useState } from "react";

const SMALLER_CANVAS_SIZE = 480;
const LARGER_CANVAS_SIZE = 645;

const useResponsiveSize = () => {
  const [canvasSize, setCanvasSize] = useState(650);

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth >= 1024 && screenHeight >= 800) {
        setCanvasSize(LARGER_CANVAS_SIZE);
      } else {
        setCanvasSize(SMALLER_CANVAS_SIZE);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return canvasSize;
};

export default useResponsiveSize;
