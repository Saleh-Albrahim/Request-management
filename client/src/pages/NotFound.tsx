import * as React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Flex alignItems="center" justifyContent="center" height="100vh">
    <Box
      alignItems="center"
      rounded="md"
      backgroundColor="#dfdfdf"
      border="10px"
      p="20"
      borderColor="black"
      boxShadow="dark-lg"
    >
      <Text fontSize="70px" textAlign="center">
        404
      </Text>
      <Text fontSize="xl" mt="8" textAlign="center">
        الصفحة المطلوبة غير موجودة
      </Text>

      <Text fontSize="lg" mt="3" textAlign="center">
        الرجاء التأكد من الرابط المدخل
      </Text>

      <Link to="/">
        <Button
          _hover={{ borderColor: 'black' }}
          size="md"
          height="48px"
          mt="8"
          width="250px"
          border="1px"
          borderColor="gray"
          color="#2E2E2E"
          boxShadow="md"
          backgroundColor="#dfdfdf"
        >
          الرجوع الى الصفحة الرئيسية
        </Button>
      </Link>
    </Box>
  </Flex>
);

export default NotFound;
