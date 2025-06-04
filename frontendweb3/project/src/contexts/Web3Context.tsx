import React, { createContext, useState } from 'react';

interface Web3ContextType {
  web3: any;
  account: string;
  contract: any;
  isConnected: boolean;
  networkId: string | null;
  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => void;
}

export const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: '',
  contract: null,
  isConnected: false,
  networkId: null,
  connectWallet: async () => null,
  disconnectWallet: () => {},
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkId, setNetworkId] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        const network = await window.ethereum.request({
          method: 'net_version'
        });
        setAccount(accounts[0]);
        setNetworkId(network);
        setIsConnected(true);
        return accounts[0];
      } catch (error) {
        console.error('Error connecting wallet:', error);
        return null;
      }
    } else {
      alert('Please install MetaMask to use this application');
      return null;
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
    setWeb3(null);
    setContract(null);
    setNetworkId(null);
  };

  return (
    <Web3Context.Provider value={{
      web3,
      account,
      contract,
      isConnected,
      networkId,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </Web3Context.Provider>
  );
};