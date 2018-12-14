import React from 'react';
import IntlContext from '../contexts/IntlContext';

export default function useIntl() {
  const intl = React.useContext(IntlContext);
  if (intl == null) throw Error('useIntl: Please provide IntlContext value.');
  return intl;
}
