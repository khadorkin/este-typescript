import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import useTheme from '../hooks/useTheme';
import { Text, RegisteredStyle, TextStyle } from 'react-native';

// Handy wrapper for Next.js Link with React Native Web support.

type LinkProps = Pick<
  NextLinkProps,
  Exclude<keyof NextLinkProps, 'passHref' | 'children' | 'href'>
> & {
  // Allow string etc.
  children: React.ReactNode;
  // Make href required.
  href: NextLinkProps['href'];
  style?: RegisteredStyle<TextStyle>;
  activeStyle?: RegisteredStyle<TextStyle>;
};

const Link: React.FunctionComponent<LinkProps> = props => {
  const theme = useTheme();
  const [isActive, setIsActive] = React.useState(false);
  const { children, style, activeStyle, ...rest } = props;

  // Workaround, @ts-ignore seems not working when props are used directly.
  const reactNativeWebCustomProps = {
    accessibilityRole: 'link',
    onMouseEnter: () => {
      setIsActive(true);
    },
    onMouseLeave: () => {
      setIsActive(false);
    },
  };

  return (
    <NextLink {...rest} passHref>
      <Text
        {...reactNativeWebCustomProps}
        style={[style || theme.link, isActive && theme.linkActive]}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default Link;
