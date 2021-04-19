import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Header from 'components/Ui/Header';
import Spinner from 'components/Ui/Spinner';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import SecuredRoute from 'components/Routes/SecuredRoute';
import theme from './theme';
import '@fontsource/tajawal';

// 3. extend the theme

const App: () => JSX.Element = () => {
  const [user, setUser]: any = useState(undefined);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch('/api/v1/auth/user');
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.user);
          setUser(data.user);
        }
      } catch (error) {
        console.log(`error`, error);
      }
    };
    checkToken();
  }, []);

  const updateUser = (user: Object) => {
    setUser(user);
  };

  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Container maxW="container">
            <Switch>
              <Route path="/" exact render={(props) => <Login updateUser={updateUser} />} />
              <Route
                render={(props) => (user ? <Dashboard user={user} updateUser={updateUser} /> : <Redirect to="/" />)}
                path="/dashboard"
              />
              <Route component={NotFound} path="/404" />
              <Redirect to="/404" />
            </Switch>
          </Container>
        </Router>
      </React.Suspense>
    </ChakraProvider>
  );
};

export default App;
