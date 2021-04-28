import { Flex, Box, Button, useDisclosure } from '@chakra-ui/react';
import { useEffect, useContext } from 'react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import OrdersTable from './OrdersTable';
import AddOrder from 'components/orders/AddOrder';
import OrdersContext from 'context/orders/orderContext';

const buttonStyle: any = {
  height: '100%',
  width: '210px',
  fontSize: '20px',
  p: '2',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'base',
  border: 'none',
  _hover: { color: 'black', boxShadow: 'lg' },
};

const OrdersMain: React.FC = () => {
  const ordersContext: any = useContext(OrdersContext);

  const { updateTableData, getTypeList } = ordersContext;

  useEffect(() => {
    updateTableData('');
    getTypeList();
  }, []);

  const { isOpen: isAddOrderOpen, onOpen: onAddOrderOpen, onClose: onAddOrderClose } = useDisclosure();

  const renderActions = () => {
    return (
      <Button
        onClick={onAddOrderOpen}
        _hover={{ borderColor: 'black' }}
        width="250px"
        border="1px"
        height="48px"
        borderColor="gray"
        color="#2E2E2E"
        boxShadow="md"
        backgroundColor="#dfdfdf"
        leftIcon={<AddIcon color="black" />}
      >
        إضافة طلب جديد
      </Button>
    );
  };

  return (
    <Box height="100%" width="100%">
      <OrdersTable renderActions={renderActions} />
      <AddOrder isOpen={isAddOrderOpen} onClose={onAddOrderClose} />
    </Box>
  );
};
export default OrdersMain;
