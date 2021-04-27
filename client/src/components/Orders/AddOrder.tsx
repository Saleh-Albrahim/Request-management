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
import React, { useContext } from 'react';
import OrderContext from 'context/order/orderContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrder: React.FC<Props> = ({ isOpen, onClose }) => {
  const orderContext = useContext(OrderContext);

  // @ts-ignore
  const { typeList } = orderContext;

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
                  sx={{ 'text-indent': '15px' }}
                  outlineColor="black"
                  focusBorderColor="none"
                  variant="outline"
                  height="48px"
                  fontSize="15px"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  _hover={{ borderColor: 'black' }}
                >
                  {typeList.map((type: any) => (
                    <option key={type.id} id={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize="15px" fontWeight="bold">
                  العضو المسؤول :
                </FormLabel>
                <Select
                  sx={{ 'text-indent': '15px' }}
                  outlineColor="black"
                  focusBorderColor="none"
                  variant="outline"
                  height="48px"
                  fontSize="15px"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  _hover={{ borderColor: 'black' }}
                >
                  {typeList.map((type: any) => (
                    <option key={type.id} id={type.id}>
                      {type.name}
                    </option>
                  ))}
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
