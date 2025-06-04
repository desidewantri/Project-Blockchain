import React, { useState } from 'react';

export const SystemArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState('');

  const layers = [
    {
      id: 'offchain',
      title: 'Off-Chain World',
      color: 'bg-blue-500',
      components: [
        { name: 'Institusi Pendidikan', desc: 'Database internal menyimpan data akademik mahasiswa dan alumni' },
        { name: 'REST API', desc: 'Backend ExpressJS menyediakan endpoint untuk komunikasi sistem' },
        { name: 'User Interface', desc: 'Portal React untuk mahasiswa, institusi, dan verifikator (HRD)' }
      ]
    },
    {
      id: 'oracle',
      title: 'Oracle Bridge',
      color: 'bg-red-500',
      components: [
        { name: 'Chainlink Oracle', desc: 'Memverifikasi dan menjembatani data dari off-chain ke blockchain' },
        { name: 'Data Validator', desc: 'Memastikan integritas dan keaslian data sebelum masuk blockchain' },
        { name: 'Event Listener', desc: 'Memantau aktivitas smart contract dan memicu respons otomatis' }
      ]
    },
    {
      id: 'onchain',
      title: 'On-Chain World',
      color: 'bg-green-500',
      components: [
        { name: 'Smart Contract Ijazah', desc: 'Mengelola logika penerbitan dan verifikasi ijazah digital (NFT)' },
        { name: 'Smart Contract Otoritas', desc: 'Mengatur hak akses institusi untuk menerbitkan ijazah' },
        { name: 'Public Ledger', desc: 'Ethereum Testnet (Goerli) menyimpan seluruh transaksi secara permanen' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Arsitektur Sistem</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {layers.map((layer) => (
          <div 
            key={layer.id}
            className={`${layer.color} text-white rounded-lg p-6 cursor-pointer transition-all hover:scale-105 ${
              activeLayer === layer.id ? 'ring-4 ring-blue-300' : ''
            }`}
            onClick={() => setActiveLayer(activeLayer === layer.id ? '' : layer.id)}
          >
            <h3 className="text-xl font-bold mb-4">{layer.title}</h3>
            <div className="space-y-3">
              {layer.components.map((component, idx) => (
                <div key={idx} className="bg-white/20 rounded p-3">
                  <h4 className="font-semibold mb-1">{component.name}</h4>
                  <p className="text-sm opacity-90">{component.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {activeLayer && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            Detail: {layers.find(l => l.id === activeLayer)?.title}
          </h4>
          <p className="text-blue-800 text-sm">
            Layer ini bertanggung jawab untuk mengelola integrasi antara sistem tradisional dan blockchain,
            memastikan data terverifikasi dengan aman sebelum disimpan secara permanen.
          </p>
        </div>
      )}
    </div>
  );
};