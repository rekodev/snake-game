import { useEffect, useRef, useState } from 'react';
import {
  BOARD_DIMENSIONS,
  DIRECTION,
  GAME_SPEED,
  INITIAL_SNAKE_CELLS,
  ROW_HEIGHT,
} from '../constants';
import useSnakeControls from '../hooks/useSnakeControls';
import GameBoardCell from './GameBoardCell';

const GameBoard = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const { moveSnake } = useSnakeControls({ setSnakeCells });

  const directionRef = useRef<DIRECTION>(DIRECTION.RIGHT);

  useEffect(() => {
    if (!gameStarted) return;

    const intervalId = setInterval(() => {
      moveSnake(directionRef.current);
    }, GAME_SPEED);

    return () => clearInterval(intervalId);
  }, [gameStarted, moveSnake]);

  useEffect(() => {
    const startGame = () => {
      if (gameStarted) return;

      setGameStarted(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          startGame();
          directionRef.current = DIRECTION.UP;
          break;
        case 'ArrowDown':
          startGame();
          directionRef.current = DIRECTION.DOWN;
          break;
        case 'ArrowLeft':
          startGame();
          directionRef.current = DIRECTION.LEFT;
          break;
        case 'ArrowRight':
          startGame();
          directionRef.current = DIRECTION.RIGHT;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => {
    return (
      <div
        key={rowIndex}
        className='w-full flex'
        style={{ height: ROW_HEIGHT }}
      >
        {Array.from({ length: BOARD_DIMENSIONS.width }).map((_, index) => (
          <GameBoardCell
            key={index}
            snakeCells={snakeCells}
            rowIndex={rowIndex}
            cellIndex={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='w-full h-full mx-auto aspect-square max-w-[500px] max-h-[500px]'>
      {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
        renderGameBoardRow({ rowIndex: index })
      )}
    </div>
  );
};

export default GameBoard;
