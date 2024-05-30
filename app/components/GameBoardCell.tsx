import { CELL_WIDTH } from "../constants";

export const DIMENSIONS = {
  width: 15,
  height: 15,
};

type Props = {
  snakeCells: Array<{ x: number; y: number }>;
  rowIndex: number;
  cellIndex: number;
};

const GameBoardCell = ({ snakeCells, rowIndex, cellIndex }: Props) => {
  const evenRow = rowIndex % 2 === 0;
  const evenCell = cellIndex % 2 === 0;
  const snakeCell = snakeCells.some(
    (cell) => cell.x === rowIndex && cell.y === cellIndex
  );
  const darkerCell = evenRow ? evenCell : !evenCell;

  const firstSnakeCell = snakeCells[0];
  const lastSnakeCell = snakeCells[snakeCells.length - 1];

  const isTail =
    firstSnakeCell.x === rowIndex && firstSnakeCell.y === cellIndex;
  const isHead = lastSnakeCell.x === rowIndex && lastSnakeCell.y === cellIndex;

  return (
    <div
      key={cellIndex}
      className={`h-full ${
        snakeCell ? "bg-gray-700" : darkerCell ? "bg-green-200" : "bg-green-100"
      } ${isHead ? "bg-green-800" : ""} ${isTail ? "bg-gray-400" : ""}`}
      style={{ width: CELL_WIDTH }}
    ></div>
  );
};

export default GameBoardCell;
