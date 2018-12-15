import React from 'react';
import IntlContext from '../contexts/IntlContext';

const useIntl = () => {
  const intl = React.useContext(IntlContext);
  if (intl == null) throw Error('useIntl: Please provide IntlContext value.');
  return intl;
};

export default useIntl;
