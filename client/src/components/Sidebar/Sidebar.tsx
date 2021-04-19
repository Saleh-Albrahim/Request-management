import { Box, Image, VStack, Text } from '@chakra-ui/react';
import Logo from '../../img/logo.png';
import SideBarItem from './SidebarItems';

const sidebarData = ['الرئيسية', 'إدارة الطلبات', 'إدارة الاعضاء', 'تسجيل الخروج'];

interface Props {
  currentScene: string;
  changeScene: (value: string) => void;
}

interface ContentProps {
  changeScene: (value: string) => void;
  currentScene: string;
}
const SidebarContent: React.FC<ContentProps> = ({ changeScene, currentScene }) => (
  <VStack>
    {sidebarData.map((item, index) => {
      return <SideBarItem key={index} value={item} changeScene={changeScene} currentScene={currentScene} />;
    })}
  </VStack>
);

const Sidebar: React.FC<Props> = ({ changeScene, currentScene }) => (
  <Box position="fixed" right={0} p={5} w="250px" top={0} h="100%" bg="gray2" border="2px" borderColor="gray">
    <VStack display="flex" justifyContent="center" alignItems="center">
      <Image m="auto" h={165} w={165} src={Logo} alt="وزارة الدفاع" />
      <Text color="gray" fontSize="28px">
        نظام متابعة الأداء
      </Text>
      <SidebarContent changeScene={changeScene} currentScene={currentScene} />
    </VStack>
  </Box>
);
export default Sidebar;
