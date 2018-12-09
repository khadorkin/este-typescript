import React from 'react';
import { injectIntl } from 'react-intl';
import IntlContext from '../contexts/IntlContext';

interface IIntlProviderFix {
  intl: any;
  children: React.ReactNode;
}

const IntlProviderFix: React.FunctionComponent<IIntlProviderFix> = props => {
  return (
    <IntlContext.Provider value={props.intl}>
      {props.children}
    </IntlContext.Provider>
  );
};

export default injectIntl(IntlProviderFix);