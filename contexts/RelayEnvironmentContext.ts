import React from 'react';
import { Environment } from 'relay-runtime';

export default React.createContext<Environment | null>(null);
