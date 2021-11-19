import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { errorAlert, successAlertTimer } from '../../util/alerts';
import UsersContext from '../../context/users/usersContext';

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
    <Button position="fixed" right={0.5} bottom={2} variant="sidebar-button" onClick={(e: any) => submitLogin()}>
      تسجيل الخروج
    </Button>
  );
};

export default Logout;
