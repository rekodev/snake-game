import { useCallback } from 'react';
import { BOARD_DIMENSIONS, Direction, ROW_HEIGHT } from '../constants';
import { GameCell } from '../types';
import { determineTailDirection, generateNewFoodCell } from '../utils';
import GameBoardCell from './GameBoardCell';
import GamePausedOverlay from './GamePausedOverlay';

type Props = {
  score: number;
  setScore: (score: number) => void;
  snakeCells: Array<GameCell>;
  setSnakeCells: (snakeCells: Array<GameCell>) => void;
  isGamePaused: boolean;
  direction: Direction;
  onGameOver: () => void;
  foodCell: GameCell;
  setFoodCell: (foodCell: GameCell) => void;
};

const GameBoard = ({
  snakeCells,
  setSnakeCells,
  score,
  setScore,
  isGamePaused,
  direction,
  onGameOver,
  foodCell,
  setFoodCell,
}: Props) => {
  const eatFood = useCallback(() => {
    const newSnakeCells = [...snakeCells];
    const tail = newSnakeCells[0];
    const tailDirection = determineTailDirection(newSnakeCells);

    switch (tailDirection) {
      case Direction.Up:
        newSnakeCells.unshift({ x: tail.x, y: tail.y - 1 });
        break;
      case Direction.Down:
        newSnakeCells.unshift({ x: tail.x, y: tail.y + 1 });
        break;
      case Direction.Left:
        newSnakeCells.unshift({ x: tail.x - 1, y: tail.y });
        break;
      case Direction.Right:
        newSnakeCells.unshift({ x: tail.x + 1, y: tail.y });
        break;
    }

    setScore(score + 1);
    setSnakeCells(newSnakeCells);
    setFoodCell(generateNewFoodCell(snakeCells));
  }, [score, setScore, snakeCells, setSnakeCells, setFoodCell]);

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => (
    <div key={rowIndex} className='w-full flex' style={{ height: ROW_HEIGHT }}>
      {Array.from({ length: BOARD_DIMENSIONS.width }).map((_, index) => (
        <GameBoardCell
          key={index}
          snakeCells={snakeCells}
          foodCell={foodCell}
          onEatFood={eatFood}
          rowIndex={rowIndex}
          cellIndex={index}
          direction={direction}
          onGameOver={onGameOver}
        />
      ))}
    </div>
  );

  return (
    <div className='relative w-full h-full mx-auto aspect-square max-w-[500px] max-h-[500px]'>
      {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
        renderGameBoardRow({ rowIndex: index })
      )}

      {isGamePaused && <GamePausedOverlay />}
    </div>
  );
};

export default GameBoard;
