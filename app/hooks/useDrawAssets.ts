import { RefObject, useCallback } from "react";
import { BodyCellPositioning, Direction } from "../constants";
import { GameCell } from "../types";
import { determineBodyCellPositioning, determineTailDirection } from "../utils";
import { GameAssets } from "./useLoadAssets";

type Props = {
  snakeCells: Array<GameCell>;
  canvasRef: RefObject<HTMLCanvasElement>;
  direction: Direction;
  assets: GameAssets | undefined;
  cellSize: number;
};

const useDrawAssets = ({
  snakeCells,
  canvasRef,
  direction,
  assets,
  cellSize,
}: Props) => {
  const drawImage = useCallback(
    (image: HTMLImageElement, x: number, y: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      ctx.drawImage(image, x, y, cellSize, cellSize);
    },
    [canvasRef, cellSize],
  );

  const drawFood = useCallback(
    (cell: GameCell) => {
      if (!assets) return;

      drawImage(assets.apple, cell.x * cellSize, cell.y * cellSize);
    },
    [assets, drawImage, cellSize],
  );

  const drawHead = (cell: GameCell) => {
    if (!assets) return;

    switch (direction) {
      case Direction.Up:
        drawImage(assets.headUp, cell.x * cellSize, cell.y * cellSize);
        break;
      case Direction.Down:
        drawImage(assets.headDown, cell.x * cellSize, cell.y * cellSize);
        break;
      case Direction.Left:
        drawImage(assets.headLeft, cell.x * cellSize, cell.y * cellSize);
        break;
      case Direction.Right:
        drawImage(assets.headRight, cell.x * cellSize, cell.y * cellSize);
        break;
    }
  };

  const drawTail = useCallback(
    (cell: GameCell) => {
      if (!assets) return;

      const tailDirection = determineTailDirection(snakeCells);

      switch (tailDirection) {
        case Direction.Up:
          drawImage(assets.tailUp, cell.x * cellSize, cell.y * cellSize);
          break;
        case Direction.Down:
          drawImage(assets.tailDown, cell.x * cellSize, cell.y * cellSize);
          break;
        case Direction.Left:
          drawImage(assets.tailLeft, cell.x * cellSize, cell.y * cellSize);
          break;
        case Direction.Right:
          drawImage(assets.tailRight, cell.x * cellSize, cell.y * cellSize);
          break;
      }
    },
    [assets, drawImage, snakeCells, cellSize],
  );

  const drawBody = useCallback(
    (cell: GameCell, index: number) => {
      if (!assets) return;

      const cellPositioning = determineBodyCellPositioning(snakeCells, index);

      switch (cellPositioning) {
        case BodyCellPositioning.Horizontal:
          drawImage(
            assets.bodyHorizontal,
            cell.x * cellSize,
            cell.y * cellSize,
          );
          break;
        case BodyCellPositioning.Vertical:
          drawImage(assets.bodyVertical, cell.x * cellSize, cell.y * cellSize);
          break;
        case BodyCellPositioning.TopRight:
          drawImage(assets.bodyTopRight, cell.x * cellSize, cell.y * cellSize);
          break;
        case BodyCellPositioning.TopLeft:
          drawImage(assets.bodyTopLeft, cell.x * cellSize, cell.y * cellSize);
          break;
        case BodyCellPositioning.BottomRight:
          drawImage(
            assets.bodyBottomRight,
            cell.x * cellSize,
            cell.y * cellSize,
          );
          break;
        case BodyCellPositioning.BottomLeft:
          drawImage(
            assets.bodyBottomLeft,
            cell.x * cellSize,
            cell.y * cellSize,
          );
          break;
      }
    },
    [assets, drawImage, snakeCells, cellSize],
  );

  return { drawHead, drawTail, drawBody, drawFood };
};

export default useDrawAssets;
