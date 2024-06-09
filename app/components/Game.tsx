"use client";

import { useDisclosure } from "@nextui-org/modal";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Direction,
  GAME_SPEED,
  INITIAL_FOOD_CELL,
  INITIAL_SNAKE_CELLS,
} from "../constants";
import { IMAGE_URLS } from "../constants/imageUrls";
import { HighScoreContext } from "../contexts/HighScoreContext";
import { NameContext } from "../contexts/NameContext";
import useGameControls from "../hooks/useGameControls";
import { GameCell } from "../types";
import {
  checkIfGameOver,
  determineNextSnakeCells,
  determineTailDirection,
  generateNewFoodCell,
} from "../utils";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GamePanel from "./GamePanel";
import PreloadedSnakeImages from "./PreloadedSnakeImages";
import WelcomeModal from "./WelcomeModal";

const Game = () => {
  const { name, setName } = useContext(NameContext);
  const { highScore, setHighScore } = useContext(HighScoreContext);

  const [score, setScore] = useState(0);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const [foodCell, setFoodCell] = useState(INITIAL_FOOD_CELL);
  const [direction, setDirection] = useState(Direction.Right);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>(Direction.Right);

  const {
    isOpen: isWelcomeModalOpen,
    onOpen: onWelcomeModalOpen,
    onOpenChange: onWelcomeModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isGameOverModalOpen,
    onOpen: onGameOverModalOpen,
    onOpenChange: onGameOverModalOpenChange,
  } = useDisclosure();

  const {
    isGameStarted,
    isGamePaused,
    setIsGameOver,
    setIsGamePaused,
    handleGameOver,
  } = useGameControls({
    directionRef,
    intervalIdRef,
    onGameOverModalOpen,
    currentDirection: direction,
    isWelcomeModalOpen,
  });

  const setHighScoreIfNew = useCallback(() => {
    if (score <= highScore) return;

    setHighScore(score);
  }, [highScore, setHighScore, score]);

  const eatFood = useCallback(
    (nextCells: Array<GameCell>) => {
      const newSnakeCells = [...nextCells];
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
      setFoodCell(generateNewFoodCell(snakeCells));
      setSnakeCells(newSnakeCells);
    },
    [score, setScore, snakeCells, setSnakeCells, setFoodCell],
  );

  const advanceGame = useCallback(() => {
    const nextSnakeCells = determineNextSnakeCells(
      snakeCells,
      directionRef.current,
    );

    if (checkIfGameOver(nextSnakeCells)) {
      setHighScoreIfNew();
      handleGameOver();

      return;
    }

    const isEatingFood = nextSnakeCells.some(
      (cell) => cell.x === foodCell.x && cell.y === foodCell.y,
    );

    if (isEatingFood) {
      eatFood(nextSnakeCells);
    } else {
      setSnakeCells(nextSnakeCells);
    }

    setDirection(directionRef.current);
  }, [
    snakeCells,
    setSnakeCells,
    setDirection,
    setHighScoreIfNew,
    handleGameOver,
    foodCell,
    eatFood,
  ]);

  useEffect(() => {
    if (!isGameStarted || isGamePaused) return;

    intervalIdRef.current = setInterval(advanceGame, GAME_SPEED);

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [advanceGame, isGameStarted, isGamePaused]);

  useEffect(() => {
    if (name) return;

    onWelcomeModalOpen();
  }, [onWelcomeModalOpen, name]);

  const handlePlayAgain = () => {
    directionRef.current = Direction.Right;
    setDirection(Direction.Right);
    setScore(0);
    setSnakeCells(INITIAL_SNAKE_CELLS);
    setFoodCell(INITIAL_FOOD_CELL);
    setIsGameOver(false);
  };

  return (
    <>
      <section className="relative mx-auto mt-16 flex aspect-square max-h-[70vh] flex-1 flex-col items-center justify-start gap-4">
        <GamePanel
          score={score}
          intervalId={intervalIdRef.current as NodeJS.Timeout}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
          setIsGamePaused={setIsGamePaused}
        />
        <GameBoard
          snakeCells={snakeCells}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
          direction={direction}
          foodCell={foodCell}
        />
      </section>

      <PreloadedSnakeImages imageUrls={IMAGE_URLS} />
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onOpenChange={onWelcomeModalOpenChange}
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
