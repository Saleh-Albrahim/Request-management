import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Requests from '../scenes/orders/OrdersMain';
import Home from '../scenes/Home';
import Users from '../scenes/Users';

interface Props {
  user: Object;
  updateUser: (user: Object) => void;
}

const Dashboard: React.FC<Props> = ({ user, updateUser }) => {
  const [scene, setScene] = useState('الرئيسية');
  const [Stage, setStage] = useState(<Home />);

  const updateScene = (value: string) => {
    setScene(value);
    switch (value) {
      case 'الرئيسية':
        setStage(<Home />);
        break;
      case 'إدارة الطلبات':
        setStage(<Requests />);
        break;
      case 'إدارة الاعضاء':
        setStage(<Users />);
        break;
      default:
        setStage(<Home />);
        break;
    }
  };

  return (
    <Flex alignItems="center" mr="250px" justifyContent="center" height="100vh">
      <Sidebar user={user} updateScene={updateScene} updateUser={updateUser} currentScene={scene} />
      <Box
        width="100%"
        height="97%"
        rounded="md"
        backgroundColor="#dfdfdf"
        border="10px"
        borderColor="black"
        boxShadow="dark-lg"
      >
        {Stage}
      </Box>
    </Flex>
  );
};
export default Dashboard;
