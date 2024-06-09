import { Card, CardBody } from "@nextui-org/card";
import { useContext } from "react";
import { HighScoreContext } from "../contexts/HighScoreContext";
import StarIcon from "./icons/StarIcon";
import TrophyIcon from "./icons/TrophyIcon";

type Props = {
  score: number;
};

const ScoreCard = ({ score }: Props) => {
  const { highScore } = useContext(HighScoreContext);

  return (
    <Card className="flex min-w-max max-w-max">
      <CardBody>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <StarIcon />
            {score}
          </div>
          <div className="flex items-center gap-1">
            <TrophyIcon />
            {highScore}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
