import React, { useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Header from 'components/Ui/Header';
import Spinner from 'components/Ui/Spinner';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import theme from './theme';
import '@fontsource/tajawal';

// 3. extend the theme

const App: () => JSX.Element = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
  };
  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Container maxW="container">
            <Switch>
              <Route path="/" exact render={(props) => <Login handleLogin={handleLogin} />} />
              <Route component={Dashboard} path="/dashboard" />
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
