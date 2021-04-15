import * as React from 'react';

import { Box, Text } from '@chakra-ui/react';

const NotFound: React.FC = () => (
  <Box>
    <Text fontSize="xl" textAlign="center">
      الصفحة المطلوبة غير موجودة
    </Text>

    <Text fontSize="lg" mt="5" textAlign="center">
      تأكد من الرابط
    </Text>
  </Box>
);

export default NotFound;
