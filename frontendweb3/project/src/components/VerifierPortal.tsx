import React, { useState } from 'react';
import { Shield, CheckCircle, FileText, Settings, QrCode, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import { mockData } from '../data/mockData';

export const VerifierPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('verify');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verificationInput, setVerificationInput] = useState('');

  const handleVerify = () => {
    // Mock verification
    setTimeout(() => {
      setVerificationResult({
        valid: true,
        certificate: mockData.certificates[0],
        message: "Certificate is valid and verified on blockchain"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold">HR Department</h3>
                  <p className="text-xs text-gray-500">Verifier</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'verify' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Verify Certificate</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Verification History</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'verify' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Verify Certificate</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Certificate ID, NFT Address, or Scan QR Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="0x1a2b3c... or 12345"
                        value={verificationInput}
                        onChange={(e) => setVerificationInput(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="bg-blue-100 text-blue-600 p-3 rounded-lg hover:bg-blue-200 transition-colors">
                        <QrCode className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleVerify}
                    disabled={!verificationInput}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                      !verificationInput 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    Verify on Blockchain
                  </button>
                  
                  {verificationResult && (
                    <div className={`p-4 rounded-lg ${
                      verificationResult.valid 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 h-5 w-5 ${
                          verificationResult.valid ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {verificationResult.valid ? (
                            <CheckCircle className="h-full w-full" />
                          ) : (
                            <AlertCircle className="h-full w-full" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${
                            verificationResult.valid ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {verificationResult.message}
                          </h3>
                          {verificationResult.valid && verificationResult.certificate && (
                            <div className="mt-2 text-sm text-green-700">
                              <p>Student: {verificationResult.certificate.studentName}</p>
                              <p>Institution: {verificationResult.certificate.institution}</p>
                              <p>Program: {verificationResult.certificate.program}</p>
                              <p className="mt-2 font-mono text-xs">
                                TX Hash: {verificationResult.certificate.transactionHash.slice(0, 12)}...
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Verification History</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Verification history will be displayed here</p>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Verifier Settings</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Settings form will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};