import { extendTheme } from '@chakra-ui/react';

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

const theme = extendTheme({
  styles,
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
