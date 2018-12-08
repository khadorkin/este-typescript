import { defineMessages } from 'react-intl';

// All messages are in this one file, because:
// 1) Messages are reused, e.g. MainNav could require all pages/ titles. Bad.
// 2) Messages ids are namespaced, therefore having them at one place helps.

export default defineMessages({
  indexTitle: {
    defaultMessage: 'Este',
    id: 'indexTitle',
  },
  pageFooterMadeBy: {
    defaultMessage: 'made by',
    id: 'pageFooterMadeBy',
  },
  signInTitle: {
    defaultMessage: 'Sign in',
    id: 'signInTitle',
  },
});
