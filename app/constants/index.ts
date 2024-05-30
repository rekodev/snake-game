export enum DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const GAME_SPEED = 135 as const;

export const BOARD_DIMENSIONS = {
  width: 15,
  height: 15,
} as const;

export const ROW_HEIGHT = `${(
  100 / BOARD_DIMENSIONS.height
).toString()}%` as const;
export const CELL_WIDTH = `${(
  100 / BOARD_DIMENSIONS.width
).toString()}%` as const;

export const INITIAL_SNAKE_CELLS = [
  { x: 7, y: 1 },
  { x: 7, y: 2 },
  { x: 7, y: 3 },
  { x: 7, y: 4 },
];

export const MAX_SCORE =
  BOARD_DIMENSIONS.width * BOARD_DIMENSIONS.height - INITIAL_SNAKE_CELLS.length;
