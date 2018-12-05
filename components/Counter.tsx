import React from 'react';
import { Text, Button, View } from 'react-native';
import useTheme from '../hooks/useTheme';

const Counter: React.FunctionComponent = () => {
  const [count, setCount] = React.useState(0);
  const theme = useTheme();
  return (
    <>
      <Text style={theme.text}>You clicked: ${count} times.</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Click me" onPress={() => setCount(count + 1)} />
      </View>
    </>
  );
};

export default Counter;
