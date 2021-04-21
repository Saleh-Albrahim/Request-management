import { Text, Flex, Grid, Box } from '@chakra-ui/react';
import { ViewIcon, AddIcon } from '@chakra-ui/icons';
import DataGrid from '../../components/Orders/DataGrid';

const OrdersMain: React.FC = () => (
  <Box p={5}>
    <DataGrid />
  </Box>
);

export default OrdersMain;
