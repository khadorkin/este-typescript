import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { StyleSheet } from 'react-native';

export default function useTheme() {
  const theme = React.useContext(ThemeContext);
  if (theme == null)
    throw Error('useTheme: Please provide ThemeContext value.');
  const styleSheet = React.useMemo(() => StyleSheet.create(theme), [theme]);
  return styleSheet;
}
