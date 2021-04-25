import { Text, Flex, Grid, Box } from '@chakra-ui/react';
import { ViewIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import DataGrid from '../../components/Orders/DataGrid';

const OrdersMain: React.FC = () => {
  const [orderTypes, setOrderTypes] = useState([]);

  useEffect(() => {
    const getOrdersTypes = async () => {
      const response = await fetch('/api/v1/orders/type');

      if (response.status === 200) {
        const data = await response.json();

        console.log(`data`, data);
        setOrderTypes(data);
      }
    };

    getOrdersTypes();
  }, []);

  return <DataGrid orderTypes={orderTypes} />;
};
export default OrdersMain;
