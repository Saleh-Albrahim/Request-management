import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Requests from './Scenes/Requests';
import Home from './Scenes/Home';
import Users from './Scenes/Users';

const Dashboard: React.FC = () => {
  const [scene, setScene] = useState('الرئيسية');
  const [page, setPage] = useState(<Home />);

  const changeScene = (value: string) => {
    setScene(value);
    switch (value) {
      case 'الرئيسية':
        setPage(<Home />);
        break;
      case 'إدارة الطلبات':
        setPage(<Requests />);
        break;
      case 'إدارة الاعضاء':
        setPage(<Users />);
        break;
      default:
        setPage(<Home />);
        break;
    }
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
      >
        {page}
      </Box>
    </Flex>
  );
};
export default Dashboard;
