import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { errorAlert, successAlertTimer } from '../../util/alerts';
import UsersContext from '../../context/users/usersContext';

const buttonStyle: any = {
  height: '60px',
  width: '240px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'md',
  color: '#595959',
  border: 'none',
  _hover: { borderColor: '#2E2E2E', color: '#2E2E2E' },
};

interface Props {
  updateScene: (value: string) => void;
}

const Logout = ({ updateScene }: Props) => {
  const history = useHistory();

  const usersContext = useContext(UsersContext);

  //  @ts-expect-error
  const { updateUser } = usersContext;

  const submitLogin: any = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout');
      const data = await response.json();
      if (response.status === 200) {
        updateScene('الرئيسية');
        updateUser(undefined);
        successAlertTimer(data.message);
        localStorage.removeItem('user');
        history.push('/');
      } else {
        errorAlert(data.message);
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
