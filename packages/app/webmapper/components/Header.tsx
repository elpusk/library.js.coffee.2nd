
import React from 'react';
import { ConnectionStatus, APP_VERSION } from '../types';
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
    <header className="bg-white border-b border-gray-300 px-4 py-2 flex flex-row items-center justify-between shadow-sm z-10 gap-3 flex-wrap shrink-0">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-slate-700 p-1.5 rounded text-white">
          <CreditCard size={18} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 leading-tight whitespace-nowrap">
            Elpusk Card Reader Web Mapper <span className="text-slate-500 font-medium">{APP_VERSION}</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium leading-tight">LPU237 / LPU-207 / LPU208</p>
        </div>
      </div>

      {/* Status & Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Device Status */}
        <div className="flex items-center gap-1.5 text-xs bg-gray-100 px-2.5 py-1 rounded border border-gray-200 whitespace-nowrap">
          <HardDrive size={13} className={isDeviceConnected ? "text-green-600" : "text-gray-400"} />
          <span className="font-semibold text-gray-500">Device:</span>
          <span className={`font-bold ${isDeviceConnected ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </span>
          {isDeviceConnected && deviceUid && (
            <>
              <span className="text-gray-300 mx-0.5">|</span>
              <span className="text-gray-400 text-[9px] font-bold uppercase">UID</span>
              <span className="text-gray-600 font-mono text-[10px] font-bold" title={`Device UID: ${deviceUid}`}>
                {deviceUid}
              </span>
            </>
          )}
        </div>

        {/* Server Status */}
        <div className="flex items-center gap-1.5 text-xs bg-gray-100 px-2.5 py-1 rounded border border-gray-200 whitespace-nowrap">
          <Server size={13} className={isServerConnected ? "text-blue-600" : "text-gray-400"} />
          <span className="font-semibold text-gray-500">Server:</span>
          <span className={`font-bold ${isServerConnected ? 'text-blue-600' : 'text-red-500'}`}>
            {serverStatus}
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggleServer}
          title={isServerConnected ? 'Disconnect from central server' : 'Connect to central server'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all shadow-sm active:translate-y-[1px] whitespace-nowrap ${
            isServerConnected
              ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
              : 'bg-slate-700 text-white hover:bg-slate-800 border border-slate-700'
          }`}
        >
          <Globe size={12} className={isServerConnected ? 'animate-pulse' : ''} />
          {isServerConnected ? 'Close Server Link' : 'Establish Server Link'}
        </button>
      </div>
    </header>
  );
};

export default Header;
