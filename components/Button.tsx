import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import useTheme from '../hooks/useTheme';

type Type = 'text' | 'primary' | 'secondary';

interface IButtonProps extends TouchableOpacityProps {
  label: string;
  type?: Type;
}

const Button: React.FunctionComponent<IButtonProps> = props => {
  const theme = useTheme();
  const { label, disabled, type = 'text', ...rest } = props;
  const getStyle = (type: Type) => {
    const unknownType = (_: never) => null;
    switch (type) {
      case 'text':
        return theme.button;
      case 'primary':
        return theme.buttonPrimary;
      case 'secondary':
        return theme.buttonSecondary;
      default:
        return unknownType(type);
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
