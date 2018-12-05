import { colors, dimensions, createTheme } from './initial';

const darkColors = {
  ...colors,
  background: '#343a40',
  foreground: '#ffffff',
};

const theme = createTheme(darkColors, dimensions);

export default theme;
