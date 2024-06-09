import { BOARD_DIMENSIONS, Direction, ROW_HEIGHT } from "../constants";
import { GameCell } from "../types";
import GameBoardCell from "./GameBoardCell";
import GameOverlay from "./GameOverlay";

type Props = {
  snakeCells: Array<GameCell>;
  isGameStarted: boolean;
  isGamePaused: boolean;
  direction: Direction;
  foodCell: GameCell;
  images: Record<string, HTMLImageElement>;
};

const GameBoard = ({
  snakeCells,
  isGameStarted,
  isGamePaused,
  direction,
  foodCell,

  images: loadedImages,
}: Props) => {
  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => (
    <div key={rowIndex} className="flex w-full" style={{ height: ROW_HEIGHT }}>
      {Array.from({ length: BOARD_DIMENSIONS.width }).map((_, index) => (
        <GameBoardCell
          key={index}
          snakeCells={snakeCells}
          foodCell={foodCell}
          rowIndex={rowIndex}
          cellIndex={index}
          direction={direction}
          loadedImages={loadedImages}
        />
      ))}
    </div>
  );

  return (
    <div className="relative aspect-square w-full rounded-lg bg-primary p-6">
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
