// JSON styles are easily composable, extendable, typed, etc.
// React Native StyleSheet.create is an implementation detail.
// https://github.com/necolas/react-native-web/issues/1194
// As for light / dark stuff:
//  1) We can have two themes. One light and one dark.
//  2) We can have one theme containing both light and dark colors.
//  3) We can have both.
// It means:
//  1) Start with semantic names. Like foreground and background colors.
//  2) Then add foreground-whatever (e.g. foreground-dark) you need.
// That's all.

const colors = {
  foreground: 'rgb(51, 51, 51)',
  background: 'rgb(250, 250, 250)',
};

type Colors = typeof colors;

function createTheme(colors: Colors) {
  // Compose ftw.
  const text = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 16,
    lineHeight: 24,
    color: colors.foreground,
  };

  return {
    text,
  };
}

const theme = createTheme(colors);

export type Theme = typeof theme;

export default theme;
