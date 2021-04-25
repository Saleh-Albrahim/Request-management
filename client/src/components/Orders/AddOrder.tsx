import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AddOrder: React.FC<Props> = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent background="#dfdfdf" p={3}>
          <ModalCloseButton />
          <Flex alignItems="end" justifyContent="center" flexDirection="column">
            <ModalHeader m="auto">إضافة طلب جديد</ModalHeader>
            <Divider borderColor="black" />
            <ModalBody>
              <FormControl mt={3}>
                <FormLabel fontSize="15px" fontWeight="bold">
                  نوع الطلب :
                </FormLabel>
                <Select
                  placeholder="جميع انواع الطلبات"
                  css={{ 'text-indent': '15px' }}
                  outlineColor="black"
                  focusBorderColor="none"
                  variant="outline"
                  fontSize="15px"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  _hover={{ borderColor: 'black' }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize="15px" fontWeight="bold">
                  العضو المسؤول :
                </FormLabel>
                <Select
                  placeholder="العضو المسؤول"
                  css={{ 'text-indent': '15px' }}
                  outlineColor="black"
                  focusBorderColor="none"
                  variant="outline"
                  fontSize="15px"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  _hover={{ borderColor: 'black' }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize="15px" fontWeight="bold">
                  ملاحظات :
                </FormLabel>
                <Textarea
                  outlineColor="black"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  focusBorderColor="none"
                  _hover={{ borderColor: 'black' }}
                />
              </FormControl>
              <Button
                mt={5}
                _hover={{ borderColor: 'black' }}
                size="md"
                height="48px"
                width="250px"
                border="1px"
                borderColor="gray"
                color="#2E2E2E"
                boxShadow="md"
                backgroundColor="#dfdfdf"
              >
                إضافة الطلب
              </Button>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrder;
