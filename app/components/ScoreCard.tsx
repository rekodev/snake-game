import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";

type Props = {
  score: number;
};

const ScoreCard = ({ score }: Props) => {
  return (
    <Card className="flex min-w-max max-w-max">
      <CardBody>
        <div className="flex">
          Score:
          <span className="pl-1">
            <Image src="/images/apple.png" alt="Apple" width={24} height={24} />
          </span>
          {score}
        </div>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
