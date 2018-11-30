import { StyleSheet, Text, View } from 'react-native';
import Head from 'next/head';
import Counter from '../components/Counter';

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
      <Head>
        <title>Este</title>
      </Head>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Next.js!</Text>
        <Counter />
      </View>
    </>
  );
}
