import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import OrdersState from './context/orders/OrderState';
import theme from './theme';
import '@fontsource/tajawal';
import UsersContext from './context/users/usersContext';

const App: () => JSX.Element = () => {
  const usersContext = useContext(UsersContext);

  //  @ts-expect-error
  const { user, updateUser } = usersContext;

  const localStorageUser = localStorage.getItem('user');

  useEffect(() => {
    if (localStorageUser) {
      updateUser(localStorageUser);
    }
  }, []);

  return (
    <OrdersState>
      <ChakraProvider theme={theme}>
        <Router>
          <Container maxW="container">
            <Switch>
              <Route path="/" exact render={(props) => (user ? <Redirect to="/dashboard" /> : <Login />)} />
              <Route render={(props) => (user ? <Dashboard /> : <Redirect to="/" />)} path="/dashboard" />
              <Route component={NotFound} path="/404" />
              <Redirect to="/404" />
            </Switch>
          </Container>
        </Router>
      </ChakraProvider>
    </OrdersState>
  );
};

export default App;
