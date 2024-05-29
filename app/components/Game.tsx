'use client';

import { useDisclosure } from '@nextui-org/modal';
import { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import WelcomeModal from './WelcomeModal';

const Game = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <h1>Game</h1>
      {name && !isOpen && <GameBoard />}
      <WelcomeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name={name}
        setName={setName}
      />
    </>
  );
};

export default Game;
