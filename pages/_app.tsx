import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import IntlProviderFix from '../components/IntlProviderFix';
import RelayEnvironmentContext from '../contexts/RelayEnvironmentContext';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import fetch from 'isomorphic-unfetch';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';
import ThemeContext from '../contexts/ThemeContext';
import darkTheme from '../themes/dark';
import initialTheme from '../themes/initial';

const createRelayEnvironment = (token: string | null, records = {}) => {
  const fetchQuery: FetchFunction = async (operation, variables) => {
    const response = await fetch(publicRuntimeConfig.apiEndpoint, {
      body: JSON.stringify({ query: operation.text, variables }),
      headers: {
        'Content-Type': 'application/json',
        ...(token != null ? { authorization: `Bearer ${token}` } : null),
      },
      method: 'POST',
    });
    return response.json();
  };
  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource(records)),
  });
};

export default class MyApp extends App<{
  initialNow: number;
}> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};
    // ctx.req

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

    const isInitialTheme = false;
    const theme = isInitialTheme ? initialTheme : darkTheme;

    // const environment = createRelayEnvironment({ token, records });
    const environment = createRelayEnvironment(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanE4dXVkeG8wMGJ4MDc3ODI3NXRpbmh6IiwiaWF0IjoxNTQ2MDUwOTk0fQ.zvMweHWCVNItWDjSkYzvmX2SBfahVZWKmV-3QlycWPo',
    );

    return (
      <Container>
        <IntlProvider
          locale="en"
          initialNow={initialNow}
          textComponent={React.Fragment}
        >
          <IntlProviderFix>
            <ThemeContext.Provider value={theme}>
              <RelayEnvironmentContext.Provider value={environment}>
                <Component {...pageProps} />
              </RelayEnvironmentContext.Provider>
            </ThemeContext.Provider>
          </IntlProviderFix>
        </IntlProvider>
      </Container>
    );
  }
}
