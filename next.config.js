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
  serverRuntimeConfig: {
    // mySecret: process.env.API_SECRET,
  },
  publicRuntimeConfig: {
    // staticFolder: process.env.PRISMA_SECRET,
  },
};
