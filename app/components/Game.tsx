"use client";

import { useDisclosure } from "@nextui-org/modal";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BOARD_DIMENSIONS,
  Direction,
  GAME_SPEED,
  INITIAL_FOOD_CELL,
  INITIAL_SNAKE_CELLS,
} from "../constants";
import useSnakeControls from "../hooks/useSnakeControls";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GamePanel from "./GamePanel";
import WelcomeModal from "./WelcomeModal";

const Game = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const [foodCell, setFoodCell] = useState(INITIAL_FOOD_CELL);
  const [isMoveMade, setIsMoveMade] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isGameOverModalOpen,
    onOpen: onGameOverModalOpen,
    onOpenChange: onGameOverModalOpenChange,
  } = useDisclosure();
  const { moveSnake } = useSnakeControls({ setSnakeCells });

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>(Direction.Right);

  const lastSnakeCell = snakeCells[snakeCells.length - 1];

  const handleGameOver = useCallback(() => {
    clearInterval(intervalIdRef.current as NodeJS.Timeout);
    setIsGameStarted(false);
    onGameOverModalOpen();
  }, [onGameOverModalOpen]);

  useEffect(() => {
    if (!isGameStarted || isGamePaused) return;

    intervalIdRef.current = setInterval(() => {
      setIsMoveMade(false);

      const isOutOfBounds =
        lastSnakeCell.x < 0 ||
        lastSnakeCell.x > BOARD_DIMENSIONS.width ||
        lastSnakeCell.y < 0 ||
        lastSnakeCell.y > BOARD_DIMENSIONS.height;

      if (isOutOfBounds) {
        handleGameOver();
        return;
      }

      moveSnake(directionRef.current);
    }, GAME_SPEED);

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [isGameStarted, isGamePaused, moveSnake, lastSnakeCell, handleGameOver]);

  useEffect(() => {
    const startGame = () => {
      if (isGameStarted) return;

      setIsGameStarted(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          startGame();
          if (directionRef.current === Direction.Down || isMoveMade) break;
          directionRef.current = Direction.Up;
          setIsMoveMade(true);
          break;
        case "ArrowDown":
          startGame();
          if (directionRef.current === Direction.Up || isMoveMade) break;
          directionRef.current = Direction.Down;
          setIsMoveMade(true);
          break;
        case "ArrowLeft":
          startGame();
          if (directionRef.current === Direction.Right || isMoveMade) break;
          directionRef.current = Direction.Left;
          setIsMoveMade(true);
          break;
        case "ArrowRight":
          startGame();
          if (directionRef.current === Direction.Left || isMoveMade) break;
          directionRef.current = Direction.Right;
          setIsMoveMade(true);
          break;
        case "Escape":
          if (isGamePaused) {
            setIsGamePaused(false);
            break;
          }
          setIsGamePaused(true);
          clearInterval(intervalIdRef.current as NodeJS.Timeout);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isGameStarted,
    isGamePaused,
    setIsGamePaused,
    setIsGameStarted,
    isMoveMade,
  ]);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handlePlayAgain = () => {
    setScore(0);
    directionRef.current = Direction.Right;
    setSnakeCells(INITIAL_SNAKE_CELLS);
    setFoodCell(INITIAL_FOOD_CELL);
  };

  return (
    <>
      {name && !isOpen && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <GamePanel
            score={score}
            intervalId={intervalIdRef.current as NodeJS.Timeout}
            isGamePaused={isGamePaused}
            setIsGamePaused={setIsGamePaused}
          />
          <GameBoard
            score={score}
            setScore={setScore}
            snakeCells={snakeCells}
            setSnakeCells={setSnakeCells}
            isGamePaused={isGamePaused}
            direction={directionRef.current}
            onGameOver={handleGameOver}
            foodCell={foodCell}
            setFoodCell={setFoodCell}
          />
        </div>
      )}
      <WelcomeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name={name}
        setName={setName}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        onOpenChange={onGameOverModalOpenChange}
        name={name}
        score={score}
        onPlayAgain={handlePlayAgain}
      />
    </>
  );
};

export default Game;
