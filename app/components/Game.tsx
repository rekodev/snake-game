"use client";

import { useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import {
  Direction,
  GAME_SPEED,
  INITIAL_FOOD_CELL,
  INITIAL_SNAKE_CELLS,
} from "../constants";
import { NameContext } from "../contexts/NameContext";
import useAdvanceGame from "../hooks/useAdvanceGame";
import useGameControls from "../hooks/useGameControls";
import useIsDesktop from "../hooks/useIsDesktop";
import useLoadAssets from "../hooks/useLoadAssets";

import GameBoard from "./GameBoard";
import GameOverModal from "./GameOverModal";
import GamePanel from "./GamePanel";
import NotAvailable from "./pages/NotAvailable";
import WelcomeModal from "./WelcomeModal";

const Game = () => {
  const { name, setName } = useContext(NameContext);
  const { assets, isLoading: isAssetsLoading } = useLoadAssets();

  const [score, setScore] = useState(0);
  const [snakeCells, setSnakeCells] = useState(INITIAL_SNAKE_CELLS);
  const [foodCell, setFoodCell] = useState(INITIAL_FOOD_CELL);
  const [direction, setDirection] = useState(Direction.Right);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>(Direction.Right);

  const { isDesktop, isLoading: isDesktopLoading } = useIsDesktop();
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
    setIsGameStarted,
  } = useGameControls({
    directionRef,
    intervalIdRef,
    currentDirection: direction,
    isWelcomeModalOpen,
  });

  const handleGameOver = useCallback(() => {
    clearInterval(intervalIdRef.current as NodeJS.Timeout);
    setIsGameOver(true);
    setIsGameStarted(false);
    onGameOverModalOpen();
  }, [onGameOverModalOpen, intervalIdRef, setIsGameStarted, setIsGameOver]);

  const { advanceGame } = useAdvanceGame({
    directionRef,
    setDirection,
    setFoodCell,
    setScore,
    setSnakeCells,
    snakeCells,
    foodCell,
    score,
    onGameOver: handleGameOver,
  });

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

  if (isDesktopLoading || isAssetsLoading)
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <Spinner color="success" />
      </div>
    );

  if (!isDesktop) return <NotAvailable />;

  return (
    <>
      <section className="relative mx-auto flex aspect-square flex-1 flex-col items-center justify-start gap-4">
        <div className="flex flex-col gap-4">
          <GamePanel
            score={score}
            intervalId={intervalIdRef.current as NodeJS.Timeout}
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
            setIsGamePaused={setIsGamePaused}
          />
          <GameBoard
            assets={assets}
            snakeCells={snakeCells}
            foodCell={foodCell}
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
            direction={direction}
          />
        </div>
      </section>

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
