import { colors, createTheme, dimensions } from './initial';

const darkColors = {
  ...colors,
  background: '#343a40',
  foreground: '#ffffff',
};

const theme = createTheme(darkColors, dimensions);

export default theme;
