import { useEffect, useState } from "react";

const useResponsiveSize = () => {
  const [canvasSize, setCanvasSize] = useState(650);

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth >= 1024 && screenHeight >= 800) {
        setCanvasSize(645);
      } else {
        setCanvasSize(450);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return canvasSize;
};

export default useResponsiveSize;
