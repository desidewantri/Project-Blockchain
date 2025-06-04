import React, { useState } from 'react';

const IjazahWeb3App = () => {
  const [activeTab, setActiveTab] = useState('issue');
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [issueForm, setIssueForm] = useState({
    recipient: '',
    name: '',
    institution: 'Universitas Gadjah Mada',
    major: '',
    graduationYear: '',
    certificateNumber: ''
  });

  const [verifyForm, setVerifyForm] = useState({
    certificateNumber: '',
    tokenId: ''
  });

  const [verificationResult, setVerificationResult] = useState(null);
  const [userCertificates, setUserCertificates] = useState([]);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWallet('0x742d35Cc6634C0532925a3b8D454B8D9303E6C8E');
      setMessage('Wallet connected successfully!');
    } catch {
      setMessage('Failed to connect wallet');
    }
    setLoading(false);
  };

  const issueCertificate = async () => {
    if (!wallet) return setMessage('Please connect wallet first');
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newCert = {
        tokenId: Math.floor(Math.random() * 10000),
        ...issueForm,
        issuedAt: new Date().toISOString(),
        transactionHash: '0x' + Math.random().toString(16).substring(2, 66)
      };
      setUserCertificates(prev => [...prev, newCert]);
      setMessage(`Certificate issued successfully! Token ID: ${newCert.tokenId}`);
      setIssueForm({
        recipient: '',
        name: '',
        institution: 'Universitas Gadjah Mada',
        major: '',
        graduationYear: '',
        certificateNumber: ''
      });
    } catch {
      setMessage('Failed to issue certificate');
    }
    setLoading(false);
  };

  const verifyCertificate = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (verifyForm.certificateNumber === 'TI-2024-001' || verifyForm.tokenId === '1') {
        setVerificationResult({
          isValid: true,
          name: 'Desi D Simamora',
          institution: 'Universitas Gadjah Mada',
          major: 'Teknologi Informasi',
          graduationYear: '2024',
          certificateNumber: 'TI-2024-001',
          tokenId: '1',
          owner: '0x742d35Cc6634C0532925a3b8D454B8D9303E6C8E',
          issuedAt: '2024-06-01T10:30:00Z'
        });
        setMessage('Certificate verification successful!');
      } else {
        setVerificationResult({
          isValid: false,
          message: 'Certificate not found or invalid'
        });
        setMessage('Certificate not found');
      }
    } catch {
      setMessage('Verification failed');
    }
    setLoading(false);
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium rounded-lg transition-colors ${
        active ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎓 Ijazah Digital Web3</h1>
          <p className="text-gray-600">Sistem Verifikasi Ijazah Berbasis Blockchain</p>
          <div className="mt-4">
            {!wallet ? (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Connecting...' : '🔗 Connect Wallet'}
              </button>
            ) : (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
                💰 Connected: {wallet.substring(0, 6)}...{wallet.substring(38)}
              </div>
            )}
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-lg text-center">
            {message}
          </div>
        )}

        <div className="flex space-x-4 mb-6 justify-center">
          <TabButton id="issue" label="Issue Certificate" active={activeTab === 'issue'} onClick={setActiveTab} />
          <TabButton id="verify" label="Verify Certificate" active={activeTab === 'verify'} onClick={setActiveTab} />
          <TabButton id="my-certs" label="My Certificates" active={activeTab === 'my-certs'} onClick={setActiveTab} />
        </div>

        {activeTab === 'issue' && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏫 Issue New Certificate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Recipient Address" value={issueForm.recipient} onChange={e => setIssueForm({...issueForm, recipient: e.target.value})} className="border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Student Name" value={issueForm.name} onChange={e => setIssueForm({...issueForm, name: e.target.value})} className="border rounded-lg px-3 py-2" />
              <select value={issueForm.institution} onChange={e => setIssueForm({...issueForm, institution: e.target.value})} className="border rounded-lg px-3 py-2">
                <option>Universitas Gadjah Mada</option>
                <option>Institut Teknologi Bandung</option>
                <option>Universitas Indonesia</option>
              </select>
              <input type="text" placeholder="Major" value={issueForm.major} onChange={e => setIssueForm({...issueForm, major: e.target.value})} className="border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Graduation Year" value={issueForm.graduationYear} onChange={e => setIssueForm({...issueForm, graduationYear: e.target.value})} className="border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Certificate Number" value={issueForm.certificateNumber} onChange={e => setIssueForm({...issueForm, certificateNumber: e.target.value})} className="border rounded-lg px-3 py-2" />
            </div>
            <button onClick={issueCertificate} disabled={loading || !wallet} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50">
              {loading ? '⏳ Issuing...' : '📜 Issue Certificate'}
            </button>
          </div>
        )}

        {activeTab === 'verify' && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔍 Verify Certificate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Certificate Number" value={verifyForm.certificateNumber} onChange={e => setVerifyForm({...verifyForm, certificateNumber: e.target.value})} className="border rounded-lg px-3 py-2" />
              <input type="text" placeholder="Token ID (optional)" value={verifyForm.tokenId} onChange={e => setVerifyForm({...verifyForm, tokenId: e.target.value})} className="border rounded-lg px-3 py-2" />
            </div>
            <button onClick={verifyCertificate} disabled={loading} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50">
              {loading ? '⏳ Verifying...' : '✅ Verify Certificate'}
            </button>
            {verificationResult && (
              <div className={`mt-4 p-4 rounded-lg ${verificationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {verificationResult.isValid ? (
                  <div>
                    <h3 className="font-bold text-lg mb-2">✅ Certificate Valid</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>Name:</strong> {verificationResult.name}</div>
                      <div><strong>Institution:</strong> {verificationResult.institution}</div>
                      <div><strong>Major:</strong> {verificationResult.major}</div>
                      <div><strong>Year:</strong> {verificationResult.graduationYear}</div>
                      <div><strong>Certificate #:</strong> {verificationResult.certificateNumber}</div>
                      <div><strong>Token ID:</strong> {verificationResult.tokenId}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg">❌ Certificate Invalid</h3>
                    <p>{verificationResult.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-certs' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 My Certificates</h2>
            {userCertificates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No certificates found</p>
                <p className="text-sm">Try issuing a certificate first</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userCertificates.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <p className="text-gray-600">{cert.institution}</p>
                        <p className="text-sm text-gray-500">{cert.major} • {cert.graduationYear}</p>
                        <p className="text-xs text-gray-400 mt-1">Certificate #: {cert.certificateNumber} | Token ID: {cert.tokenId}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">✅ Valid</span>
                        <p className="text-xs text-gray-400 mt-1">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">🎯 Demo Instructions:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>1. Connect wallet to enable all features</li>
            <li>2. Try verifying certificate number "TI-2024-001" to see valid result</li>
            <li>3. Issue new certificates and see them in "My Certificates"</li>
            <li>4. This is a demo - actual blockchain integration via backend API</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IjazahWeb3App;
