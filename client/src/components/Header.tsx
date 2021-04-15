import * as React from 'react';
import { Link } from 'react-router-dom';

import { Flex, HStack, Spacer, Text } from '@chakra-ui/react';

const Header: React.FC = () => (
  <Flex
    as="header"
    borderBottomColor={{ base: 'red.500', sm: 'teal.500' }}
    borderBottomWidth={2}
    justify="center"
    mb={10}
    px={10}
    py={2}
    w="full"
  >
    <HStack spacing={8}>
      <Link to="/">
        <Text fontSize="2xl">الرئيسية</Text>
      </Link>
      <Link to="/about">
        <Text fontSize="2xl">حول</Text>
      </Link>
    </HStack>
    <Spacer />
  </Flex>
);

export default Header;
