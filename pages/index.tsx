import React from 'react';
import { Text } from 'react-native';
import Counter from '../components/Counter';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';

const messages = defineMessages({
  quote: {
    defaultMessage:
      'The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.',
    id: 'indexPage.welcome',
  },
  title: {
    defaultMessage: 'Este',
    id: 'indexPage.title',
  },
});

const Index: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Page title={intl.formatMessage(messages.title)}>
      <Text style={theme.text}>{intl.formatMessage(messages.quote)}</Text>
      <Counter />
    </Page>
  );
};

export default Index;
