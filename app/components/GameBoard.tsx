import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useRef, useState } from "react";
import { BOARD_DIMENSIONS, Direction, ROW_HEIGHT } from "../constants";
import { GameCell } from "../types";
import { determineTailDirection, generateNewFoodCell } from "../utils";
import GameBoardCell from "./GameBoardCell";
import GameOverModal from "./GameOverModal";
import GamePausedOverlay from "./GamePausedOverlay";

type Props = {
  name: string;
  score: number;
  setScore: (score: number) => void;
  snakeCells: Array<GameCell>;
  setSnakeCells: (snakeCells: Array<GameCell>) => void;
  isGamePaused: boolean;
  direction: Direction;
};

const GameBoard = ({
  name,
  snakeCells,
  setSnakeCells,
  score,
  setScore,
  isGamePaused,
  direction,
}: Props) => {
  const [foodCell, setFoodCell] = useState({ x: 12, y: 7 });

  const { isOpen, onOpenChange } = useDisclosure();

  const eatFood = () => {
    const newSnakeCells = [...snakeCells];
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
    setSnakeCells(newSnakeCells);
    setFoodCell(generateNewFoodCell(snakeCells));
  };

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => {
    return (
      <div
        key={rowIndex}
        className="w-full flex"
        style={{ height: ROW_HEIGHT }}
      >
        {Array.from({ length: BOARD_DIMENSIONS.width }).map((_, index) => (
          <GameBoardCell
            key={index}
            snakeCells={snakeCells}
            foodCell={foodCell}
            onEatFood={eatFood}
            rowIndex={rowIndex}
            cellIndex={index}
            direction={direction}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="relative w-full h-full mx-auto aspect-square max-w-[500px] max-h-[500px]">
        {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
          renderGameBoardRow({ rowIndex: index })
        )}

        {isGamePaused && <GamePausedOverlay />}
      </div>

      <GameOverModal
        name={name}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        score={score}
      />
    </>
  );
};

export default GameBoard;
