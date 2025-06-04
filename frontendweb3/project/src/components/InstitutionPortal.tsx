import React, { useState } from 'react';
import { Home, Upload, FileText, BarChart3, Settings, User, CheckCircle, Eye, Download, Shield } from 'lucide-react';
import { Header } from './Header';
import { SystemArchitecture } from './SystemArchitecture';
import { WorkflowProcess } from './WorkflowProcess';
import { OracleStatus } from './OracleStatus';
import { mockData } from '../data/mockData';

export const InstitutionPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [certificates, setCertificates] = useState(mockData.certificates);
  const [issueForm, setIssueForm] = useState({
    studentName: '',
    nim: '',
    program: '',
    gpa: '',
    graduationDate: ''
  });
  const [isIssuing, setIsIssuing] = useState(false);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIssuing(true);
    
    // Simulate blockchain transaction process
    setTimeout(() => {
      const newCertificate = {
        ...issueForm,
        id: certificates.length + 1,
        institution: "Universitas Gadjah Mada",
        nftId: `0x${Math.random().toString(16).substr(2, 12)}`,
        verified: false,
        ipfsHash: `Qm${Math.random().toString(36).substr(2, 10)}`,
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 12000000,
        timestamp: new Date().toISOString(),
        oracleVerified: false
      };
      
      setCertificates([...certificates, newCertificate]);
      setIssueForm({ studentName: '', nim: '', program: '', gpa: '', graduationDate: '' });
      setIsIssuing(false);
      
      // Simulate oracle verification after 5 seconds
      setTimeout(() => {
        setCertificates(prev => prev.map(cert => 
          cert.id === newCertificate.id 
            ? { ...cert, verified: true, oracleVerified: true }
            : cert
        ));
      }, 5000);
      
    }, 3000);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {certificates.filter(c => c.verified).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {certificates.filter(c => !c.verified).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SystemArchitecture />
      <WorkflowProcess />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OracleStatus />
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Certificates</h3>
          <div className="space-y-3">
            {certificates.slice(0, 3).map((cert) => (
              <div key={cert.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${cert.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div className="flex-1">
                  <p className="font-medium">{cert.studentName}</p>
                  <p className="text-sm text-gray-600">{cert.program}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono">{cert.nftId.slice(0, 6)}...{cert.nftId.slice(-4)}</p>
                  <p className="text-xs text-gray-500">{new Date(cert.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderIssueForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Issue New Certificate</h2>
      
      <form onSubmit={handleIssue} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              value={issueForm.studentName}
              onChange={(e) => setIssueForm({...issueForm, studentName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID (NIM)</label>
            <input
              type="text"
              value={issueForm.nim}
              onChange={(e) => setIssueForm({...issueForm, nim: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Study Program</label>
            <input
              type="text"
              value={issueForm.program}
              onChange={(e) => setIssueForm({...issueForm, program: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={issueForm.gpa}
              onChange={(e) => setIssueForm({...issueForm, gpa: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
            <input
              type="date"
              value={issueForm.graduationDate}
              onChange={(e) => setIssueForm({...issueForm, graduationDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isIssuing}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
              isIssuing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isIssuing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing on Blockchain...
              </span>
            ) : (
              'Issue Digital Certificate'
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const renderCertificates = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Certificate Management</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFT ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((cert) => (
                <tr key={cert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{cert.studentName}</div>
                        <div className="text-sm text-gray-500">{cert.nim}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cert.program}</div>
                    <div className="text-sm text-gray-500">{cert.institution}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      parseFloat(cert.gpa) >= 3.5 ? 'bg-green-100 text-green-800' : 
                      parseFloat(cert.gpa) >= 2.5 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.gpa}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      cert.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cert.verified ? 'Verified' : 'Pending'}
                    </span>
                    {cert.oracleVerified && (
                      <div className="flex items-center mt-1">
                        <Shield className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">Oracle Verified</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {cert.nftId.slice(0, 6)}...{cert.nftId.slice(-4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-8">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('issue')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'issue' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Issue Certificate</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'certificates' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Certificates</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
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
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'issue' && renderIssueForm()}
            {activeTab === 'certificates' && renderCertificates()}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Analytics charts will be displayed here</p>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Institution Settings</h2>
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