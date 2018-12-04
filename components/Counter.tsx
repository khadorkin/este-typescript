import React from 'react';

const Counter: React.FunctionComponent = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked: ${count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
