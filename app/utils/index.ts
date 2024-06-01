import { GameCell } from "../types";
import { DIMENSIONS } from "../components/GameBoardCell";
import { BodyCellPositioning, Direction } from "../constants";

export const generateNewFoodCell = (snakeCells: Array<GameCell>): GameCell => {
  const x = Math.floor(Math.random() * DIMENSIONS.height);
  const y = Math.floor(Math.random() * DIMENSIONS.width);

  const isSnakeCell = snakeCells.some((cell) => cell.x === x && cell.y === y);

  if (isSnakeCell) return generateNewFoodCell(snakeCells);

  return { x, y };
};

export const determineTailDirection = (snakeCells: Array<GameCell>) => {
  const tail = snakeCells[0];
  const nextToTail = snakeCells[1];

  let tailDirection: Direction;

  if (tail.y === nextToTail.y) {
    tailDirection = tail.x > nextToTail.x ? Direction.Right : Direction.Left;
  } else {
    tailDirection = tail.y > nextToTail.y ? Direction.Down : Direction.Up;
  }

  return tailDirection;
};

const getDirection = (from: GameCell, to: GameCell) => {
  if (from.x < to.x) return Direction.Right;
  if (from.x > to.x) return Direction.Left;
  if (from.y < to.y) return Direction.Down;
  if (from.y > to.y) return Direction.Up;
};

export const determineBodyCellPositioning = (
  snakeCells: Array<GameCell>,
  index: number
) => {
  if (index === 0 || index === snakeCells.length - 1) return;

  const previousCell = snakeCells[index - 1];
  const currentCell = snakeCells[index];
  const nextCell = snakeCells[index + 1];

  const fromPrevious = getDirection(previousCell, currentCell);
  const toNext = getDirection(currentCell, nextCell);

  // Horizontal and Vertical body cells
  if (previousCell.x === nextCell.x) return BodyCellPositioning.Vertical;
  if (previousCell.y === nextCell.y) return BodyCellPositioning.Horizontal;

  // Corner body cells
  if (
    (fromPrevious === Direction.Left && toNext === Direction.Up) ||
    (fromPrevious === Direction.Down && toNext === Direction.Right)
  ) {
    return BodyCellPositioning.TopRight;
  }
  if (
    (fromPrevious === Direction.Right && toNext === Direction.Down) ||
    (fromPrevious === Direction.Up && toNext === Direction.Left)
  ) {
    return BodyCellPositioning.BottomLeft;
  }
  if (
    (fromPrevious === Direction.Right && toNext === Direction.Up) ||
    (fromPrevious === Direction.Down && toNext === Direction.Left)
  ) {
    return BodyCellPositioning.TopLeft;
  }
  if (
    (fromPrevious === Direction.Up && toNext === Direction.Right) ||
    (fromPrevious === Direction.Left && toNext === Direction.Down)
  ) {
    return BodyCellPositioning.BottomRight;
  }
};
