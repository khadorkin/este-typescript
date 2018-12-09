// Typed JSON styles are easily composable and extendable. Spread ftw.
// As for light / dark stuff:
//  1) We can have two themes. One light and one dark.
//  2) We can have one theme containing both light and dark colors.
//  3) We can have both.
// It means:
//  1) Start with semantic names. Like foreground and background colors.
//  2) Then add foreground-whatever (e.g. foreground-dark).
// That's all.
import { ViewStyle, TextStyle } from 'react-native';

// https://yeun.github.io/open-color/
export const colors = {
  background: '#fff',
  foreground: 'rgb(51, 51, 51)',
  gray: 'rgb(153, 163, 173)',
  primary: '#228be6',
};

type Colors = typeof colors;

export const dimensions = {
  space: 24, // Like default lineHeight
  spaceSmall: 12,
};

type Dimensions = typeof dimensions;

// modularscale.com
export const ModularScale = {
  step0: 1,
  step1: 16 / 15,
  step2: 9 / 8,
  step3: 6 / 5,
  step4: 5 / 4,
  step5: 4 / 3,
  step6: Math.SQRT2,
  step7: 3 / 2,
  step8: 8 / 5,
  step9: 5 / 3,
  // tslint:disable-next-line:object-literal-sort-keys
  step10: 16 / 9,
  step11: 15 / 8,
  step12: 2,
  step13: 5 / 2,
  step14: 8 / 3,
  step15: 3,
  step16: 4,
};

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const createTypography = ({
  fontSize,
  lineHeight,
  scale,
}: {
  fontSize: number;
  lineHeight: number;
  scale: keyof typeof ModularScale;
}) => {
  const computeModularLineHeight = (modularFontSize: number) => {
    const lines = Math.ceil(modularFontSize / lineHeight);
    return lines * lineHeight;
  };
  return {
    scale: (level: number) => {
      const modularFontSize = fontSize * ModularScale[scale] ** level;
      const modularLineHeight = computeModularLineHeight(modularFontSize);
      return {
        fontSize: modularFontSize,
        lineHeight: modularLineHeight,
      };
    },
  };
};

export const createTheme = (colors: Colors, dimensions: Dimensions) => {
  const lineHeight = 24;
  const typography = createTypography({
    fontSize: 16,
    lineHeight,
    scale: 'step5',
  });

  const text: TextStyle = {
    color: colors.foreground,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    ...typography.scale(0),
  };

  const marginBottom: ViewStyle = {
    marginBottom: lineHeight,
  };

  const paragraph: TextStyle = {
    ...text,
    ...marginBottom,
  };

  const heading1: TextStyle = {
    ...text,
    ...marginBottom,
    ...typography.scale(2),
    color: colors.gray,
    fontWeight: 'bold',
  };

  const heading2: TextStyle = {
    ...text,
    ...marginBottom,
    ...typography.scale(1),
  };

  const page: TextStyle = {
    backgroundColor: colors.background,
    flex: 1,
  };

  const container: ViewStyle = {
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 768,
    paddingHorizontal: dimensions.spaceSmall,
    // https://css-tricks.com/tale-width-max-width/
    width: '100%',
  };

  const header: ViewStyle = {
    flexDirection: 'row',
    paddingVertical: dimensions.space,
  };

  const body: ViewStyle = {
    flex: 1,
  };

  const footer: ViewStyle = {
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    paddingVertical: dimensions.spaceSmall,
  };

  const footerText: TextStyle = {
    ...text,
    ...typography.scale(-1),
  };

  const link: TextStyle = {
    // Link does not extend text, because link can be in any text and inherits
    // it's styles like fontFamily and fontSize. Therefore, Link must be always
    // wrapped by Text.
    color: colors.primary,
  };

  const linkActive: TextStyle = {
    textDecorationLine: 'underline',
  };

  const spacer: ViewStyle = {
    width: dimensions.spaceSmall,
  };

  return {
    body,
    container,
    footer,
    footerText,
    header,
    heading1,
    heading2,
    link,
    linkActive,
    page,
    paragraph,
    spacer,
    text,
  };
};

const theme = createTheme(colors, dimensions);

export type Theme = typeof theme;

export default theme;
