import * as React from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Flex alignItems="center" justifyContent="center" height="100vh">
    <Box px="20" py="10" rounded="md" backgroundColor="#dfdfdf" border="10px" borderColor="black" boxShadow="dark-lg">
      <Text fontSize="xl" textAlign="center">
        الصفحة المطلوبة غير موجودة
      </Text>

      <Text fontSize="lg" mt="5" textAlign="center">
        الرجاء التأكد من الرابط المدخل
      </Text>

      <Link to="/">
        <Button
          _hover={{ borderColor: 'black' }}
          size="md"
          height="48px"
          width="250px"
          border="2px"
          borderColor="gray"
          backgroundColor="#dfdfdf"
          mt="5"
        >
          الرجوع الى الصفحة الرئيسية
        </Button>
      </Link>
    </Box>
  </Flex>
);

export default NotFound;
