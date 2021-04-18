import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react';

const SidebarContent = () => (
  <VStack>
    <Button w="100%">الرئيسية</Button>
    <Button w="100%">حول</Button>
    <Button w="100%">تواصل</Button>
  </VStack>
);

const Sidebar = () => (
  <Box position="fixed" right={0} p={5} w="200px" top={0} h="100%" bg="#dfdfdf">
    <SidebarContent />
  </Box>
);
export default Sidebar;
