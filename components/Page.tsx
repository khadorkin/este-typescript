import Head from 'next/head';
import React from 'react';
import { defineMessages } from 'react-intl';
import { Text, View } from 'react-native';
import Link from '../components/Link';
import Spacer from '../components/Spacer';
import useIntl from '../hooks/useIntl';
import useTheme from '../hooks/useTheme';

export const pageMessages = defineMessages({
  pageFooterMadeBy: {
    defaultMessage: 'made by',
    id: 'pageFooterMadeBy',
  },
  pageTitleIndex: {
    defaultMessage: 'Este',
    id: 'pageTitleIndex',
  },
  pageTitleSignIn: {
    defaultMessage: 'Sign in',
    id: 'pageTitleSignIn',
  },
});

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <View style={theme.header}>
      <Spacer>
        <Text style={theme.text}>
          <Link href="/">
            {intl.formatMessage(pageMessages.pageTitleIndex)}
          </Link>
        </Text>
        <Text style={theme.text}>
          <Link href={{ pathname: '/signin' }}>
            {intl.formatMessage(pageMessages.pageTitleSignIn)}
          </Link>
        </Text>
      </Spacer>
    </View>
  );
};

const Footer: React.FunctionComponent = () => {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <View style={theme.footer}>
      <Text style={theme.footerText}>
        {intl.formatMessage(pageMessages.pageFooterMadeBy)}{' '}
        <Link href="https://twitter.com/steida">steida</Link>
      </Text>
    </View>
  );
};

const Page: React.FunctionComponent<{
  title: string;
}> = props => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <View style={theme.page}>
        <View style={theme.container}>
          <Header />
          <View style={theme.body}>{props.children}</View>
          <Footer />
        </View>
      </View>
    </>
  );
};

export default Page;
