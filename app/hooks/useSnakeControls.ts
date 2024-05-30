import React, { Dispatch, SetStateAction } from "react";
import { DIRECTION } from "../constants";
import { SnakeCells } from "../types";

const useSnakeControls = ({
  setSnakeCells,
}: {
  setSnakeCells: Dispatch<SetStateAction<SnakeCells>>;
}) => {
  const moveSnake = (direction: DIRECTION) => {
    setSnakeCells((snakeCells) => {
      const lastSnakeCell = snakeCells[snakeCells.length - 1];

      let newHead;

      switch (direction) {
        case DIRECTION.UP:
          newHead = {
            x: lastSnakeCell.x - 1,
            y: lastSnakeCell.y,
          };
          break;
        case DIRECTION.DOWN:
          newHead = {
            x: lastSnakeCell.x + 1,
            y: lastSnakeCell.y,
          };
          break;
        case DIRECTION.LEFT:
          newHead = {
            x: lastSnakeCell.x,
            y: lastSnakeCell.y - 1,
          };
          break;
        case DIRECTION.RIGHT:
          newHead = {
            x: lastSnakeCell.x,
            y: lastSnakeCell.y + 1,
          };
          break;
      }

      const newSnakeCells = [...snakeCells.slice(1), newHead];

      return newSnakeCells;
    });
  };

  return { moveSnake };
};

export default useSnakeControls;
