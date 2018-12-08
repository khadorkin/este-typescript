import React from 'react';
import { Text } from 'react-native';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';
import messages from '../messages';

const Auth: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Page title={intl.formatMessage(messages.authTitle)}>
      <Text style={theme.text}>auth</Text>
    </Page>
  );
};

export default Auth;
