import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  const [scene, setScene] = useState('الرئيسية');

  const changeScene = (value: string) => {
    setScene(value);
  };
  return (
    <Flex alignItems="center" mr="250px" justifyContent="center" height="100vh">
      <Sidebar currentScene={scene} changeScene={changeScene} />
      <Box
        width="100%"
        height="97%"
        rounded="md"
        backgroundColor="#dfdfdf"
        border="10px"
        borderColor="black"
        boxShadow="dark-lg"
      />
    </Flex>
  );
};
export default Dashboard;
