import React from 'react';
import { Text, TextProps } from 'react-native';

// Add React Native Web custom props.
// https://github.com/necolas/react-native-web/issues/832#issuecomment-445503085
interface IAppTextProps extends TextProps {
  accessibilityRole?: 'link';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AppText: React.FunctionComponent<IAppTextProps> = props => {
  return <Text {...props} />;
};

export default AppText;
