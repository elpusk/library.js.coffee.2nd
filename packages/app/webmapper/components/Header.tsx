
import React from 'react';
import { ConnectionStatus } from '../types';
import { CreditCard, HardDrive, Server, Globe } from 'lucide-react';

interface HeaderProps {
  status: ConnectionStatus;
  serverStatus: ConnectionStatus;
  devicePath: string;
  deviceUid: string; // Added prop
  onToggleServer: () => void;
}

const Header: React.FC<HeaderProps> = ({ status, serverStatus, deviceUid, onToggleServer }) => {
  const isServerConnected = serverStatus === ConnectionStatus.CONNECTED;
  const isDeviceConnected = status === ConnectionStatus.CONNECTED;

  return (
    <header className="bg-white border-b border-gray-300 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className="bg-slate-700 p-2 rounded text-white">
          <CreditCard size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">Elpusk Card Reader Web Mapper 0.8</h1>
          <p className="text-xs text-slate-500 font-medium">For LPU237, LPU-207 and LPU208</p>
        </div>
      </div>
      
      <div className="mt-3 md:mt-0 flex flex-wrap items-center gap-4">
        {/* Device Status Section */}
        <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
          <HardDrive size={16} className={isDeviceConnected ? "text-green-600" : "text-gray-400"} />
          <span className="font-semibold text-gray-600">Device :</span>
          <span className={`font-bold ${isDeviceConnected ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </span>
          {isDeviceConnected && deviceUid && (
            <>
              <span className="text-gray-400 mx-1">:</span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">UID</span>
              <span className="text-gray-600 font-mono text-xs font-bold" title={`Device UID: ${deviceUid}`}>
                {deviceUid}
              </span>
            </>
          )}
        </div>

        {/* Global Server Connection Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
            <Server size={16} className={isServerConnected ? "text-blue-600" : "text-gray-400"} />
            <span className="font-semibold text-gray-600">Server :</span>
            <span className={`font-bold ${isServerConnected ? 'text-blue-600' : 'text-red-500'}`}>
              {serverStatus}
            </span>
          </div>
          
          <button
            onClick={onToggleServer}
            title={isServerConnected ? 'Disconnect from central server' : 'Connect to central server'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-xs font-bold transition-all shadow-sm active:translate-y-[1px] ${
              isServerConnected 
                ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100' 
                : 'bg-slate-700 text-white hover:bg-slate-800 border border-slate-700'
            }`}
          >
            <Globe size={14} className={isServerConnected ? 'animate-pulse' : ''} />
            {isServerConnected ? 'Close Server Link' : 'Establish Server Link'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
