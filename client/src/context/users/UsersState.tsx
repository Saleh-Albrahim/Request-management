// @ts-nocheck
import React, { useReducer } from 'react';
import usersContext from './usersContext';
import UsersReducer from './usersReducer';
import { GET_USERS_LIST, SET_USER } from '../types';

type Props = {
  children: React.ReactNode;
};

const OrderState: React.FC = ({ children }: Props) => {
  const initialState = {
    usersList: [{}],
    user: undefined,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  // GET Users List
  const getUsersList = async () => {
    const response = await fetch(`/api/v1/auth/users`);

    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: GET_USERS_LIST,
        payload: data,
      });
    }
  };

  // Update the user
  const updateUser = (user) =>
    dispatch({
      type: SET_USER,
      payload: user,
    });

  return (
    <usersContext.Provider
      value={{
        user: state.user,
        usersList: state.usersList,
        getUsersList,
        updateUser,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};

export default OrderState;
