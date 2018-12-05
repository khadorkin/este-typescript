import React from 'react';
import ThemeContext from '../components/ThemeContext';

export default function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context == null) throw Error('useTheme: Please provide ThemeContext.');
  return context;
}
