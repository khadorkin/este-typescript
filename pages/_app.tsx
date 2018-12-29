import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import { IntlProvider } from 'react-intl';
import IntlProviderFix from '../components/IntlProviderFix';
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
import { graphql, QueryRenderer } from 'react-relay';

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
            <Component {...pageProps} />
            <QueryRenderer
              environment={environment}
              query={graphql`
                query AppQuery {
                  me {
                    id
                    # email
                  }
                }
              `}
              variables={{}}
              render={({ error, props }) => {
                if (error) {
                  return <div>Error!</div>;
                }
                if (!props) {
                  return <div>Loading...</div>;
                }
                return <div>User ID: {JSON.stringify(props)}</div>;
              }}
            />
          </IntlProviderFix>
        </IntlProvider>
      </Container>
    );
  }
}
