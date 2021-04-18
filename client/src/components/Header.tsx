import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react';

const Header = () => (
  <Flex bg="tomato" w="100%" p={4} color="white" justifyContent="center">
    <Center h="40px">
      <Text fontSize="xl">نظام متابعة الأداء</Text>
    </Center>
  </Flex>
);
export default Header;
