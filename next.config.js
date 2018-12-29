const withTM = require('next-plugin-transpile-modules');
const withTypescript = require('@zeit/next-typescript');
require('dotenv').config();

const { API_ENDPOINT } = process.env;
if (!API_ENDPOINT) throw Error(`Did you run 'npm run env dev'?`);

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
    apiEndpoint: API_ENDPOINT,
  },
};
