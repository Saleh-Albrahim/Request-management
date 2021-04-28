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
  const { typeList, updateTableData } = orderContext;

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
      updateTableData('');
      setType('');
      setUser('');
      setComment('');
      onClose();
    } else {
      errorAlert(data.message);
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent zIndex={1} background="#dfdfdf" p={3}>
          <ModalCloseButton />
          <Flex alignItems="end" justifyContent="center" flexDirection="column">
            <ModalHeader m="auto">إضافة طلب جديد</ModalHeader>
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
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
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
                  type="submit"
                  backgroundColor="#dfdfdf"
                >
                  إضافة الطلب
                </Button>
              </form>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrder;
