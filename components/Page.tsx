import React from 'react';
import Head from 'next/head';
import useTheme from '../hooks/useTheme';
import { View, StyleSheet, Text } from 'react-native';

const Container: React.FunctionComponent = props => {
  const theme = useTheme();
  return <View style={theme.container}>{props.children}</View>;
};

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View>
      <Text style={theme.text}>header</Text>
    </View>
  );
};

const Body: React.FunctionComponent = props => {
  const theme = useTheme();
  return <View style={theme.body}>{props.children}</View>;
};

const Footer: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <View style={theme.footer}>
      <Text style={[theme.textSmall]}>made by steida</Text>
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
      <Container>
        <Header />
        <Body>{props.children}</Body>
        <Footer />
      </Container>
    </>
  );
};

export default Page;
