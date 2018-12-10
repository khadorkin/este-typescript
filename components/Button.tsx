import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import useTheme from '../hooks/useTheme';

type Type = 'text' | 'primary' | 'secondary';

interface IButton extends TouchableOpacityProps {
  label: string;
  type?: Type;
}

const Button: React.FunctionComponent<IButton> = props => {
  const theme = useTheme();
  const { label, disabled, type = 'text', ...rest } = props;
  const getStyle = (type: Type) => {
    const assertNever = (type: never): never => {
      throw new Error('Unexpected object: ' + type);
    };
    switch (type) {
      case 'text':
        return theme.button;
      case 'primary':
        return theme.buttonPrimary;
      case 'secondary':
        return theme.buttonSecondary;
      default:
        assertNever(type);
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      {...rest}
      // TODO: With updated RN types. Probably 0.57+
      // accessibilityRole="button"
    >
      <Text style={[getStyle(type), disabled && theme.buttonDisabled]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
