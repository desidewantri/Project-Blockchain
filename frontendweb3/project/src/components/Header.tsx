import React, { useContext } from 'react';
import { Award, Globe, Wallet, LogOut, User } from 'lucide-react';
import { Web3Context, AuthContext } from '../contexts';

export const Header: React.FC = () => {
  const { account, isConnected, connectWallet, disconnectWallet, networkId } = useContext(Web3Context);
  const { user, userType, logout } = useContext(AuthContext);

  const getNetworkName = (id: string | null) => {
    const networks: Record<string, string> = {
      '1': 'Ethereum Mainnet',
      '5': 'Goerli Testnet',
      '11155111': 'Sepolia Testnet'
    };
    return networks[id || ''] || 'Unknown Network';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Award className="h-8 w-8" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">DigiCert Blockchain</h1>
              <p className="text-sm text-blue-100">Secure Digital Certificate Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded">
                  <Globe className="h-3 w-3" />
                  <span>{getNetworkName(networkId)}</span>
                </div>
              </div>
            )}
            
            {isConnected ? (
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                <Wallet className="h-4 w-4" />
                <span className="text-sm">{account.slice(0, 6)}...{account.slice(-4)}</span>
                <button 
                  onClick={disconnectWallet}
                  className="text-red-200 hover:text-red-100"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}

            {user && (
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded capitalize">{userType}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};