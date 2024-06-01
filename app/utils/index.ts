import { SnakeCells } from '../types';
import { DIMENSIONS } from '../components/GameBoardCell';
import { BodyCellPositioning, Direction } from '../constants';

export const generateNewFoodCell = (
  snakeCells: SnakeCells
): { x: number; y: number } => {
  const x = Math.floor(Math.random() * DIMENSIONS.height);
  const y = Math.floor(Math.random() * DIMENSIONS.width);

  const isSnakeCell = snakeCells.some((cell) => cell.x === x && cell.y === y);

  if (isSnakeCell) return generateNewFoodCell(snakeCells);

  return { x, y };
};

export const determineTailDirection = (snakeCells: SnakeCells) => {
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

export const determineBodyCellPositioning = (
  snakeCells: SnakeCells,
  index: number
) => {
  if (index === 0 || index === snakeCells.length - 1) return;
  const previousCell = snakeCells[index - 1];
  const nextCell = snakeCells[index + 1];

  if (previousCell.x === nextCell.x) return BodyCellPositioning.Vertical;
  if (previousCell.y === nextCell.y) return BodyCellPositioning.Horizontal;

  if (previousCell.x < nextCell.x && previousCell.y > nextCell.y) {
    // return BodyCellPositioning.TopRight;
    return BodyCellPositioning.BottomRight;
    // return BodyCellPositioning.BottomLeft;
    // return BodyCellPositioning.TopLeft;
  }
  if (previousCell.x < nextCell.x && previousCell.y < nextCell.y) {
    // return BodyCellPositioning.BottomRight;
    return BodyCellPositioning.BottomLeft;
    // return BodyCellPositioning.TopLeft;
    // return BodyCellPositioning.TopRight;
  }
  if (previousCell.x > nextCell.x && previousCell.y < nextCell.y) {
    // return BodyCellPositioning.BottomLeft;
    return BodyCellPositioning.TopLeft;
    // return BodyCellPositioning.TopRight;
    // return BodyCellPositioning.BottomRight;
  }
  if (previousCell.x > nextCell.x && previousCell.y > nextCell.y) {
    // return BodyCellPositioning.TopLeft;
    return BodyCellPositioning.TopRight;
    // return BodyCellPositioning.BottomRight;
    // return BodyCellPositioning.BottomLeft;
  }
};
