import React from 'react';
import Head from 'next/head';
import useTheme from '../hooks/useTheme';
import { View, StyleSheet, Text } from 'react-native';

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View>
      <Text style={theme.text}>header</Text>
    </View>
  );
};

const Footer: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View>
      <Text style={theme.text}>footer</Text>
    </View>
  );
};

const Page: React.FunctionComponent<{
  title: string;
}> = props => {
  const theme = useTheme();
  const pageStyle = React.useMemo(() => StyleSheet.flatten(theme.page), [
    theme,
  ]);

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="theme-color" content={pageStyle.color} />
        <style>{`html { background-color: ${
          pageStyle.backgroundColor
        } }`}</style>
      </Head>
      <View style={theme.container}>
        <Header />
        <View style={theme.body}>{props.children}</View>
        <Footer />
      </View>
    </>
  );
};

export default Page;
