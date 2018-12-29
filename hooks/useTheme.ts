import React from 'react';
import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => {
  return React.useContext(ThemeContext);
};

export default useTheme;
