import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import OrderContext from 'context/orders/orderContext';
import UsersContext from 'context/users/usersContext';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { successAlertTimer, errorAlert, confirmAlert } from '../../util/alerts';
import { updateDetails } from '../../../../src/controllers/authController';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderID: any;
}

const OrderDetails: React.FC<Props> = ({ isOpen, onClose, orderID }) => {
  const orderContext = useContext(OrderContext);
  const usersContext = useContext(UsersContext);

  // @ts-ignore
  const { typeList, updateTableData, selectedType } = orderContext;

  console.log(`selectedType`, selectedType);

  // @ts-ignore
  const { usersList } = usersContext;

  const [type, setType] = useState(' ');

  const [user, setUser] = useState('');

  const [comment, setComment] = useState('');

  const [order, setOrder]: any = useState({});

  useEffect(() => {
    const getOrderByID = async () => {
      const response = await fetch(`/api/v1/orders/${orderID}`);

      if (response.status === 200) {
        const data = await response.json();
        console.log(`data`, data);
        setOrder(data);
      }
    };
    if (orderID) {
      getOrderByID();
    }
  }, [orderID]);

  const deleteOrder = async () => {
    const confirmDelete = await confirmAlert();

    if (confirmDelete.isConfirmed) {
      const response = await fetch(`/api/v1/orders/${orderID}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.status === 200) {
        successAlertTimer(data.message);
        onClose();
        updateTableData(selectedType);
        setOrder('');
      } else {
        errorAlert(data.message);
      }
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent zIndex={1} background="#dfdfdf" p={3}>
          <ModalCloseButton />
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <ModalHeader>تفاصيل الطلب</ModalHeader>
            <Divider borderColor="black" />
            <ModalBody>
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
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  isDisabled
                  _disabled={{ color: 'black' }}
                  _hover={{ borderColor: 'black' }}
                  onChange={(e) => setType(e.target[e.target.selectedIndex].id)}
                >
                  <option>{order ? order.type : ' '}</option>
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize="15px" fontWeight="bold">
                  حالة الطلب
                </FormLabel>
                <Select
                  sx={{ textIndent: '15px' }}
                  outlineColor="black"
                  focusBorderColor="none"
                  variant="outline"
                  height="48px"
                  fontSize="15px"
                  borderColor="gray"
                  boxShadow="base"
                  width="500px"
                  isDisabled
                  _disabled={{ color: 'black' }}
                  _hover={{ borderColor: 'black' }}
                  onChange={(e) => setType(e.target[e.target.selectedIndex].id)}
                >
                  <option>{order ? order.status : ' '}</option>
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
                  boxShadow="base"
                  width="500px"
                  isDisabled
                  _disabled={{ color: 'black' }}
                  _hover={{ borderColor: 'black' }}
                  onChange={(e) => setUser(e.target[e.target.selectedIndex].id)}
                >
                  <option>{order ? order.user : ' '}</option>
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
                  resize="none"
                  width="500px"
                  value={order ? order.comment : ' '}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  focusBorderColor="none"
                  isDisabled
                  _disabled={{ color: 'black' }}
                  _hover={{ borderColor: 'black' }}
                />
              </FormControl>
              <HStack justifyContent="space-between" alignItems="center" mt={5}>
                <Button variant="normal-button" height="48px" type="button" leftIcon={<EditIcon color="black" />}>
                  تعديل الطلب
                </Button>
                <Button
                  variant="normal-button"
                  mt={5}
                  height="48px"
                  onClick={deleteOrder}
                  leftIcon={<DeleteIcon color="black" />}
                >
                  حذف الطلب
                </Button>
              </HStack>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderDetails;
