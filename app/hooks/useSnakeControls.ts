import { Dispatch, SetStateAction, useCallback } from "react";
import { Direction } from "../constants";
import { SnakeCells } from "../types";

const useSnakeControls = ({
  setSnakeCells,
}: {
  setSnakeCells: Dispatch<SetStateAction<SnakeCells>>;
}) => {
  const moveSnake = useCallback(
    (direction: Direction) => {
      setSnakeCells((snakeCells) => {
        const lastSnakeCell = snakeCells[snakeCells.length - 1];

        let newHead;

        switch (direction) {
          case Direction.Up:
            newHead = {
              x: lastSnakeCell.x - 1,
              y: lastSnakeCell.y,
            };
            break;
          case Direction.Down:
            newHead = {
              x: lastSnakeCell.x + 1,
              y: lastSnakeCell.y,
            };
            break;
          case Direction.Left:
            newHead = {
              x: lastSnakeCell.x,
              y: lastSnakeCell.y - 1,
            };
            break;
          case Direction.Right:
            newHead = {
              x: lastSnakeCell.x,
              y: lastSnakeCell.y + 1,
            };
            break;
        }

        const newSnakeCells = [...snakeCells.slice(1), newHead];

        return newSnakeCells;
      });
    },
    [setSnakeCells]
  );

  return { moveSnake };
};

export default useSnakeControls;
