import { extendTheme } from '@chakra-ui/react';
import { m } from 'framer-motion';

const styles = {
  global: () => ({
    body: {
      color: 'black',
      bg: '#BBBBBB',
    },
    input: {
      fontSize: 'large',
    },
  }),
};

const components = {
  Button: {
    variants: {
      'sidebar-button': {
        height: '60px',
        width: '240px',
        fontSize: '20px',
        backgroundColor: '#F0F0F0',
        borderColor: '#F0F0F0',
        borderRadius: '5px',
        boxShadow: 'base',
        _hover: { color: 'black', boxShadow: 'lg' },
      },
      'normal-button': {
        backgroundColor: '#dfdfdf',
        border: '1px',
        borderColor: 'gray',
        color: '#2E2E2E',
        boxShadow: 'md',
        size: 'md',
        _hover: { borderColor: 'black' },
      },
    },
  },
};

const theme = extendTheme({
  styles,
  components,
  colors: {
    gray1: '#F0F0F0',
    gray2: '#dfdfdf',
    gray3: '#BBBBBB',
    gray4: '#888888',
    gray5: '#595959',
    gray6: '#2E2E2E',
  },
  fonts: {
    heading: 'Tajawal',
    body: 'Tajawal',
  },
});

theme.shadows.outline = 'black';

export default theme;
