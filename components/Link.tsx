import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import useTheme from '../hooks/useTheme';
import { Text, RegisteredStyle, TextStyle } from 'react-native';
import { withRouter, WithRouterProps } from 'next/router';

// Wrapper for Next.js Link with React Native Web support and some other things.

type Href =
  | '/'
  | 'https://twitter.com/steida'
  | {
      pathname: '/signin';
      query?: { redirectUrl: string };
    };

type LinkProps = Pick<
  NextLinkProps,
  Exclude<keyof NextLinkProps, 'passHref' | 'children' | 'href'>
> &
  WithRouterProps & {
    // Allow string etc.
    children: React.ReactNode;
    // Make href typed and required.
    href: Href;
    style?: RegisteredStyle<TextStyle>;
    activeStyle?: RegisteredStyle<TextStyle>;
  };

const Link: React.FunctionComponent<LinkProps> = props => {
  const theme = useTheme();
  const [isActive, setIsActive] = React.useState(false);
  const { children, style, activeStyle, router, href, ...rest } = props;

  // Must be spread because @ts-ignore does not work for some reason.
  // Btw, VSCode by default does not show an error while tsc does.
  // To enforce the same VSCode behavior as tsc:
  // https://github.com/este/este/wiki/Recommended-VSCode-Settings
  const reactNativeWebCustomProps = {
    accessibilityRole: 'link',
    onMouseEnter: () => {
      setIsActive(true);
    },
    onMouseLeave: () => {
      setIsActive(false);
    },
  };

  const routeIsActive = () => {
    if (router == null) return false;
    const linkPathname = typeof href === 'object' ? href.pathname : href;
    const linkQuery = typeof href === 'object' ? href.query : null;
    return (
      linkPathname === router.pathname &&
      (linkQuery == null
        ? true
        : JSON.stringify(linkQuery) === JSON.stringify(router.query))
    );
  };

  return (
    <NextLink {...rest} href={href} passHref>
      <Text
        {...reactNativeWebCustomProps}
        style={[
          style || theme.link,
          (isActive || routeIsActive()) && (activeStyle || theme.linkActive),
        ]}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default withRouter(Link);
