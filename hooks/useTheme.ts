import React from 'react';
import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  if (theme == null)
    throw Error('useTheme: Please provide ThemeContext value.');
  return theme;
};

export default useTheme;
