import React from 'react';
import { InjectedIntl } from 'react-intl';

// https://basarat.gitbooks.io/typescript/docs/javascript/null-undefined.html
export default React.createContext<InjectedIntl | undefined>(undefined);
