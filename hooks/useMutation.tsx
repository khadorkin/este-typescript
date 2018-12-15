import React from 'react';

interface IFocusable {
  focus: () => void;
}

interface IField {
  ref: (input: IFocusable | null) => void;
}

interface ITextInput extends IField {
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

type Mutation<InitialState> = {
  [K in keyof InitialState]: {
    textInput: ITextInput;
    switch: ISwitch;
    picker: IPicker;
  }
};

type Commit = () => void;

// "extends any" is hack for JSX.
const useMutation = <InitialState extends any>(
  initialState: InitialState,
): [Mutation<InitialState>, Commit] => {
  // TODO: Consider Apollo local state to have precise types and state
  // persistence across pages.
  const [state, setState] = React.useState<InitialState>(initialState);
  const focusablesRef = React.useRef<{ [key: string]: IFocusable | null }>({});

  const createRef = (key: string) => (focusable: IFocusable | null) => {
    focusablesRef.current[key] = focusable;
  };

  const createTextInput = (key: string): ITextInput => ({
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

  const mutation = React.useMemo<Mutation<InitialState>>(
    () => {
      return Object.keys(initialState).reduce(
        (mutation, key) => {
          // TODO: How to type this intermediate object?
          return {
            ...mutation,
            [key]: {
              picker: createPicker(key),
              switch: createSwitch(key),
              textInput: createTextInput(key),
            },
          };
        },
        {} as Mutation<InitialState>,
      );
    },
    [state],
  );

  const commit = () => {
    // console.log(state);
    // const focusables = focusablesRef.current;
    // if (focusables.email) focusables.email.focus();
  };

  return [mutation, commit];
};

export default useMutation;
