export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export enum BodyCellPositioning {
  Horizontal = "horizontal",
  Vertical = "vertical",
  TopRight = "topRight",
  TopLeft = "topLeft",
  BottomRight = "bottomRight",
  BottomLeft = "bottomLeft",
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
  { y: 7, x: 1 },
  { y: 7, x: 2 },
  { y: 7, x: 3 },
  { y: 7, x: 4 },
];

export const MAX_SCORE =
  BOARD_DIMENSIONS.width * BOARD_DIMENSIONS.height - INITIAL_SNAKE_CELLS.length;
