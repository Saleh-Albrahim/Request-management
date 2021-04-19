import { Flex, VStack, Input, FormControl, FormLabel, Button, Image, Text, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { errorAlert, successAlertTimer } from '../util/alerts';
import Logo from '../img/logo.png';

interface Props {
  updateUser: (user: Object) => void;
}

const Login: React.FC<Props> = ({ updateUser }) => {
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

    if (response.status === 200) {
      successAlertTimer(data.message);
      updateUser(data.user);
      localStorage.setItem('user', data.user);
      history.push('/dashboard');
    } else {
      errorAlert(data.message);
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box px="20" py="10" rounded="md" backgroundColor="#dfdfdf" border="10px" borderColor="black" boxShadow="dark-lg">
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
              boxShadow="md"
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
              boxShadow="md"
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
            border="1px"
            borderColor="gray"
            color="#2E2E2E"
            boxShadow="md"
            backgroundColor="#dfdfdf"
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
