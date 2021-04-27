import { Modal, ModalOverlay, ModalContent, Flex, ModalBody, Spinner } from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const localSpinner: React.FC<Props> = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent background="#dfdfdf" p={3}>
        <Flex alignItems="end" justifyContent="center" flexDirection="column">
          <ModalBody>
            <Spinner size="xl" />
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default localSpinner;
