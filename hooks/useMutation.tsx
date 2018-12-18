import React from 'react';
import { MaybeValidationError, Validator } from '../validators';

interface Focusable {
  focus: () => void;
}

interface Field {
  ref: (input: Focusable | null) => void;
}

interface TextInputField extends Field {
  blurOnSubmit: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

interface SwitchField extends Field {
  disabled: boolean;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

interface PickerField extends Field {
  enabled: boolean;
  onValueChange: (value: any) => void;
  selectedValue: any;
}

type Mutation<Input> = {
  [K in keyof Input]: {
    error: MaybeValidationError;
    textInput: TextInputField;
    switch: SwitchField;
    picker: PickerField;
  }
};

// TODO: Make inputMapper optional, add onComplete.
type Commit<Input> = (inputMapper: (input: Input) => Input) => void;

type FieldError = [string, MaybeValidationError];

// 'extends any' because of https://github.com/Microsoft/TypeScript/issues/4922
// TODO: Ask Marius why extends {} does not work.
const useMutation = <Input extends any>(
  initialState: Input,
  options?: {
    validator?: Validator<Input>;
  },
): [Mutation<Input>, Commit<Input>] => {
  // TODO: Consider Apollo local state for types and across pages persistence.
  const [state, setState] = React.useState<Input>(initialState);
  const [firstFieldError, setFirstFieldError] = React.useState<
    FieldError | undefined
  >(undefined);
  const focusablesRef = React.useRef<{ [key: string]: Focusable | null }>({});

  const createRef = (key: string) => (focusable: Focusable | null) => {
    focusablesRef.current[key] = focusable;
  };

  const createTextInput = (key: string): TextInputField => ({
    // blurOnSubmit true breaks focus on error on invalid field.
    blurOnSubmit: false,
    editable: true,
    onChangeText: (text: string) => {
      setState({ ...state, [key]: text });
    },
    ref: createRef(key),
    value: state[key],
  });

  const createSwitch = (key: string): SwitchField => ({
    disabled: false,
    onValueChange: (value: boolean) => {
      setState({ ...state, [key]: value });
    },
    ref: createRef(key),
    value: state[key],
  });

  const createPicker = (key: string): PickerField => ({
    enabled: true,
    onValueChange: (value: unknown) => {
      setState({ ...state, [key]: value });
    },
    ref: createRef(key),
    selectedValue: state[key],
  });

  const mutation = React.useMemo<Mutation<Input>>(
    () =>
      Object.keys(initialState).reduce(
        (mutation, key) => {
          // TODO: How to type this intermediate object?
          return {
            ...mutation,
            [key]: {
              error:
                firstFieldError && firstFieldError[0] === key
                  ? firstFieldError[1]
                  : undefined,
              picker: createPicker(key),
              switch: createSwitch(key),
              textInput: createTextInput(key),
            },
          };
        },
        {} as Mutation<Input>,
      ),
    [state, firstFieldError],
  );

  const commit: Commit<Input> = inputMapper => {
    const input = inputMapper(state);
    if (options && options.validator) {
      const errors = options.validator(input);
      // Get first error defined by the object keys in order to have one by one
      // validation. Sure we can show all errors, but that's noisy.
      const error = Object.entries(errors).find(([_, value]) => value != null);
      setFirstFieldError(error);
      if (error) {
        const field = focusablesRef.current[error[0]];
        if (field) field.focus();
      }
    }
  };

  return [mutation, commit];
};

export default useMutation;
