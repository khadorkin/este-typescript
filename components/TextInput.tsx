import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface IAppTextProps extends TextInputProps {
  autoComplete?: 'email';
}

const AppTextInput: React.FunctionComponent<IAppTextProps> = props => {
  return <TextInput {...props} />;
};

export default AppTextInput;
