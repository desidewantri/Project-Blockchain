import React from 'react';
import { Web3Provider, AuthProvider } from './contexts';
import { Root } from './components/Root';

function App() {
  return (
    <Web3Provider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </Web3Provider>
  );
}

export default App;