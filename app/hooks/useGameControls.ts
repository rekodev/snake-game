import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { Direction } from "../constants";

type Props = {
  intervalIdRef: MutableRefObject<NodeJS.Timeout | null>;
  directionRef: MutableRefObject<Direction>;
  currentDirection: Direction;
  isWelcomeModalOpen: boolean;
};

const useGameControls = ({
  intervalIdRef,
  directionRef,
  currentDirection,
  isWelcomeModalOpen,
}: Props) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const oppositeCurrentDirection = useMemo(() => {
    switch (currentDirection) {
      case Direction.Up:
        return Direction.Down;
      case Direction.Down:
        return Direction.Up;
      case Direction.Left:
        return Direction.Right;
      case Direction.Right:
        return Direction.Left;
    }
  }, [currentDirection]);

  useEffect(() => {
    if (isWelcomeModalOpen || isGameOver) return;

    const handleArrowKeyDown = (direction: Direction) => {
      if (!isGameStarted) setIsGameStarted(true);

      if (isGamePaused) return;
      if (direction === oppositeCurrentDirection) return;

      directionRef.current = direction;
    };

    const handlePause = () => {
      if (!isGameStarted) return;

      if (isGamePaused) {
        setIsGamePaused(false);
        return;
      }

      setIsGamePaused(true);
      clearInterval(intervalIdRef.current as NodeJS.Timeout);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          handleArrowKeyDown(Direction.Up);
          break;
        case "ArrowDown":
          handleArrowKeyDown(Direction.Down);
          break;
        case "ArrowLeft":
          handleArrowKeyDown(Direction.Left);
          break;
        case "ArrowRight":
          handleArrowKeyDown(Direction.Right);
          break;
        case "Escape":
          handlePause();
          break;
        case " ":
          handlePause();
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
    isGameOver,
    intervalIdRef,
    directionRef,
    oppositeCurrentDirection,
    isWelcomeModalOpen,
  ]);

  return {
    isGameStarted,
    isGamePaused,
    isGameOver,
    setIsGameStarted,
    setIsGamePaused,
    setIsGameOver,
  };
};

export default useGameControls;
