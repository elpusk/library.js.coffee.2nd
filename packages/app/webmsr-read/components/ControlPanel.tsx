import React from 'react';
import { ConnectionStatus } from '../types';
import { Plug, PlugZap, CreditCard, StopCircle } from 'lucide-react';

interface ControlPanelProps {
  serverStatus: ConnectionStatus;
  deviceStatus: ConnectionStatus;
  devicePaths: string[];
  selectedPath: string;
  setSelectedPath: (p: string) => void;
  isReading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onStartReading: () => void;
  onStopReading: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  serverStatus,
  deviceStatus,
  devicePaths,
  selectedPath,
  setSelectedPath,
  isReading,
  onConnect,
  onDisconnect,
  onStartReading,
  onStopReading,
}) => {
  const isServerConnected = serverStatus === ConnectionStatus.CONNECTED;
  const isDeviceConnected = deviceStatus === ConnectionStatus.CONNECTED;
  const isDeviceConnecting = deviceStatus === ConnectionStatus.CONNECTING;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4">
      <h2 className="text-sm font-bold text-slate-700 border-b pb-2">Device Control</h2>

      {/* Device path selector */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">MSR Device Path</label>
        <select
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none disabled:opacity-50"
          value={selectedPath}
          onChange={e => setSelectedPath(e.target.value)}
          disabled={!isServerConnected || isDeviceConnected}
        >
          {devicePaths.length === 0 ? (
            <option value="">-- No MSR device found --</option>
          ) : (
            devicePaths.map(p => (
              <option key={p} value={p}>{p}</option>
            ))
          )}
        </select>
      </div>

      {/* Connect / Disconnect */}
      <div className="flex gap-2">
        <button
          onClick={onConnect}
          disabled={!isServerConnected || isDeviceConnected || isDeviceConnecting || !selectedPath}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <Plug size={14} />
          Connect
        </button>
        <button
          onClick={onDisconnect}
          disabled={!isDeviceConnected}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <PlugZap size={14} />
          Disconnect
        </button>
      </div>

      {/* Start / Stop reading */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={onStartReading}
          disabled={!isDeviceConnected || isReading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <CreditCard size={14} />
          {isReading ? 'Waiting for card...' : 'Start Reading'}
        </button>
        <button
          onClick={onStopReading}
          disabled={!isDeviceConnected || !isReading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <StopCircle size={14} />
          Stop
        </button>
      </div>

      {/* Reading status indicator */}
      {isReading && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-xs font-semibold animate-pulse">
          <CreditCard size={14} />
          Waiting for magnetic card swipe...
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
