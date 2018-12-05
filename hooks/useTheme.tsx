import React from 'react';
import ThemeContext from '../components/ThemeContext';
import { StyleSheet } from 'react-native';

const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  if (theme == null) throw Error('useTheme: Please provide ThemeContext.');
  const styleSheet = React.useMemo(
    () => {
      return StyleSheet.create(theme);
    },
    [theme],
  );
  return styleSheet;
};

export default useTheme;
