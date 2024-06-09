"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  name: string;
  setName: (name: string) => void;
};

const WelcomeModal = ({ isOpen, onOpenChange, name, setName }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isInvalid = name.length < 2 || name.length > 20;

  const handleSubmit = (onClose: () => void) => {
    setIsSubmitted(true);

    if (isInvalid) return;

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      hideCloseButton
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Welcome to Snake Game!</ModalHeader>
            <ModalBody>
              <p>Enter your name to start playing</p>
              <Input
                type="text"
                label="Name"
                value={name}
                isInvalid={isSubmitted && isInvalid}
                errorMessage="Name must be between 2 and 20 characters"
                onValueChange={setName}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="success" onPress={() => handleSubmit(onClose)}>
                Play
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
