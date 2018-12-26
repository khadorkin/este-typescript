import React from 'react';

interface Focusable {
  focus: () => void;
}

interface FocusableField {
  ref: (input: Focusable | null) => void;
}

interface TextInputField extends FocusableField {
  blurOnSubmit: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

interface SwitchField extends FocusableField {
  disabled: boolean;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

interface PickerField extends FocusableField {
  enabled: boolean;
  onValueChange: (value: any) => void;
  selectedValue: any;
}

type Field<Value> = Value extends boolean
  ? {
      switch: SwitchField;
    }
  : Value extends string
  ? {
      textInput: TextInputField;
      picker: PickerField;
    }
  : never;

type Fields<Input> = { [K in keyof Input]: Field<Input[K]> };

type Commit<Input> = (
  options?: {
    merge: Partial<Input>;
  },
) => void;

// Read it like a story. First, we need fields, then we can commit, etc.
type Return<Input, Errors> = [Fields<Input>, Commit<Input>, Partial<Errors>];

// 'extends any' because of https://github.com/Microsoft/TypeScript/issues/4922
const useMutation = <Input extends any, Errors extends any>(
  initialState: Input,
  useMutationOptions?: {
    validator?: (input: Input) => Errors;
  },
): Return<Input, Errors> => {
  const [state, setState] = React.useState<Input>(initialState);
  const [errors, setErrors] = React.useState<Partial<Errors>>({});
  const focusablesRef = React.useRef<{ [key: string]: Focusable | null }>({});

  const fields = React.useMemo<Fields<Input>>(
    () => {
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
        onValueChange: (value: string) => {
          setState({ ...state, [key]: value });
        },
        ref: createRef(key),
        selectedValue: state[key],
      });

      // TODO: How to type field and return values properly?
      return Object.keys(state).reduce((fields, key) => {
        const value = state[key];
        const field =
          typeof value === 'boolean'
            ? { switch: createSwitch(key) }
            : {
                picker: createPicker(key),
                textInput: createTextInput(key),
              };
        return { ...fields, [key]: field };
      }, {}) as Fields<Input>;
    },
    [state],
  );

  const commit: Commit<Input> = commitOptions => {
    const input = {
      ...state,
      ...(commitOptions && commitOptions.merge),
    };

    if (useMutationOptions && useMutationOptions.validator) {
      const errors = useMutationOptions.validator(input);
      const error = Object.entries(errors).find(([_, value]) => value != null);
      // as Errors is workaround, TypeScript should infer it.
      setErrors(error ? ({ [error[0]]: error[1] } as Errors) : {});
      if (error) {
        const field = focusablesRef.current[error[0]];
        if (field) field.focus();
      }
    }
  };

  return [fields, commit, errors];
};

export default useMutation;
