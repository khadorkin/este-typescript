import { StyleSheet, Text, View } from 'react-native';
import Head from 'next/head';
import Counter from '../components/Counter';
import { FormattedMessage, defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';

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

const messages = defineMessages({
  title: {
    defaultMessage: 'Este',
    id: 'indexPage.title',
  },
});

export default function Index() {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>{intl.formatMessage(messages.title)}</title>
      </Head>
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
