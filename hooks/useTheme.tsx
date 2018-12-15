import React from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  return React.useMemo(() => StyleSheet.create(theme), [theme]);
};

export default useTheme;
