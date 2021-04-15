import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: (props: any) => ({
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
  Drawer: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: mode('white', '#141214')(props),
      },
    }),
  },
};

const theme = extendTheme({
  components,
  styles,
  colors: {
    gray1: '#F0F0F0',
    gray2: '#BBBBBB',
    gray3: '#888888',
    gray4: '#595959',
    gray5: '#2E2E2E',
  },
});

theme.shadows.outline = 'black';

export default theme;
