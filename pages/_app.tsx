import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { IntlProvider } from 'react-intl';
import IntlProviderFix from '../components/IntlProviderFix';
import ThemeContext from '../contexts/ThemeContext';
import initialTheme from '../themes/initial';
import darkTheme from '../themes/dark';

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
    const isInitialTheme = false;
    const theme = isInitialTheme ? initialTheme : darkTheme;

    return (
      <Container>
        <IntlProvider
          locale="en"
          initialNow={initialNow}
          // https://github.com/yahoo/react-intl/issues/999#issuecomment-335799491
          textComponent={React.Fragment}
        >
          <IntlProviderFix>
            <ThemeContext.Provider value={theme}>
              <Component {...pageProps} />
            </ThemeContext.Provider>
          </IntlProviderFix>
        </IntlProvider>
      </Container>
    );
  }
}
