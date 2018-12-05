import React from 'react';
import { injectIntl } from 'react-intl';
import IntlContext from '../contexts/IntlContext';

class IntlProviderFix extends React.Component {
  render() {
    return (
      <IntlContext.Provider value={this.props.intl}>
        {this.props.children}
      </IntlContext.Provider>
    );
  }
}

export default injectIntl(IntlProviderFix);
