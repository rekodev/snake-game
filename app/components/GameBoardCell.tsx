import Image from "next/image";
import { useEffect, useMemo } from "react";
import { BOARD_DIMENSIONS, CELL_WIDTH, Direction } from "../constants";
import SnakeCell from "./SnakeCell";

type Props = {
  snakeCells: Array<{ x: number; y: number }>;
  rowIndex: number;
  cellIndex: number;
  foodCell: { x: number; y: number };
  onEatFood: () => void;
  direction: Direction;
  onGameOver: () => void;
};

const GameBoardCell = ({
  snakeCells,
  rowIndex,
  cellIndex,
  foodCell,
  onEatFood,
  direction,
  onGameOver,
}: Props) => {
  const evenRow = rowIndex % 2 === 0;
  const evenCell = cellIndex % 2 === 0;
  const darkerCell = evenRow ? evenCell : !evenCell;

  const firstSnakeCell = snakeCells[0];
  const lastSnakeCell = snakeCells[snakeCells.length - 1];

  const headlessSnakeCells = snakeCells.slice(0, -1);
  const isHeadlessSnakeCell = useMemo(
    () =>
      headlessSnakeCells.some(
        (cell) => cell.y === rowIndex && cell.x === cellIndex
      ),
    [headlessSnakeCells, rowIndex, cellIndex]
  );
  const isSnakeCell = useMemo(
    () =>
      snakeCells.some((cell) => cell.y === rowIndex && cell.x === cellIndex),
    [snakeCells, rowIndex, cellIndex]
  );

  const isTail =
    firstSnakeCell.x === cellIndex && firstSnakeCell.y === rowIndex;
  const isHead = useMemo(
    () => lastSnakeCell.x === cellIndex && lastSnakeCell.y === rowIndex,
    [lastSnakeCell, cellIndex, rowIndex]
  );
  const isFoodCell = foodCell.x === cellIndex && foodCell.y === rowIndex;

  useEffect(() => {
    if (!isHead) return;

    if (isHead && isHeadlessSnakeCell) {
      onGameOver();
    }
  }, [isHead, isHeadlessSnakeCell, onGameOver]);

  useEffect(() => {
    if (!isFoodCell || !isHead) return;

    onEatFood();
  }, [isFoodCell, isHead, onEatFood]);

  const renderCellImage = (src: string, alt: string) => (
    <Image sizes="33" src={src} alt={alt} fill className="object-contain" />
  );

  return (
    <div
      key={cellIndex}
      className={`relative h-full ${
        darkerCell ? "bg-green-200" : "bg-green-100"
      }`}
      style={{ width: CELL_WIDTH }}
    >
      {isFoodCell && renderCellImage("/images/apple.png", "Apple")}
      {isSnakeCell && (
        <SnakeCell
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          direction={direction}
          isHead={isHead}
          isTail={isTail}
          snakeCells={snakeCells}
          renderCellImage={renderCellImage}
        />
      )}
    </div>
  );
};

export default GameBoardCell;
