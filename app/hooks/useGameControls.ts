import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { Direction } from "../constants";

type Props = {
  intervalIdRef: MutableRefObject<NodeJS.Timeout | null>;
  directionRef: MutableRefObject<Direction>;
  onGameOverModalOpen: () => void;
};

const useGameControls = ({
  intervalIdRef,
  directionRef,
  onGameOverModalOpen,
}: Props) => {
  const [isMoveMade, setIsMoveMade] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) return;

    const handleArrowKeyDown = (
      direction: Direction,
      oppositeDirection: Direction,
    ) => {
      if (!isGameStarted) setIsGameStarted(true);

      if (isGamePaused) return;
      if (directionRef.current === oppositeDirection || isMoveMade) return;

      directionRef.current = direction;
      setIsMoveMade(true);
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
          handleArrowKeyDown(Direction.Up, Direction.Down);
          break;
        case "ArrowDown":
          handleArrowKeyDown(Direction.Down, Direction.Up);
          break;
        case "ArrowLeft":
          handleArrowKeyDown(Direction.Left, Direction.Right);
          break;
        case "ArrowRight":
          handleArrowKeyDown(Direction.Right, Direction.Left);
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
    isMoveMade,
    intervalIdRef,
    directionRef,
  ]);

  const handleGameOver = useCallback(() => {
    clearInterval(intervalIdRef.current as NodeJS.Timeout);
    setIsGameOver(true);
    setIsGameStarted(false);
    onGameOverModalOpen();
  }, [onGameOverModalOpen, intervalIdRef]);

  return {
    isGameStarted,
    isGamePaused,
    isGameOver,
    setIsGameOver,
    setIsGamePaused,
    setIsMoveMade,
    handleGameOver,
  };
};

export default useGameControls;
