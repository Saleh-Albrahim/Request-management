import { Box, Center, IconButton, Text, Flex, Image } from '@chakra-ui/react';
import Logo from '../img/logo.png';

const Header = () => (
  <Flex bg="#dfdfdf" w="100%" color="white" justifyContent="center" border="2px" borderColor="gray">
    <Image marginEnd="auto" mr={10} h={120} w={120} src={Logo} alt="وزارة الدفاع" />
  </Flex>
);
export default Header;
