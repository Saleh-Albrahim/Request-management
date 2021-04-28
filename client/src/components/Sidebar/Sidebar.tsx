import { Box, Image, VStack, Text } from '@chakra-ui/react';
import Logo from '../../img/logo.png';
import Logout from './Logout';
import SidebarItem from './SidebarItem';

const sidebarData = ['الرئيسية', 'إدارة الطلبات', 'التقارير', 'إدارة الاعضاء'];

interface Props {
  currentScene: string;
  updateScene: (value: string) => void;
}

const Sidebar: React.FC<Props> = ({ updateScene, currentScene }) => (
  <Box position="fixed" right={0} p={5} w="250px" top={0} h="100%" bg="gray2" border="2px" borderColor="gray">
    <VStack display="flex" justifyContent="center" alignItems="center">
      <Image m="auto" h={165} w={165} src={Logo} alt="وزارة الدفاع" />
      <Text color="gray" fontSize="28px">
        نظام متابعة الأداء
      </Text>
      {sidebarData.map((item, index) => {
        return <SidebarItem key={index} value={item} updateScene={updateScene} currentScene={currentScene} />;
      })}
      <Logout updateScene={updateScene} />
    </VStack>
  </Box>
);
export default Sidebar;
