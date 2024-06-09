import { useCallback } from "react";
import { BOARD_DIMENSIONS, Direction, ROW_HEIGHT } from "../constants";
import { GameCell } from "../types";
import { determineTailDirection, generateNewFoodCell } from "../utils";
import GameBoardCell from "./GameBoardCell";
import GameOverlay from "./GameOverlay";

type Props = {
  score: number;
  setScore: (score: number) => void;
  snakeCells: Array<GameCell>;
  setSnakeCells: (snakeCells: Array<GameCell>) => void;
  isGameStarted: boolean;
  isGamePaused: boolean;
  direction: Direction;
  foodCell: GameCell;
  setFoodCell: (foodCell: GameCell) => void;
};

const GameBoard = ({
  snakeCells,
  setSnakeCells,
  score,
  setScore,
  isGameStarted,
  isGamePaused,
  direction,
  foodCell,
  setFoodCell,
}: Props) => {
  const eatFood = useCallback(() => {
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
  }, [score, setScore, snakeCells, setSnakeCells, setFoodCell]);

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => (
    <div key={rowIndex} className="flex w-full" style={{ height: ROW_HEIGHT }}>
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

  return (
    <div className="relative h-full w-full rounded-lg bg-primary p-6">
      {Array.from({ length: BOARD_DIMENSIONS.height }).map((_, index) =>
        renderGameBoardRow({ rowIndex: index }),
      )}

      {(!isGameStarted || isGamePaused) && (
        <GameOverlay isGameStarted={isGameStarted} />
      )}
    </div>
  );
};

export default GameBoard;
