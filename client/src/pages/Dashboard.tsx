import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import UsersContext from '../context/users/usersContext';
import Sidebar from '../components/sidebar/Sidebar';
import Orders from '../components/orders/OrdersMain';
import Home from '../components/home/HomeMain';
import Users from '../components/users/UsersMain';
import Reports from '../components/reports/ReportMain';

const Dashboard: React.FC = () => {
  const [scene, setScene] = useState('الرئيسية');
  const [Stage, setStage] = useState(<Home />);

  const updateScene = (value: string) => {
    setScene(value);
    switch (value) {
      case 'الرئيسية':
        setStage(<Home />);
        break;
      case 'إدارة الطلبات':
        setStage(<Orders />);
        break;
      case 'إدارة الاعضاء':
        setStage(<Users />);
        break;
      case 'التقارير':
        setStage(<Reports />);
        break;
      default:
        setStage(<Home />);
        break;
    }
  };

  return (
    <Flex alignItems="center" mr="250px" justifyContent="center" height="100vh">
      <Sidebar updateScene={updateScene} currentScene={scene} />
      <Flex
        width="100%"
        height="97%"
        rounded="md"
        backgroundColor="#dfdfdf"
        border="10px"
        borderColor="black"
        boxShadow="dark-lg"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        {Stage}
      </Flex>
    </Flex>
  );
};
export default Dashboard;
