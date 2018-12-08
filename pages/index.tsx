import React from 'react';
import { Text } from 'react-native';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';
import useTheme from '../hooks/useTheme';
import messages from '../messages';

const Index: React.FunctionComponent = () => {
  const intl = useIntl();
  const theme = useTheme();
  const title = intl.formatMessage(messages.indexTitle);

  return (
    <Page title={title}>
      <Text style={theme.heading1}>{title}</Text>
      <Text style={theme.paragraph}>
        {intl.formatMessage(messages.indexQuote)}
      </Text>
    </Page>
  );
};

export default Index;
