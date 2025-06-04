import React, { useState } from 'react';
import { User, Link, CheckCircle, Download, QrCode, Search, Award } from 'lucide-react';
import { Header } from './Header';
import { mockData } from '../data/mockData';

export const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-certificates');
  const { certificates } = mockData;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.nim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Desi D Simamora</h3>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('my-certificates')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'my-certificates' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Award className="h-5 w-5" />
                  <span>My Certificates</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('share')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'share' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Link className="h-5 w-5" />
                  <span>Share Certificates</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'verify' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Verify Certificate</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'my-certificates' && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-2xl font-bold">My Certificates</h2>
                    <div className="mt-4 md:mt-0 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search certificates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredCertificates.map((cert) => (
                      <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{cert.program}</h3>
                            <p className="text-gray-600">{cert.institution}</p>
                            <div className="flex items-center mt-2 space-x-2">
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                GPA: {cert.gpa}
                              </span>
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                Graduated: {new Date(cert.graduationDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex space-x-2">
                            <button className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                            <button className="flex items-center space-x-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg">
                              <QrCode className="h-4 w-4" />
                              <span>QR Code</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              cert.verified ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-xs text-gray-500">
                              {cert.verified ? 'Verified on blockchain' : 'Pending verification'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            NFT ID: {cert.nftId.slice(0, 6)}...{cert.nftId.slice(-4)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'share' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Share Certificate</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Share functionality will be displayed here</p>
                </div>
              </div>
            )}
            
            {activeTab === 'verify' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Verify Certificate</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Verification functionality will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};