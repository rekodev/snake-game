import { MutableRefObject, useCallback, useContext } from "react";
import { Direction } from "../constants";
import { HighScoreContext } from "../contexts/HighScoreContext";
import { GameCell } from "../types";
import {
  checkIfGameOver,
  determineNextSnakeCells,
  determineTailDirection,
  generateNewFoodCell,
} from "../utils";

type Props = {
  snakeCells: Array<GameCell>;
  setSnakeCells: (cells: Array<GameCell>) => void;
  directionRef: MutableRefObject<Direction>;
  setDirection: (direction: Direction) => void;
  foodCell: GameCell;
  setFoodCell: (cell: GameCell) => void;
  score: number;
  setScore: (score: number) => void;
  onGameOver: () => void;
};

const useAdvanceGame = ({
  setScore,
  setFoodCell,
  setSnakeCells,
  snakeCells,
  score,
  directionRef,
  foodCell,
  setDirection,
  onGameOver: handleGameOver,
}: Props) => {
  const { highScore, setHighScore } = useContext(HighScoreContext);

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
      if (score > highScore) setHighScore(score);
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
    directionRef,
    setDirection,
    score,
    highScore,
    setHighScore,
    foodCell,
    handleGameOver,
    eatFood,
  ]);

  return {
    advanceGame,
  };
};

export default useAdvanceGame;
