import { Box, Button, Image, VStack, Text, Divider } from '@chakra-ui/react';
import Logo from '../img/logo.png';

const buttonStyle: any = {
  height: '60px',
  width: '245px',
  fontSize: '20px',
  backgroundColor: 'gray1',
  borderRadius: '5px',
  border: '1px solid',
  borderColor: 'gray1',
  _hover: { borderColor: 'black', color: 'black' },
  color: '#595959',
};

const SidebarContent = () => (
  <VStack>
    <Button {...buttonStyle}>الرئيسية</Button>
    <Button {...buttonStyle}>الأعضاء</Button>
    <Button {...buttonStyle}>إدارة الاعضاء</Button>
    <Button {...buttonStyle} position="fixed" right={0.5} bottom={2}>
      تسجيل الخروج
    </Button>
  </VStack>
);

const Sidebar = () => (
  <Box position="fixed" right={0} p={5} w="250px" top={0} h="100%" bg="gray2" border="2px" borderColor="gray">
    <VStack display="flex" justifyContent="center" alignItems="center">
      <Image m="auto" h={165} w={165} src={Logo} alt="وزارة الدفاع" />
      <Text color="gray" fontSize="28px">
        نظام متابعة الأداء
      </Text>
      <SidebarContent />
    </VStack>
  </Box>
);
export default Sidebar;
