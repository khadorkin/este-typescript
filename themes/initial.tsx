// Typed JSON styles are easily composable and extendable. Spread ftw.
// As for light / dark stuff:
//  1) We can have two themes. One light and one dark.
//  2) We can have one theme containing both light and dark colors.
//  3) We can have both.
// It means:
//  1) Start with semantic names. Like foreground and background colors.
//  2) Then add foreground-whatever (e.g. foreground-dark).
// That's all.

export const colors = {
  background: 'rgb(250, 250, 250)',
  foreground: 'rgb(51, 51, 51)',
  gray: 'rgb(153, 163, 173)',
  primary: 'red',
};

type Colors = typeof colors;

export const dimensions = {
  spaceSmall: 12,
};

type Dimensions = typeof dimensions;

export const createTheme = (colors: Colors, dimensions: Dimensions) => {
  const fontSize = 16;
  const lineHeight = fontSize * 1.5;

  // This is actually applied to html and meta theme-color.
  const page = {
    backgroundColor: colors.background,
    color: colors.primary,
  };

  const container = {
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 768,
    paddingHorizontal: dimensions.spaceSmall,
    // https://css-tricks.com/tale-width-max-width/
    width: '100%',
  };

  const body = {
    flex: 1,
  };

  const text = {
    color: colors.foreground,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize,
    lineHeight,
  };

  const textSmall = {
    ...text,
    fontSize: 12,
  };

  const footer = {
    borderTopColor: colors.gray,
    borderTopWidth: 1,
    paddingVertical: dimensions.spaceSmall,
  };

  return {
    body,
    container,
    footer,
    page,
    text,
    textSmall,
  };
};

const theme = createTheme(colors, dimensions);

export type Theme = typeof theme;

export default theme;
