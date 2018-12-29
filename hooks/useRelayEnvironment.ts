import React from 'react';
import RelayEnvironmentContext from '../contexts/RelayEnvironmentContext';

const useRelayEnvironment = () => {
  const environment = React.useContext(RelayEnvironmentContext);
  if (environment == null)
    throw Error(
      'useRelayEnvironment: Please provide RelayEnvironmentContext value.',
    );
  return environment;
};

export default useRelayEnvironment;
