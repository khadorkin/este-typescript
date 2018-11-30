import Head from 'next/head';
import Counter from '../components/Counter';

export default function Index() {
  return (
    <>
      <Head>
        <title>Este</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <div>
        Welcome to Next.js! <Counter />
      </div>
    </>
  );
}
