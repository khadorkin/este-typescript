import React from 'react';
import { MaybeValidationError, Validator } from '../validators';

interface IFocusable {
  focus: () => void;
}

interface IField {
  ref: (input: IFocusable | null) => void;
}

interface ITextInput extends IField {
  blurOnSubmit: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

interface ISwitch extends IField {
  disabled: boolean;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

interface IPicker extends IField {
  enabled: boolean;
  onValueChange: (value: any) => void;
  selectedValue: any;
}

type Mutation<Input> = {
  [K in keyof Input]: {
    error: MaybeValidationError;
    textInput: ITextInput;
    switch: ISwitch;
    picker: IPicker;
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
  const focusablesRef = React.useRef<{ [key: string]: IFocusable | null }>({});

  const createRef = (key: string) => (focusable: IFocusable | null) => {
    focusablesRef.current[key] = focusable;
  };

  const createError = (key: string) =>
    firstFieldError && firstFieldError[0] === key
      ? firstFieldError[1]
      : undefined;

  const createTextInput = (key: string): ITextInput => ({
    // blurOnSubmit true breaks focus on error on invalid field.
    blurOnSubmit: false,
    editable: true,
    onChangeText: (text: string) => {
      setState({ ...state, [key]: text });
    },
    ref: createRef(key),
    value: state[key],
  });

  const createSwitch = (key: string): ISwitch => ({
    disabled: false,
    onValueChange: (value: boolean) => {
      setState({ ...state, [key]: value });
    },
    ref: createRef(key),
    value: state[key],
  });

  const createPicker = (key: string): IPicker => ({
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
              error: createError(key),
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
