import React from 'react';
import { Text } from 'react-native';
import Link from '../components/Link';
import Page, { pageMessages } from '../components/Page';
import useIntl from '../hooks/useIntl';
import useTheme from '../hooks/useTheme';

const Index: React.FunctionComponent = () => {
  const theme = useTheme();
  const intl = useIntl();
  const title = intl.formatMessage(pageMessages.pageTitleIndex);

  return (
    <Page title={title}>
      <Text style={theme.heading1}>{title}</Text>
      <Text style={theme.paragraph}>
        <Link href={{ pathname: '/signin', query: { redirectUrl: '/' } }}>
          Create web
        </Link>
      </Text>
    </Page>
  );
};

export default Index;
