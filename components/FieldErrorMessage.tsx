import React from 'react';
import { FieldError } from '../validators';
import { FormattedMessage } from 'react-intl';

type MaybeFieldError = FieldError | undefined;

export type FieldErrors<Input> = { [P in keyof Input]?: MaybeFieldError };

interface IFieldErrorProps {
  error: MaybeFieldError;
}

const FieldErrorMessage: React.FunctionComponent<IFieldErrorProps> = ({
  error,
}) => {
  if (error == null) return null;
  const unknownType = (error: never) => error;

  switch (error) {
    case 'REQUIRED':
      return (
        <FormattedMessage
          id="fieldError.required"
          defaultMessage="Please fill out this field."
        />
      );
    case 'EMAIL':
      return (
        <FormattedMessage
          id="fieldError.email"
          defaultMessage="Email address is not valid."
        />
      );
    case 'MIN_5_CHARS':
      return (
        <FormattedMessage
          id="fieldError.minLength"
          defaultMessage="{minLength} characters minimum."
          values={{ minLength: 5 }}
        />
      );
    // case 'MAX_140_CHARS':
    case 'MAX_1024_CHARS':
      return (
        <FormattedMessage
          id="fieldError.maxLength"
          defaultMessage="{maxLength} characters maximum."
          // values={{ maxLength: error === 'MAX_140_CHARS' ? 140 : 1024 }}
          values={{ maxLength: 1024 }}
        />
      );
    case 'ALREADY_EXISTS':
      return (
        <FormattedMessage
          id="fieldError.alreadyExists"
          defaultMessage="Already exists."
        />
      );
    case 'NOT_EXISTS':
      return (
        <FormattedMessage
          id="fieldError.notExists"
          defaultMessage="Not exists."
        />
      );
    default:
      return unknownType(error);
  }
};

export default FieldErrorMessage;
