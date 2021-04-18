import { Flex, VStack, Input, FormControl, FormLabel, Button, Image, Text, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../img/logo.png';

const Login: React.FC = () => {
  const history = useHistory();
  const submitLogin: any = async (username: string, password: string) => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    alert(data.message);
    if (response.status === 200) {
      history.push('/home');
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box px="20" py="10" rounded="md" backgroundColor="#F0F0F0" border="10px" borderColor="black" boxShadow="dark-lg">
        <VStack spacing={10}>
          <Image boxSize="200px" src={Logo} alt="وزارة الدفاع" />
          <Text color="gray" fontSize="40px">
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
              fontSize="20px"
              width="400px"
              value={username}
              _hover={{ borderColor: 'black' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>كلمة المرور</FormLabel>
            <Input
              outlineColor="black"
              focusBorderColor="none"
              variant="outline"
              fontSize="20px"
              borderColor="gray"
              type="password"
              value={password}
              width="400px"
              _hover={{ borderColor: 'black' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            _hover={{ borderColor: 'black' }}
            size="md"
            height="48px"
            width="250px"
            border="2px"
            borderColor="gray"
            backgroundColor="#F0F0F0"
            onClick={() => {
              submitLogin(username, password);
            }}
          >
            تسجيل الدخول
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
export default Login;
