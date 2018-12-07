import React from 'react';
import { Text } from 'react-native';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';

const messages = defineMessages({
  title: {
    defaultMessage: 'Sign In',
    id: 'authPage.title',
  },
});

const Auth: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Page title={intl.formatMessage(messages.title)}>
      <Text style={theme.text}>auth</Text>
    </Page>
  );
};

export default Auth;
