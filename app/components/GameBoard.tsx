import { useEffect, useRef, useState } from "react";
import {
  BOARD_DIMENSIONS,
  Direction,
  GAME_SPEED,
  INITIAL_SNAKE_CELLS,
  ROW_HEIGHT,
} from "../constants";
import useSnakeControls from "../hooks/useSnakeControls";
import GameBoardCell from "./GameBoardCell";
import { generateNewFoodCell } from "../utils";
import GameOverModal from "./GameOverModal";
import { useDisclosure } from "@nextui-org/modal";

type Props = {
  name: string;
  score: number;
  setScore: (score: number) => void;
};

const GameBoard = ({ name, score, setScore }: Props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const [foodCell, setFoodCell] = useState({ x: 7, y: 12 });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { moveSnake } = useSnakeControls({ setSnakeCells });

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>(Direction.Right);

  const eatFood = () => {
    const newSnakeCells = [...snakeCells];
    const tail = newSnakeCells[0];
    const nextToTail = newSnakeCells[1];

    let tailDirection: Direction;

    if (tail.x === nextToTail.x) {
      tailDirection = tail.y > nextToTail.y ? Direction.Up : Direction.Down;
    } else {
      tailDirection = tail.x > nextToTail.x ? Direction.Right : Direction.Left;
    }

    switch (tailDirection) {
      case Direction.Down:
        newSnakeCells.unshift({ x: tail.x, y: tail.y - 1 });
        break;
      case Direction.Up:
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
  };

  useEffect(() => {
    if (!gameStarted) return;

    intervalIdRef.current = setInterval(() => {
      moveSnake(directionRef.current);
    }, GAME_SPEED);

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [gameStarted, moveSnake]);

  useEffect(() => {
    const startGame = () => {
      if (gameStarted) return;

      setGameStarted(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          startGame();
          directionRef.current = Direction.Up;
          break;
        case "ArrowDown":
          startGame();
          directionRef.current = Direction.Down;
          break;
        case "ArrowLeft":
          startGame();
          directionRef.current = Direction.Left;
          break;
        case "ArrowRight":
          startGame();
          directionRef.current = Direction.Right;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

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
            foodCell={foodCell}
            onEatFood={eatFood}
            rowIndex={rowIndex}
            cellIndex={index}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full mx-auto aspect-square max-w-[500px] max-h-[500px]">
        {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
          renderGameBoardRow({ rowIndex: index })
        )}
      </div>

      <GameOverModal
        name={name}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        score={score}
      />
    </>
  );
};

export default GameBoard;
