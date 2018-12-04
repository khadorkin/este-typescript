import React from 'react';
import IntlContext from '../components/IntlContext';

export default function useIntl() {
  const context = React.useContext(IntlContext);
  if (context == null) throw Error('useIntl: Please provide IntlContext.');
  return context;
}
