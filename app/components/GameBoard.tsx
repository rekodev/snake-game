import { useCallback, useEffect, useMemo, useRef } from "react";

import useDrawAssets from "../hooks/useDrawAssets";
import { GameAssets } from "../hooks/useLoadAssets";

import { Direction, GRID_SIZE } from "../constants";
import { GameCell } from "../types";

import useResponsiveSize from "../hooks/useResponsiveSize";
import { drawBoard } from "../utils/drawBoard";
import GameOverlay from "./GameOverlay";

type Props = {
  assets: GameAssets | undefined;
  snakeCells: Array<GameCell>;
  foodCell: GameCell;
  direction: Direction;
  isGameStarted: boolean;
  isGamePaused: boolean;
};

const GameBoard = ({
  assets,
  snakeCells,
  foodCell,
  direction,
  isGameStarted,
  isGamePaused,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasSize = useResponsiveSize();
  const cellSize = useMemo(() => canvasSize / GRID_SIZE, [canvasSize]);

  const { drawHead, drawBody, drawTail, drawFood } = useDrawAssets({
    assets,
    snakeCells,
    direction,
    canvasRef,
    cellSize,
  });

  const drawGameBoard = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(canvas, ctx, cellSize);
    drawFood(foodCell);

    snakeCells.forEach((cell, index) => {
      const isTail = index === 0;
      const isHead = index === snakeCells.length - 1;
      const isBody = !isTail && !isHead;

      if (isHead) drawHead(cell);
      if (isBody) drawBody(cell, index);
      if (isTail) drawTail(cell);
    });
  }, [
    canvasSize,
    cellSize,
    drawBody,
    drawHead,
    drawTail,
    drawFood,
    foodCell,
    snakeCells,
  ]);

  useEffect(() => {
    drawGameBoard();
  }, [drawGameBoard]);

  return (
    <div className="relative flex justify-center rounded-lg bg-green-400 p-4">
      <canvas ref={canvasRef} />

      {(!isGameStarted || isGamePaused) && (
        <GameOverlay isGameStarted={isGameStarted} />
      )}
    </div>
  );
};

export default GameBoard;
