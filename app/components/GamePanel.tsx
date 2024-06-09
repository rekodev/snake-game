import React from "react";
import ScoreCard from "./ScoreCard";
import { Button } from "@nextui-org/button";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";

type Props = {
  score: number;
  intervalId: NodeJS.Timeout;
  isGamePaused: boolean;
  isGameStarted: boolean;
  setIsGamePaused: (isGamePaused: boolean) => void;
};

const GamePanel = ({
  score,
  intervalId,
  isGameStarted,
  isGamePaused,
  setIsGamePaused,
}: Props) => {
  const handlePause = () => {
    if (isGamePaused) {
      setIsGamePaused(false);
      return;
    }

    setIsGamePaused(true);
    clearInterval(intervalId);
  };

  return (
    <div className="flex w-full justify-between">
      <ScoreCard score={score} />{" "}
      <Button
        isDisabled={!isGameStarted}
        className="h-12"
        onPress={handlePause}
      >
        {isGamePaused ? (
          <>
            <PlayIcon />
            <p>Play</p>
          </>
        ) : (
          <>
            <PauseIcon />
            <p>Pause</p>
          </>
        )}
      </Button>
    </div>
  );
};

export default GamePanel;
