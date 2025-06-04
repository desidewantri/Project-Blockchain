import React, { useState, useEffect } from 'react';
import { Database, Server, Shield, Activity, Award, Hash, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export const WorkflowProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Input Data Ijazah',
      desc: 'Institusi pendidikan memasukkan data ijazah mahasiswa ke dalam sistem database internal',
      icon: Database,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'API Request',
      desc: 'Data diakses melalui REST API dan diteruskan ke antarmuka pengguna',
      icon: Server,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Oracle Verification',
      desc: 'Chainlink Oracle memverifikasi keaslian data dan memberikan timestamp',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Smart Contract Trigger',
      desc: 'Oracle memicu smart contract di Ethereum untuk menerbitkan ijazah digital',
      icon: Activity,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'NFT Generation',
      desc: 'Smart contract membuat NFT ijazah dengan metadata terenkripsi',
      icon: Award,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'Blockchain Storage',
      desc: 'Ijazah digital tersimpan permanen di blockchain untuk verifikasi masa depan',
      icon: Hash,
      color: 'bg-indigo-500'
    },
    {
      id: 7,
      title: 'Real-time Verification',
      desc: 'Pihak ketiga dapat memverifikasi ijazah secara otomatis dan transparan',
      icon: CheckCircle,
      color: 'bg-teal-500'
    },
    {
      id: 8,
      title: 'Audit Trail',
      desc: 'Seluruh aktivitas tercatat dalam public ledger untuk audit dan transparansi',
      icon: FileText,
      color: 'bg-red-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Alur Kerja Sistem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          
          return (
            <div
              key={step.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-500 ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 ${
                  isActive ? 'animate-pulse' : ''
                }`}>
                  <span className="text-white font-bold text-lg">{step.id}</span>
                </div>
                <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 opacity-80`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-tight">{step.desc}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              )}

              {isActive && (
                <div className="absolute -top-1 -left-1 w-full h-full border-2 border-blue-300 rounded-lg animate-ping opacity-75"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};