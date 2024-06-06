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
          if (!isGameStarted) break;

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
