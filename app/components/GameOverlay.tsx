import { Card, CardBody } from "@nextui-org/card";

type Props = {
  isGameStarted: boolean;
};

const GameOverlay = ({ isGameStarted }: Props) => {
  return (
    <Card className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-none bg-black bg-opacity-50">
      <CardBody className="flex items-center justify-center bg-transparent p-8">
        <p className="text-tiny font-bold uppercase text-white/60">
          {isGameStarted
            ? "Press Esc or Spacebar or hit Play to resume"
            : "Press any of the Arrow Keys to start"}
        </p>
        <h4 className="font-large text-3xl text-white/90">
          {isGameStarted ? "Game Paused" : "Play"}
        </h4>
      </CardBody>
    </Card>
  );
};

export default GameOverlay;
