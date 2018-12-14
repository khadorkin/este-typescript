import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { StyleSheet } from 'react-native';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);
  return React.useMemo(() => StyleSheet.create(theme), [theme]);
}
