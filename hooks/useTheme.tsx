import React from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);
  return React.useMemo(() => StyleSheet.create(theme), [theme]);
}
