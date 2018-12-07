import React from 'react';
import Head from 'next/head';
import useTheme from '../hooks/useTheme';
import { View, Text } from 'react-native';
import Link from '../components/Link';

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
          {/* <View style={theme.header} /> */}
          <View style={theme.body}>{props.children}</View>
          <View style={theme.footer}>
            <Text style={theme.footerText}>
              made by <Link href="https://twitter.com/steida">steida</Link>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Page;
