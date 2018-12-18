import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import useTheme from '../hooks/useTheme';

// Put some space between those components for God's sake!
// The most sane approach I guess. Can't believe CSS ignores this use case.

// https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
const visible = (value: unknown) =>
  !(value == null || typeof value === 'boolean');

interface SpacerProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Spacer: React.FunctionComponent = (props: SpacerProps) => {
  const theme = useTheme();
  const spacedChildren = React.Children.toArray(props.children)
    .filter(visible)
    .reduce(
      (spaced, child, index, array) => {
        if (index === array.length - 1) return [...spaced, child];
        const spacer = (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={`spacer-${index}`}
            style={props.style || theme.spacer}
          />
        );
        return [...spaced, child, spacer];
      },
      [] as React.ReactNode[],
    );
  // Wrap array because FunctionComponent return type does not support it.
  return <>{spacedChildren}</>;
};

export default Spacer;
