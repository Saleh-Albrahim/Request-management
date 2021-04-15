import { Flex, Text, VStack, Input, FormControl, FormHelperText, FormLabel, Button, Image } from '@chakra-ui/react';
import React from 'react';
import Logo from '../../img/logo.png';

const Login: React.FC = () => (
  <Flex
    p="6"
    rounded="md"
    margin="auto"
    width="50%"
    backgroundColor="gray.600"
    height="80vh"
    border="10px"
    borderColor="black"
    boxShadow="dark-lg"
    alignItems="center"
    justifyContent="center"
  >
    <VStack spacing={10}>
      <Image boxSize="200px" src={Logo} alt="Segun Adebayo" />
      <FormControl>
        <FormLabel>اسم المستخدم </FormLabel>
        <Input type="text" width="400px" />
      </FormControl>
      <FormControl>
        <FormLabel>كلمة المرور</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button mt={5} colorScheme="gray" size="lg">
        تسجيل الدخول
      </Button>
    </VStack>
  </Flex>
);
export default Login;
