import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const buttonStyle: any = {
  height: '60px',
  width: '240px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'md',
  _hover: { borderColor: '#2E2E2E', color: '#2E2E2E' },
};

interface Props {
  updateScene: (value: string) => void;
  updateUser: (user: any) => void;
}

const Logout = ({ updateScene, updateUser }: Props) => {
  const history = useHistory();

  const submitLogin: any = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout');
      const data = await response.json();
      alert(data.message);
      if (response.status === 200) {
        updateScene('الرئيسية');
        updateUser(undefined);
        localStorage.removeItem('user');
        history.push('/');
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };
  return (
    <Button position="fixed" right={0.5} bottom={2} {...buttonStyle} onClick={(e: any) => submitLogin()}>
      تسجيل الخروج
    </Button>
  );
};

export default Logout;
