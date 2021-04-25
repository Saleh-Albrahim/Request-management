import { Flex, Box, Button, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddOrder from 'components/Orders/AddOrder';
import OrdersTable from '../../components/Orders/OrdersTable';

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
  const [data, setData] = useState([{}]);

  const [option, setOption] = useState('');

  const { isOpen: isAddOrderOpen, onOpen: onAddOrderOpen, onClose: onAddOrderClose } = useDisclosure();

  const renderActions = () => {
    return (
      <Flex
        bg="gray.200"
        py={3}
        minWidth={10}
        height="100%"
        backgroundColor="#dfdfdf"
        borderTop="1px solid black"
        justifyContent="space-around"
        gridColumn={`1 / span ${15}`}
        overflow="hidden"
      >
        <Button onClick={onAddOrderOpen} {...buttonStyle} leftIcon={<AddIcon color="black" />}>
          إضافة طلب جديد
        </Button>
        <Button {...buttonStyle} leftIcon={<EditIcon color="black" />}>
          تعديل الطلب
        </Button>
        <Button {...buttonStyle} leftIcon={<DeleteIcon color="black" />}>
          حذف الطلب
        </Button>
      </Flex>
    );
  };

  useEffect(() => {
    const getTableData = async () => {
      const response = await fetch(`/api/v1/orders?type=${option}`);

      if (response.status === 200) {
        const data = await response.json();

        setData(data);
      }
    };

    getTableData();
  }, [option]);

  const [orderTypes, setOrderTypes] = useState([]);

  useEffect(() => {
    const getOrdersTypes = async () => {
      const response = await fetch('/api/v1/orders/type');

      if (response.status === 200) {
        const data = await response.json();
        setOrderTypes(data);
      }
    };

    getOrdersTypes();
  }, []);

  return (
    <Box height="100%" width="100%">
      <OrdersTable
        renderActions={renderActions}
        data={data}
        orderTypes={orderTypes}
        updateData={(option: string) => setOption(option)}
      />
      <AddOrder isOpen={isAddOrderOpen} onOpen={onAddOrderOpen} onClose={onAddOrderClose} orderTypes={orderTypes} />
    </Box>
  );
};
export default OrdersMain;
