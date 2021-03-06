import { StyleSheet } from 'react-native';
import { colors, createTheme, dimensions } from './light';

const darkColors = {
  ...colors,
  background: '#343a40',
  foreground: '#ffffff',
};

const theme = StyleSheet.create(createTheme(darkColors, dimensions));

export default theme;
