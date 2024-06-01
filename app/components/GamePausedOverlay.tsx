import { Card, CardBody } from "@nextui-org/card";

const GamePausedOverlay = () => {
  return (
    <Card className="rounded-none absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <CardBody className="flex justify-center items-center bg-transparent p-8">
        <p className="text-tiny text-white/60 uppercase font-bold">
          Press Esc or hit Unpause to resume
        </p>
        <h4 className="text-white/90 font-large text-3xl">Game Paused</h4>
      </CardBody>
    </Card>
  );
};

export default GamePausedOverlay;
