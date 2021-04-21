import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

const Requests: React.FC = () => (
  <Table
    size="lg"
    variant="simple"
    colorScheme="black"
    border="1px solid"
    background="#F0F0F0"
    borderRadius="5px"
    boxShadow="lg"
    overflowY="auto"
  >
    <TableCaption>جميع الطلبات بالترتيب</TableCaption>
    <Thead>
      <Tr>
        <Th>اسم العضو</Th>
        <Th>نوع الطلب</Th>
        <Th>تاريخ الطلب</Th>
        <Th>حالة الطلب</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>عبد الله الفرج</Td>
        <Td>اصلاح كمبيوتر</Td>
        <Td>20/04/2021</Td>
        <Td>تم الاصلاح</Td>
      </Tr>
      <Tr>
        <Td>عبد الله الفرج</Td>
        <Td>اصلاح كمبيوتر</Td>
        <Td>20/04/2021</Td>
        <Td>تم الاصلاح</Td>
      </Tr>
      <Tr>
        <Td>عبد الله الفرج</Td>
        <Td>اصلاح كمبيوتر</Td>
        <Td>20/04/2021</Td>
        <Td>تم الاصلاح</Td>
      </Tr>
    </Tbody>
  </Table>
);

export default Requests;
