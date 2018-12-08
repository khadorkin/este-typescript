import React from 'react';
import { Text } from 'react-native';
import Counter from '../components/Counter';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';
import messages from '../messages';

const Index: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Page title={intl.formatMessage(messages.indexTitle)}>
      <Text style={theme.text}>{intl.formatMessage(messages.indexQuote)}</Text>
      <Counter />
    </Page>
  );
};

export default Index;
