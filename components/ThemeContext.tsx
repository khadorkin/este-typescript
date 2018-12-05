import React from 'react';
import { Theme } from '../themes/initial';

// https://basarat.gitbooks.io/typescript/docs/javascript/null-undefined.html
export default React.createContext<Theme | undefined>(undefined);
