import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Text } from 'react-native';
import useTheme from '../hooks/useTheme';
import { MaybeValidationError } from '../validators';

interface IValidationErrorProps {
  error: MaybeValidationError;
}

// Validation errors are not collocated because they are reused.

const ValidationError: React.FunctionComponent<IValidationErrorProps> = ({
  error,
}) => {
  const theme = useTheme();

  const getMessage = () => {
    if (error == null) return null;
    const unknownType = (error: never) => error;
    switch (error) {
      case 'REQUIRED':
        return (
          <FormattedMessage
            id="ValidationError.required"
            defaultMessage="Please fill out this field."
          />
        );
      case 'EMAIL':
        return (
          <FormattedMessage
            id="ValidationError.email"
            defaultMessage="Email address is not valid."
          />
        );
      case 'MIN_5_CHARS':
        return (
          <FormattedMessage
            id="ValidationError.minLength"
            defaultMessage="{minLength} characters minimum."
            values={{ minLength: 5 }}
          />
        );
      // case 'MAX_140_CHARS':
      case 'MAX_1024_CHARS':
        return (
          <FormattedMessage
            id="ValidationError.maxLength"
            defaultMessage="{maxLength} characters maximum."
            // values={{ maxLength: error === 'MAX_140_CHARS' ? 140 : 1024 }}
            values={{ maxLength: 1024 }}
          />
        );
      case 'ALREADY_EXISTS':
        return (
          <FormattedMessage
            id="ValidationError.alreadyExists"
            defaultMessage="Already exists."
          />
        );
      case 'NOT_EXISTS':
        return (
          <FormattedMessage
            id="ValidationError.notExists"
            defaultMessage="Not exists."
          />
        );
      default:
        return unknownType(error);
    }
  };

  return <Text style={theme.validationError}>{getMessage()}</Text>;
};

export default ValidationError;
