import React from 'react';
import IntlContext from '../components/IntlContext';

const useIntl = () => {
  const context = React.useContext(IntlContext);
  if (context == null) throw Error('useIntl: Please provide IntlContext.');
  return context;
};

export default useIntl;
