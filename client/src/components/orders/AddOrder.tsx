import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
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
import React, { useContext, useState } from 'react';
import OrderContext from 'context/orders/orderContext';
import UsersContext from 'context/users/usersContext';
import { successAlertTimer, errorAlert } from '../../util/alerts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrder: React.FC<Props> = ({ isOpen, onClose }) => {
  const orderContext = useContext(OrderContext);
  const usersContext = useContext(UsersContext);

  // @ts-ignore
  const { usersList } = usersContext;

  // @ts-ignore
  const { typeList, updateTableData, selectedType } = orderContext;

  const [type, setType] = useState(' ');

  const [user, setUser] = useState('');

  const [comment, setComment] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!type || !user) {
      errorAlert('الرجاء اكمال جميع الحقول');
      return;
    }

    const response = await fetch('/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, type, comment }),
    });

    const data = await response.json();
    if (response.status === 200) {
      successAlertTimer(data.message);
      setType('');
      setUser('');
      setComment('');
      updateTableData(selectedType);
      onClose();
    } else {
      errorAlert(data.message);
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent zIndex={1} background="#dfdfdf" p={3}>
          <ModalCloseButton />
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <ModalHeader>إضافة طلب جديد</ModalHeader>
            <Divider borderColor="black" />
            <ModalBody>
              <form onSubmit={onSubmit}>
                <FormControl mt={3}>
                  <FormLabel fontSize="15px" fontWeight="bold">
                    نوع الطلب :
                  </FormLabel>
                  <Select
                    sx={{ textIndent: '15px' }}
                    outlineColor="black"
                    focusBorderColor="none"
                    variant="outline"
                    height="48px"
                    fontSize="15px"
                    defaultValue=""
                    borderColor="gray"
                    boxShadow="base"
                    width="500px"
                    onChange={(e) => setType(e.target[e.target.selectedIndex].id)}
                    _hover={{ borderColor: 'black' }}
                  >
                    <option disabled label=" " />
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
                    sx={{ textIndent: '15px' }}
                    outlineColor="black"
                    focusBorderColor="none"
                    variant="outline"
                    height="48px"
                    fontSize="15px"
                    borderColor="gray"
                    defaultValue=""
                    boxShadow="base"
                    width="500px"
                    onChange={(e) => setUser(e.target[e.target.selectedIndex].id)}
                    _hover={{ borderColor: 'black' }}
                  >
                    <option disabled label=" " />
                    {usersList.map((user: any) => (
                      <option key={user.id} id={user.id}>
                        {user.username}
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
                    resize="none"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    focusBorderColor="none"
                    _hover={{ borderColor: 'black' }}
                  />
                </FormControl>
                <HStack>
                  <Button variant="normal-button" mt={5} height="48px" width="250px" mx="auto" type="submit">
                    إضافة الطلب
                  </Button>
                </HStack>
              </form>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrder;
