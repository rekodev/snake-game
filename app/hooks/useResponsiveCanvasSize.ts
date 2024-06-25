import { useEffect, useState } from "react";
import { GRID_SIZE } from "../constants";

const SCREEN_HEIGHT_RATIO = 1.525;

const useResponsiveCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const screenHeight = window.innerHeight;
      const updatedCanvasSize =
        Math.floor(screenHeight / SCREEN_HEIGHT_RATIO / GRID_SIZE) * GRID_SIZE;

      setCanvasSize(updatedCanvasSize);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return canvasSize;
};

export default useResponsiveCanvasSize;
