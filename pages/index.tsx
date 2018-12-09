import React from 'react';
import useIntl from '../hooks/useIntl';
import Page, { pageMessages } from '../components/Page';
import useTheme from '../hooks/useTheme';
import Link from '../components/Link';
import { Text } from 'react-native';

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
