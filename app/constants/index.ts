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

export const GRID_SIZE = 15 as const;

export const INITIAL_FOOD_CELL = { x: 12, y: 7 };
export const INITIAL_SNAKE_CELLS = [
  { y: 7, x: 1 },
  { y: 7, x: 2 },
  { y: 7, x: 3 },
  { y: 7, x: 4 },
];

export const MAX_SCORE = GRID_SIZE * GRID_SIZE - INITIAL_SNAKE_CELLS.length;

export const LIGHT_GAME_BOARD_CELL_COLOR = "#bbf7d0";
export const DARK_GAME_BOARD_CELL_COLOR = "#dcfce7";
