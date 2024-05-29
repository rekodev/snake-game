import { NextUIProvider } from '@nextui-org/system';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <NextUIProvider className='flex flex-col min-h-dvh'>
      {children}
    </NextUIProvider>
  );
};

export default Providers;
