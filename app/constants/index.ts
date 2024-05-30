export enum DIRECTION {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const BOARD_DIMENSIONS = {
  width: 15,
  height: 15,
};

export const ROW_HEIGHT = `${(100 / BOARD_DIMENSIONS.height).toString()}%`;
export const CELL_WIDTH = `${(100 / BOARD_DIMENSIONS.width).toString()}%`;

export const INITIAL_SNAKE_CELLS = [
  { x: 7, y: 1 },
  { x: 7, y: 2 },
  { x: 7, y: 3 },
  { x: 7, y: 4 },
];
