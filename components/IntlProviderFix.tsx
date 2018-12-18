import React from 'react';
import { injectIntl } from 'react-intl';
import IntlContext from '../contexts/IntlContext';

// Pass old React context into a new React context so we can have useIntl hook.

interface IntlProviderFix {
  intl: any;
  children: React.ReactNode;
}

const IntlProviderFix: React.FunctionComponent<IntlProviderFix> = props => {
  return (
    <IntlContext.Provider value={props.intl}>
      {props.children}
    </IntlContext.Provider>
  );
};

export default injectIntl(IntlProviderFix);
