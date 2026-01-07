import React from 'react';
import { ConnectionStatus } from '../types';
import { CreditCard, HardDrive } from 'lucide-react';

interface HeaderProps {
  status: ConnectionStatus;
  devicePath: string;
}

const Header: React.FC<HeaderProps> = ({ status, devicePath }) => {
  return (
    <header className="bg-white border-b border-gray-300 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className="bg-slate-700 p-2 rounded text-white">
          <CreditCard size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">Elpusk Card Reader Web Tools 1.0</h1>
          <p className="text-xs text-slate-500 font-medium">For LPU237, LPU-207 and LPU208</p>
        </div>
      </div>
      
      <div className="mt-3 md:mt-0 flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
        <HardDrive size={16} className={status === ConnectionStatus.CONNECTED ? "text-green-600" : "text-gray-400"} />
        <span className="font-semibold text-gray-600">Status :</span>
        <span className={`font-bold ${status === ConnectionStatus.CONNECTED ? 'text-green-600' : 'text-red-500'}`}>
          {status}
        </span>
        {devicePath && (
          <>
            <span className="text-gray-400 mx-1">:</span>
            <span className="text-gray-500 font-mono text-xs truncate max-w-[200px]" title={devicePath}>
              {devicePath}
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;