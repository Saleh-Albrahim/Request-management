import { Text, Flex, Grid, Box } from '@chakra-ui/react';
import { ViewIcon, AddIcon } from '@chakra-ui/icons';
import RequestItem from '../../components/Orders/RequestItem';

const Requests: React.FC = () => (
  <Grid templateColumns="repeat(auto-fill, minmax(14rem,auto))" p={10}>
    <RequestItem Icon={AddIcon} value="إضافة طلب جديد" />
    <RequestItem Icon={ViewIcon} value="متابعة الطلبات السابقة" />
  </Grid>
);

export default Requests;
