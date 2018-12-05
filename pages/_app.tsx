import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { IntlProvider } from 'react-intl';
import IntlProviderFix from '../components/IntlProviderFix';
import ThemeContext from '../components/ThemeContext';
import initialTheme from '../themes/initial';

interface IAppProps {
  initialNow: number;
}

export default class MyApp extends App<IAppProps> {
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
    // TODO: Dark by user preferences.
    const theme = initialTheme;

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
