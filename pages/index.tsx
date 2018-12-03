import { StyleSheet, Text, View } from 'react-native';
import Counter from '../components/Counter';
import { defineMessages } from 'react-intl';
import useIntl from '../hooks/useIntl';
import Page from '../components/Page';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 16,
    lineHeight: 24,
  },
});

const messages = defineMessages({
  quote: {
    defaultMessage:
      'The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.',
    id: 'indexPage.welcome',
  },
  title: {
    defaultMessage: 'Este',
    id: 'indexPage.title',
  },
});

export default function Index() {
  const intl = useIntl();
  return (
    <Page title={intl.formatMessage(messages.title)}>
      <View style={styles.container}>
        <Text style={styles.text}>{intl.formatMessage(messages.quote)}</Text>
        <Counter />
      </View>
    </Page>
  );
}
