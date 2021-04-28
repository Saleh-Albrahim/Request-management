import * as React from 'react';
import ReactDOM from 'react-dom';
import UsersState from './context/users/UsersState';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <UsersState>
      <App />
    </UsersState>
  </React.StrictMode>,
  document.getElementById('root')
);
