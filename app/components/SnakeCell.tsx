import { BodyCellPositioning, Direction } from "../constants";
import { GameCell } from "../types";
import { determineBodyCellPositioning, determineTailDirection } from "../utils";
import SnakeImage from "./SnakeImage";

type Props = {
  snakeCells: Array<GameCell>;
  direction: Direction;
  rowIndex: number;
  cellIndex: number;
  isHead: boolean;
  isTail: boolean;
};

const SnakeCell = ({
  snakeCells,
  direction,
  rowIndex,
  cellIndex,
  isHead,
  isTail,
}: Props) => {
  const renderSnakeHead = () => {
    if (!isHead) return;

    switch (direction) {
      case Direction.Up:
        return <SnakeImage src="/images/head_up.png" alt="Snake Head Up" />;
      case Direction.Down:
        return <SnakeImage src="/images/head_down.png" alt="Snake Head Down" />;
      case Direction.Left:
        return <SnakeImage src="/images/head_left.png" alt="Snake Head Left" />;
      case Direction.Right:
        return (
          <SnakeImage src="/images/head_right.png" alt="Snake Head Right" />
        );
    }
  };

  const renderSnakeTail = () => {
    if (!isTail) return;

    const tailDirection = determineTailDirection(snakeCells);

    switch (tailDirection) {
      case Direction.Up:
        return <SnakeImage src="/images/tail_up.png" alt="Snake Tail Up" />;
      case Direction.Down:
        return <SnakeImage src="/images/tail_down.png" alt="Snake Tail Down" />;
      case Direction.Left:
        return <SnakeImage src="/images/tail_left.png" alt="Snake Tail Left" />;
      case Direction.Right:
        return (
          <SnakeImage src="/images/tail_right.png" alt="Snake Tail Right" />
        );
    }
  };

  const renderSnakeBodyCell = () => {
    if (isHead || isTail) return null;

    const snakeCellIndex = snakeCells.findIndex(
      (cell) => cell.x === cellIndex && cell.y === rowIndex,
    );

    const cellPositioning = determineBodyCellPositioning(
      snakeCells,
      snakeCellIndex,
    );

    switch (cellPositioning) {
      case BodyCellPositioning.Horizontal:
        return (
          <SnakeImage
            src="/images/body_horizontal.png"
            alt="Snake Body Horizontal"
          />
        );
      case BodyCellPositioning.Vertical:
        return (
          <SnakeImage
            src="/images/body_vertical.png"
            alt="Snake Body Vertical"
          />
        );
      case BodyCellPositioning.TopRight:
        return (
          <SnakeImage
            src="/images/body_topright.png"
            alt="Snake Body Top Right"
          />
        );
      case BodyCellPositioning.TopLeft:
        return (
          <SnakeImage
            src="/images/body_topleft.png"
            alt="Snake Body Top Left"
          />
        );
      case BodyCellPositioning.BottomRight:
        return (
          <SnakeImage
            src="/images/body_bottomright.png"
            alt="Snake Body Bottom Right"
          />
        );
      case BodyCellPositioning.BottomLeft:
        return (
          <SnakeImage
            src="/images/body_bottomleft.png"
            alt="Snake Body Bottom Left"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderSnakeHead()}
      {renderSnakeTail()}
      {renderSnakeBodyCell()}
    </>
  );
};

export default SnakeCell;
