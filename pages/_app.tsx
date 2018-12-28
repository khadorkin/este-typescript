import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import IntlProviderFix from '../components/IntlProviderFix';
// import fetch from 'isomorphic-unfetch';
// import {
//   Environment,
//   Network,
//   RecordSource,
//   Store,
//   FetchFunction,
// } from 'relay-runtime';

// const createRelayEnvironment = (token: string | null, records = {}) => {
//   const fetchQuery: FetchFunction = async (operation, variables) => {
//     // TODO: process.env.API_ENDPOINT
//     const response = await fetch('/graphql', {
//       body: JSON.stringify({ query: operation.text, variables }),
//       // lepe? rovnou? hmm, ne
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token != null ? { authorization: `Bearer ${token}` } : null),
//       },
//       method: 'POST',
//     });
//     return response.json();
//   };
//   return new Environment({
//     network: Network.create(fetchQuery),
//     store: new Store(new RecordSource(records)),
//   });
// };

export default class MyApp extends App<{
  initialNow: number;
}> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      initialNow: Date.now(),
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, initialNow } = this.props;

    return (
      <Container>
        <IntlProvider
          locale="en"
          initialNow={initialNow}
          textComponent={React.Fragment}
        >
          <IntlProviderFix>
            <Component {...pageProps} />
          </IntlProviderFix>
        </IntlProvider>
      </Container>
    );
  }
}
