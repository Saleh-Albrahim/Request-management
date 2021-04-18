import * as React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { ChakraProvider, Container } from '@chakra-ui/react';
import Header from 'components/Header';
import Spinner from 'components/Spinner';
import About from 'pages/About';
import Login from 'pages/auth/Login';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import theme from './theme';

// 3. extend the theme

const App: () => JSX.Element = () => {
  const submitLogin: any = async (username: string, password: string) => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    console.log(`data`, data);
  };
  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Container maxW="container.xl">
            <Switch>
              <Route path="/" render={(routeProps) => <Login {...routeProps} submitLogin={submitLogin} />} />
              <Header />
              <Route component={Home} path="/home" />
              <Route component={About} path="/about" />
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
