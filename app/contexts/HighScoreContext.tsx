"use client";

import { createContext, useState, ReactNode } from "react";

type ContextType = {
  highScore: number;
  setHighScore: (highScore: number) => void;
};

const HighScoreContext = createContext<ContextType>({
  highScore: 0,
  setHighScore: () => {},
});

type Props = {
  children: ReactNode;
};

const HighScoreProvider = ({ children }: Props) => {
  const [highScore, setHighScore] = useState(0);

  return (
    <HighScoreContext.Provider value={{ highScore, setHighScore }}>
      {children}
    </HighScoreContext.Provider>
  );
};

export { HighScoreContext, HighScoreProvider };
