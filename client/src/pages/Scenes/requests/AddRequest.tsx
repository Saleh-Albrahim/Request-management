import { SimpleGrid } from '@chakra-ui/react';
import { ViewIcon, AddIcon } from '@chakra-ui/icons';
import RequestItem from '../../../components/Requests/RequestItem';

const Requests: React.FC = () => (
  <SimpleGrid columns={[1, null, 5]} spacing={10} p={10}>
    <RequestItem Icon={AddIcon} value="إضافة طلب جديد" />
    <RequestItem Icon={ViewIcon} value="متابعة الطلبات السابقة" />
  </SimpleGrid>
);

export default Requests;
