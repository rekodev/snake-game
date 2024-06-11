import { useEffect, useState } from "react";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    handleResize();
    setIsLoading(false);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isDesktop, isLoading };
};

export default useIsDesktop;
