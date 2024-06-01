"use client";

import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useRef, useState } from "react";
import { Direction, GAME_SPEED, INITIAL_SNAKE_CELLS } from "../constants";
import useSnakeControls from "../hooks/useSnakeControls";
import GameBoard from "./GameBoard";
import GamePanel from "./GamePanel";
import WelcomeModal from "./WelcomeModal";

const Game = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { moveSnake } = useSnakeControls({ setSnakeCells });

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>(Direction.Right);

  useEffect(() => {
    if (!isGameStarted || isGamePaused) return;

    intervalIdRef.current = setInterval(() => {
      moveSnake(directionRef.current);
    }, GAME_SPEED);

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [isGameStarted, isGamePaused, moveSnake]);

  useEffect(() => {
    const startGame = () => {
      if (isGameStarted) return;

      setIsGameStarted(true);
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
  }, [isGameStarted, isGamePaused, setIsGamePaused, setIsGameStarted]);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

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
            name={name}
            score={score}
            setScore={setScore}
            snakeCells={snakeCells}
            setSnakeCells={setSnakeCells}
            isGamePaused={isGamePaused}
            direction={directionRef.current}
          />
        </div>
      )}
      <WelcomeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name={name}
        setName={setName}
      />
    </>
  );
};

export default Game;
