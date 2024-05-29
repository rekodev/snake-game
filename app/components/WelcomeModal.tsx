import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  name: string;
  setName: (name: string) => void;
};

const WelcomeModal = ({ isOpen, onOpenChange, name, setName }: Props) => {
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
                type='text'
                label='Name'
                value={name}
                onValueChange={setName}
              />
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={!name} color='success' onPress={onClose}>
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
