const withTM = require('next-plugin-transpile-modules');
const withTypescript = require('@zeit/next-typescript');
require('dotenv').config();

module.exports = {
  ...withTypescript(
    withTM({
      transpileModules: ['react-native-web'],
      webpack: config => {
        // Alias all `react-native` imports to `react-native-web`
        config.resolve.alias = {
          'react-native$': 'react-native-web',
        };
        return config;
      },
    }),
  ),
  publicRuntimeConfig: {
    // staticFolder: process.env.PUBLIC_CONFIG_VALUE,
  },
  serverRuntimeConfig: {
    // mySecret: process.env.SECRET_CONFIG_VALUE,
  },
};
