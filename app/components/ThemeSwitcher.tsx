'use client';

import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (theme === 'dark') {
    return (
      <Button
        isIconOnly
        onPress={() => setTheme('light')}
        color='default'
        variant='bordered'
      >
        <SunIcon />
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      onPress={() => setTheme('dark')}
      color='default'
      variant='bordered'
    >
      <MoonIcon />
    </Button>
  );
}
