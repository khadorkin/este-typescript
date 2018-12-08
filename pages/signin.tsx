import React from 'react';
import { Text } from 'react-native';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';
import messages from '../messages';

const SignIn: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Page title={intl.formatMessage(messages.signInTitle)}>
      <Text style={theme.text}>sign in</Text>
    </Page>
  );
};

export default SignIn;
