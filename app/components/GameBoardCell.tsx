import Image from "next/image";
import { memo, useEffect, useMemo } from "react";
import { CELL_WIDTH, Direction } from "../constants";
import SnakeCell from "./SnakeCell";

type Props = {
  rowIndex: number;
  cellIndex: number;
  foodCell: { x: number; y: number };
  snakeCells: Array<{ x: number; y: number }>;
  direction: Direction;
  onEatFood: () => void;
};

const GameBoardCell = memo(function GameBoardCell({
  rowIndex,
  cellIndex,
  snakeCells,
  foodCell,
  direction,
  onEatFood,
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

  const renderFoodCell = () => {
    if (!isFoodCell) return null;

    return (
      <Image
        sizes="(max-width: 700px) 50px, 50px"
        quality={50}
        priority
        loading="eager"
        src={"/images/apple.png"}
        alt={"Apple"}
        fill
        className="object-contain"
      />
    );
  };

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
      />
    );
  };

  return (
    <div
      key={cellIndex}
      className={` ${
        darkerCell ? "bg-green-200" : "bg-green-100"
      } relative h-full`}
      style={{ width: CELL_WIDTH }}
    >
      {renderSnakeCell()}
      {renderFoodCell()}
    </div>
  );
});

export default GameBoardCell;
