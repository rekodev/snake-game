import Image from 'next/image';
import { useEffect } from 'react';
import { CELL_WIDTH, Direction } from '../constants';
import SnakeCell from './SnakeCell';

export const DIMENSIONS = {
  width: 15,
  height: 15,
};

type Props = {
  snakeCells: Array<{ x: number; y: number }>;
  rowIndex: number;
  cellIndex: number;
  foodCell: { x: number; y: number };
  onEatFood: () => void;
  direction: Direction;
};

const GameBoardCell = ({
  snakeCells,
  rowIndex,
  cellIndex,
  foodCell,
  onEatFood,
  direction,
}: Props) => {
  const evenRow = rowIndex % 2 === 0;
  const evenCell = cellIndex % 2 === 0;
  const darkerCell = evenRow ? evenCell : !evenCell;

  const isSnakeCell = snakeCells.some(
    (cell) => cell.y === rowIndex && cell.x === cellIndex
  );
  const firstSnakeCell = snakeCells[0];
  const lastSnakeCell = snakeCells[snakeCells.length - 1];

  const isTail =
    firstSnakeCell.x === cellIndex && firstSnakeCell.y === rowIndex;
  const isHead = lastSnakeCell.x === cellIndex && lastSnakeCell.y === rowIndex;
  const isFoodCell = foodCell.x === cellIndex && foodCell.y === rowIndex;

  useEffect(() => {
    if (!isFoodCell || !isHead) return;

    onEatFood();
  }, [isFoodCell, isHead, onEatFood]);

  const renderCellImage = (src: string, alt: string) => (
    <Image sizes='33' src={src} alt={alt} fill className='object-contain' />
  );

  return (
    <div
      key={cellIndex}
      className={`relative h-full ${
        darkerCell ? 'bg-green-200' : 'bg-green-100'
      }`}
      style={{ width: CELL_WIDTH }}
    >
      {isFoodCell && renderCellImage('/images/apple.png', 'Apple')}
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
