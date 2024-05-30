import { useEffect, useRef, useState } from "react";
import {
  BOARD_DIMENSIONS,
  DIRECTION,
  INITIAL_SNAKE_CELLS,
  ROW_HEIGHT,
} from "../constants";
import useSnakeControls from "../hooks/useSnakeControls";
import GameBoardCell from "./GameBoardCell";

const GameBoard = () => {
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const { moveSnake } = useSnakeControls({ setSnakeCells });

  const directionRef = useRef<DIRECTION>(DIRECTION.RIGHT);

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake(directionRef.current);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          directionRef.current = DIRECTION.UP;
          break;
        case "ArrowDown":
          directionRef.current = DIRECTION.DOWN;
          break;
        case "ArrowLeft":
          directionRef.current = DIRECTION.LEFT;
          break;
        case "ArrowRight":
          directionRef.current = DIRECTION.RIGHT;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => {
    return (
      <div
        key={rowIndex}
        className="w-full flex"
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
    <div className="w-full h-full mx-auto aspect-square max-w-[500px] max-h-[500px]">
      {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
        renderGameBoardRow({ rowIndex: index })
      )}
    </div>
  );
};

export default GameBoard;
