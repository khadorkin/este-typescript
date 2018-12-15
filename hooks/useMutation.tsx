import React from 'react';

type Mutation<InitialState> = {
  [K in keyof InitialState]: {
    textInput: any;
  }
};

const useMutation = <InitialState extends {}>(
  initialState: InitialState,
): [Mutation<InitialState>] => {
  // TODO: Consider Apollo local state.
  const [state, setState] = React.useState(initialState);

  // TODO: Ref and editable for pending mutation.
  const createTextInput = (key: keyof InitialState) => {
    return {
      onChangeText: (text: string) => {
        setState({ ...state, [key]: text });
      },
      value: state[key],
    };
  };

  // refs furt nove?
  const mutation = React.useMemo(
    () => {
      return Object.keys(initialState).reduce((mutation, key) => {
        return {
          ...mutation,
          [key]: {
            textInput: createTextInput(key as keyof InitialState),
          },
        };
      }, {});
    },
    [state],
  );

  // const commit = () => {
  //   //
  // };

  // @ts-ignore
  return [mutation /*, commit */];
};

export default useMutation;
