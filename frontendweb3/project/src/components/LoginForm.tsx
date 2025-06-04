import React, { useState, useContext } from 'react';
import { Award, Users, User, Shield, CheckCircle } from 'lucide-react';
import { Web3Context, AuthContext } from '../contexts';

export const LoginForm: React.FC = () => {
  const [loginType, setLoginType] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const { connectWallet, isConnected } = useContext(Web3Context);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      const account = await connectWallet();
      if (!account) return;
    }

    // Mock login logic
    const userData = {
      id: 1,
      name: loginType === 'institution' ? 'Universitas Gadjah Mada' : 
            loginType === 'student' ? 'Desi D Simamora' : 'HR Verifier',
      email: credentials.username
    };

    login(userData, loginType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Award className="h-20 w-20 text-blue-600 mx-auto mb-4" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">DigiCert Portal</h2>
          <p className="text-gray-600 text-lg">Secure Digital Certificate Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              type: 'institution',
              icon: Users,
              title: 'Institution Portal',
              desc: 'Issue and manage digital certificates',
              color: 'bg-blue-500',
              features: ['Issue Certificates', 'Manage Students', 'Analytics Dashboard']
            },
            {
              type: 'student',
              icon: User,
              title: 'Student Portal',
              desc: 'View and share your certificates',
              color: 'bg-green-500',
              features: ['View Certificates', 'Download NFT', 'Share Verification']
            },
            {
              type: 'verifier',
              icon: Shield,
              title: 'Verifier Portal',
              desc: 'Verify certificate authenticity',
              color: 'bg-purple-500',
              features: ['Verify Certificates', 'Blockchain Check', 'Audit Trail']
            }
          ].map(({ type, icon: Icon, title, desc, color, features }) => (
            <button
              key={type}
              onClick={() => setLoginType(type)}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                loginType === type 
                  ? 'border-blue-500 bg-blue-50 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-4">{desc}</p>
              <ul className="space-y-1">
                {features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {loginType === type && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {loginType && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 capitalize">Login as {loginType}</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg"
              >
                Login & Connect Wallet
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};