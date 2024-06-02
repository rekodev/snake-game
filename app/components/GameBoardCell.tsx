import Image from "next/image";
import { memo, useEffect, useMemo } from "react";
import { CELL_WIDTH, Direction } from "../constants";
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

const GameBoardCell = memo(function GameBoardCell({
  snakeCells,
  rowIndex,
  cellIndex,
  foodCell,
  onEatFood,
  direction,
  onGameOver,
}: Props) {
  const evenRow = rowIndex % 2 === 0;
  const evenCell = cellIndex % 2 === 0;
  const darkerCell = evenRow ? evenCell : !evenCell;

  const firstSnakeCell = snakeCells[0];
  const lastSnakeCell = snakeCells[snakeCells.length - 1];

  const isHead = useMemo(
    () => lastSnakeCell.x === cellIndex && lastSnakeCell.y === rowIndex,
    [lastSnakeCell, cellIndex, rowIndex],
  );
  const isBody = useMemo(
    () =>
      snakeCells
        .slice(1, -1)
        .some((cell) => cell.y === rowIndex && cell.x === cellIndex),
    [snakeCells, rowIndex, cellIndex],
  );
  const isTail = useMemo(
    () => firstSnakeCell.x === cellIndex && firstSnakeCell.y === rowIndex,
    [cellIndex, firstSnakeCell, rowIndex],
  );
  const isFoodCell = useMemo(
    () => foodCell.x === cellIndex && foodCell.y === rowIndex,
    [foodCell, cellIndex, rowIndex],
  );

  useEffect(() => {
    if (!isFoodCell || !isHead) return;

    onEatFood();
  }, [isFoodCell, isHead, onEatFood]);

  useEffect(() => {
    if (!isHead || !(isBody || isTail)) return;

    onGameOver();
  }, [isBody, isHead, isTail, onGameOver]);

  const renderCellImage = (src: string, alt: string) => (
    <Image
      sizes="100%"
      quality={50}
      priority={true}
      src={src}
      alt={alt}
      fill
      objectFit="contain"
    />
  );

  const renderSnakeCell = () => {
    if (!isHead && !isTail && !isBody) return null;

    return (
      <SnakeCell
        rowIndex={rowIndex}
        cellIndex={cellIndex}
        direction={direction}
        isHead={isHead}
        isTail={isTail}
        snakeCells={snakeCells}
        renderCellImage={renderCellImage}
      />
    );
  };

  return (
    <div
      key={cellIndex}
      className={`cell ${
        darkerCell ? "bg-green-200" : "bg-green-100"
      } relative h-full`}
      style={{ width: CELL_WIDTH }}
    >
      {isFoodCell && renderCellImage("/images/apple.png", "Apple")}
      {renderSnakeCell()}
    </div>
  );
});

export default GameBoardCell;
