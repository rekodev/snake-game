"use client";

import { createContext, useState, ReactNode } from "react";

type ContextType = {
  name: string;
  setName: (name: string) => void;
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
