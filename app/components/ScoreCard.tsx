import { Card, CardBody } from "@nextui-org/card";

type Props = {
  score: number;
};

const ScoreCard = ({ score }: Props) => {
  return (
    <Card className="max-w-max min-w-max flex">
      <CardBody>Score: {score}</CardBody>
    </Card>
  );
};

export default ScoreCard;
