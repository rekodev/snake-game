"use client";

import { useDisclosure } from "@nextui-org/modal";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Direction,
  GAME_SPEED,
  INITIAL_FOOD_CELL,
  INITIAL_SNAKE_CELLS,
} from "../constants";
import { HighScoreContext } from "../contexts/HighScoreContext";
import { NameContext } from "../contexts/NameContext";
import useGameControls from "../hooks/useGameControls";
import { checkIfGameOver, determineNextSnakeCells } from "../utils";
import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GamePanel from "./GamePanel";
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
  });

  const setHighScoreIfNew = useCallback(() => {
    if (score <= highScore) return;

    setHighScore(score);
  }, [highScore, setHighScore, score]);

  useEffect(() => {
    if (!isGameStarted || isGamePaused) return;

    intervalIdRef.current = setInterval(() => {
      const nextSnakeCells = determineNextSnakeCells(
        snakeCells,
        directionRef.current,
      );

      if (checkIfGameOver(nextSnakeCells)) {
        setHighScoreIfNew();
        handleGameOver();

        return;
      }

      setSnakeCells(nextSnakeCells);
      setDirection(directionRef.current);
    }, GAME_SPEED);

    return () => clearInterval(intervalIdRef.current as NodeJS.Timeout);
  }, [
    snakeCells,
    isGameStarted,
    isGamePaused,
    handleGameOver,
    setHighScoreIfNew,
  ]);

  useEffect(() => {
    if (name) return;

    onWelcomeModalOpen();
  }, [onWelcomeModalOpen, name]);

  const handlePlayAgain = () => {
    setScore(0);
    directionRef.current = Direction.Right;
    setDirection(Direction.Right);
    setSnakeCells(INITIAL_SNAKE_CELLS);
    setFoodCell(INITIAL_FOOD_CELL);
    setIsGameOver(false);
  };

  return (
    <>
      <div className="mx-auto flex aspect-square max-h-[70dvh] flex-col items-center justify-center gap-4">
        <GamePanel
          score={score}
          intervalId={intervalIdRef.current as NodeJS.Timeout}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
          setIsGamePaused={setIsGamePaused}
        />
        <GameBoard
          score={score}
          setScore={setScore}
          snakeCells={snakeCells}
          setSnakeCells={setSnakeCells}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
          direction={direction}
          foodCell={foodCell}
          setFoodCell={setFoodCell}
        />
      </div>

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
