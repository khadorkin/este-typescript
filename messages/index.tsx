import { defineMessages } from 'react-intl';

// All messages are in this one file, because:
// 1) Messages are reused, e.g. MainNav could require all pages/ titles. Bad.
// 2) Messages ids are namespaced, therefore having them at one place helps.

export default defineMessages({
  authTitle: {
    defaultMessage: 'Sign In',
    id: 'authTitle',
  },
  indexQuote: {
    defaultMessage:
      'The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.',
    id: 'indexQuote',
  },
  indexTitle: {
    defaultMessage: 'Este',
    id: 'indexTitle',
  },
});
