import { Flex, VStack, Input, FormControl, FormLabel, Button, Image, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Logo from '../../img/logo.png';

const Login: React.FC = () => (
  <Flex
    p="6"
    rounded="md"
    margin="auto"
    width="50%"
    backgroundColor="#F0F0F0"
    border="10px"
    marginTop="60px"
    borderColor="black"
    boxShadow="dark-lg"
    alignItems="center"
    justifyContent="center"
  >
    <VStack spacing={10}>
      <Image boxSize="200px" src={Logo} alt="Segun Adebayo" />
      <Text color="gray.800" fontSize="40px">
        نظام متابعة الأداء
      </Text>
      <FormControl>
        <FormLabel>اسم المستخدم </FormLabel>
        <Input
          outlineColor="black"
          focusBorderColor="none"
          variant="outline"
          borderColor="gray"
          type="text"
          width="400px"
          _hover={{ borderColor: 'black' }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>كلمة المرور</FormLabel>
        <Input variant="outline" borderColor="gray" fontSize="20px" type="password" _hover={{ borderColor: 'black' }} />
      </FormControl>
      <Button
        _hover={{ borderColor: 'black' }}
        size="md"
        height="48px"
        width="250px"
        border="2px"
        borderColor="gray"
        backgroundColor="#F0F0F0"
      >
        تسجيل الدخول
      </Button>
    </VStack>
  </Flex>
);
export default Login;
