import { SnakeCells } from "../types";
import { DIMENSIONS } from "../components/GameBoardCell";

export const generateNewFoodCell = (
  snakeCells: SnakeCells
): { x: number; y: number } => {
  const x = Math.floor(Math.random() * DIMENSIONS.height);
  const y = Math.floor(Math.random() * DIMENSIONS.width);

  const isSnakeCell = snakeCells.some((cell) => cell.x === x && cell.y === y);

  if (isSnakeCell) return generateNewFoodCell(snakeCells);

  return { x, y };
};
