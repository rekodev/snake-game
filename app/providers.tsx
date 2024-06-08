import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { HighScoreProvider } from "./contexts/HighScoreContext";
import { NameProvider } from "./contexts/NameContext";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <NextUIProvider className="flex min-h-dvh flex-col">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <NameProvider>
          <HighScoreProvider>{children}</HighScoreProvider>
        </NameProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
