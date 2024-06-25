"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type ContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

const NameContext = createContext<ContextType>({ name: "", setName: () => {} });

type Props = {
  children: ReactNode;
};

const NameProvider = ({ children }: Props) => {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export { NameContext, NameProvider };
