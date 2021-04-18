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
  const a = 1;
  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Container maxW="container.xl">
            <Switch>
              <Route path="/" exact component={Login} />
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
