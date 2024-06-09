import Image from "next/image";
import { BodyCellPositioning, Direction } from "../constants";
import { GameCell } from "../types";
import { determineBodyCellPositioning, determineTailDirection } from "../utils";

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
  const renderSnakeImage = (src: string, alt: string) => (
    <Image
      sizes="(max-width: 700px) 50px, 50px"
      quality={50}
      priority
      loading="eager"
      src={src}
      alt={alt}
      fill
      className="object-contain"
    />
  );

  const renderSnakeHead = () => {
    if (!isHead) return;

    switch (direction) {
      case Direction.Up:
        return renderSnakeImage("/images/head_up.png", "Snake Head Up");
      case Direction.Down:
        return renderSnakeImage("/images/head_down.png", "Snake Head Down");
      case Direction.Left:
        return renderSnakeImage("/images/head_left.png", "Snake Head Left");
      case Direction.Right:
        return renderSnakeImage("/images/head_right.png", "Snake Head Right");
    }
  };

  const renderSnakeTail = () => {
    if (!isTail) return;

    const tailDirection = determineTailDirection(snakeCells);

    switch (tailDirection) {
      case Direction.Up:
        return renderSnakeImage("/images/tail_up.png", "Snake Tail Up");
      case Direction.Down:
        return renderSnakeImage("/images/tail_down.png", "Snake Tail Down");
      case Direction.Left:
        return renderSnakeImage("/images/tail_left.png", "Snake Tail Left");
      case Direction.Right:
        return renderSnakeImage("/images/tail_right.png", "Snake Tail Right");
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
        return renderSnakeImage(
          "/images/body_horizontal.png",
          "Snake Body Horizontal",
        );
      case BodyCellPositioning.Vertical:
        return renderSnakeImage(
          "/images/body_vertical.png",
          "Snake Body Vertical",
        );
      case BodyCellPositioning.TopRight:
        return renderSnakeImage(
          "/images/body_topright.png",
          "Snake Body Top Right",
        );
      case BodyCellPositioning.TopLeft:
        return renderSnakeImage(
          "/images/body_topleft.png",
          "Snake Body Top Left",
        );
      case BodyCellPositioning.BottomRight:
        return renderSnakeImage(
          "/images/body_bottomright.png",
          "Snake Body Bottom Right",
        );
      case BodyCellPositioning.BottomLeft:
        return renderSnakeImage(
          "/images/body_bottomleft.png",
          "Snake Body Bottom Left",
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
