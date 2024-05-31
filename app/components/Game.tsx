"use client";

import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import WelcomeModal from "./WelcomeModal";
import ScoreCard from "./ScoreCard";

const Game = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      {name && !isOpen && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <ScoreCard score={score} />
          <GameBoard name={name} score={score} setScore={setScore} />
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
