import { StyleSheet, Text, View } from 'react-native';
import Head from 'next/head';
import Counter from '../components/Counter';
import { FormattedMessage } from 'react-intl';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
  },
});

export default function Index() {
  return (
    <>
      <FormattedMessage id="index.title" defaultMessage="Este">
        {message => (
          <Head>
            <title>{message}</title>
          </Head>
        )}
      </FormattedMessage>
      <View style={styles.container}>
        <Text style={styles.text}>
          <FormattedMessage
            id="index.welcome"
            defaultMessage="Welcome to Next.js!"
          />
        </Text>
        <Counter />
      </View>
    </>
  );
}
