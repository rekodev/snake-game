import {
  DARK_GAME_BOARD_CELL_COLOR,
  LIGHT_GAME_BOARD_CELL_COLOR,
} from "../constants";

export const drawBoard = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cellSize: number,
) => {
  for (let y = 0; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      if (((x + y) / cellSize) % 2 === 0) {
        ctx.fillStyle = LIGHT_GAME_BOARD_CELL_COLOR;
      } else {
        ctx.fillStyle = DARK_GAME_BOARD_CELL_COLOR;
      }
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
};
