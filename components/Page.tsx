import React from 'react';
import Head from 'next/head';
import useTheme from '../hooks/useTheme';
import { View, Text } from 'react-native';
import Link from '../components/Link';
import messages from '../messages';
import useIntl from '../hooks/useIntl';
import Spacer from '../components/Spacer';

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  const intl = useIntl();
  return (
    <View style={theme.header}>
      <Spacer>
        <Text style={theme.text}>
          <Link href="/">{intl.formatMessage(messages.indexTitle)}</Link>
        </Text>
        <Text style={theme.text}>
          <Link href={{ pathname: '/signin' }}>
            {intl.formatMessage(messages.signInTitle)}
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
        {intl.formatMessage(messages.pageFooterMadeBy)}{' '}
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
