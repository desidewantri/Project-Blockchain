import React, { useState, useEffect } from 'react';

export const OracleStatus: React.FC = () => {
  const [oracleData, setOracleData] = useState({
    status: 'active',
    lastUpdate: new Date().toISOString(),
    dataFeeds: 5,
    uptime: 99.9,
    gasPrice: 25
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setOracleData(prev => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
        gasPrice: Math.floor(Math.random() * 50) + 20
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Chainlink Oracle Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Online</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{oracleData.uptime}%</p>
          <p className="text-sm text-gray-600">Uptime</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{oracleData.dataFeeds}</p>
          <p className="text-sm text-gray-600">Data Feeds</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{oracleData.gasPrice}</p>
          <p className="text-sm text-gray-600">Gas (Gwei)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-orange-600">
            {new Date(oracleData.lastUpdate).toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-600">Last Update</p>
        </div>
      </div>
    </div>
  );
};