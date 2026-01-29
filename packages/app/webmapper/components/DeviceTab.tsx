import React, { useRef, useState } from 'react';
import { ConnectionStatus, DeviceType } from '../types';
import { Upload, RefreshCw, Power, Save, Download, Trash2, ShieldAlert } from 'lucide-react';

interface DeviceTabProps {
  status: ConnectionStatus;
  serverStatus: ConnectionStatus;
  deviceType: DeviceType;
  devicePaths: string[]; // Added prop
  selectedPath: string; // Added prop
  setSelectedPath: (path: string) => void; // Added prop
  onConnect: () => void; // Changed signature
  onDisconnect: () => void;
  logs: string[];
  onClearLogs: () => void;
  setDeviceType: (type: DeviceType) => void;
  onApply: () => void;
  onLoadSettings: (file: File) => void; // Changed from string to File
  onLoadFirmware: (fileName: string) => void;
  onDownloadSettings: () => void;
  deviceName?: string; // New prop for model name
  deviceUid?: string; // New prop for serial/UID
  deviceFirmware?: string; // New prop for firmware version
  interfaceMode?: string; // New prop for interface mode  
}

const DeviceTab: React.FC<DeviceTabProps> = ({ 
  status, 
  serverStatus,
  devicePaths,
  selectedPath,
  setSelectedPath,
  onConnect, 
  onDisconnect, 
  logs,
  onClearLogs,
  onApply,
  onLoadSettings,
  onLoadFirmware,
  onDownloadSettings,
  deviceName,
  deviceUid,
  deviceFirmware,
  interfaceMode  
}) => {
  const isConnected = status === ConnectionStatus.CONNECTED;
  const isServerConnected = serverStatus === ConnectionStatus.CONNECTED;
  
  const [configFileName, setConfigFileName] = useState<string>('No setting file loaded...');
  const [firmwareFileName, setFirmwareFileName] = useState<string>('Select firmware (.rom)...');

  const configFileInputRef = useRef<HTMLInputElement>(null);
  const firmwareFileInputRef = useRef<HTMLInputElement>(null);

  const handleConfigFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setConfigFileName(file.name);
      onLoadSettings(file); // Pass the File object
    }
  };

  const handleFirmwareFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.files[0].name;
      setFirmwareFileName(name);
      onLoadFirmware(name);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-300 px-6 py-3">
        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          <Power size={20} className="text-gray-500" />
          Device Connection
        </h2>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 flex justify-between items-center">
              Connection Settings
              {!isServerConnected && (
                <span className="flex items-center gap-1 text-[10px] text-amber-600 normal-case font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                  <ShieldAlert size={10} /> Requires Server Link
                </span>
              )}
            </h3>
            
            {!isConnected && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Connected device</label>
                <select 
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border transition-opacity ${!isServerConnected ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                  disabled={!isServerConnected}
                >
                  {!isServerConnected || devicePaths.length === 0 ? (
                    <option value=""></option>
                  ) : (
                    <>
                      {devicePaths.map((path, idx) => (
                        <option key={idx} value={path}>{path}</option>
                      ))}
                    </>
                  )}
                </select>              </div>
            )}

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
              <input 
                type="text" 
                value={isConnected ? selectedPath : ""}
                placeholder={isServerConnected ? "Device Path (auto-detected)" : "Waiting for Server Connection..."}
                disabled 
                className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                disabled={!isServerConnected && !isConnected}
                onClick={() => !isConnected ? onConnect() : onDisconnect()}
                className={`flex-1 py-2.5 px-4 rounded font-semibold text-sm shadow-sm transition-all flex justify-center items-center gap-2 ${
                  isConnected 
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                    : isServerConnected 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md' 
                      : 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                }`}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          <div className={`bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-3 ${(!isConnected || !isServerConnected) ? 'opacity-60 pointer-events-none' : ''}`}>
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Configuration File</h3>
             <div className="flex gap-2">
                <input type="file" ref={configFileInputRef} className="hidden" accept=".json,.xml,.txt" onChange={handleConfigFileChange} />
                <button 
                  onClick={() => configFileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Upload size={16} /> Load File
                </button>
                <div className={`flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm truncate ${configFileName.startsWith('No setting') ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                  {configFileName}
                </div>
             </div>
             
             <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
               <button 
                 onClick={onDownloadSettings}
                 className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
               >
                 <Download size={14} /> Download current settings
               </button>

               {isConnected && (
                  <button 
                    onClick={onApply}
                    className="px-6 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 font-semibold text-sm flex items-center gap-2 transition-colors"
                  >
                    <Save size={16} /> Apply Settings
                  </button>
                )}
             </div>
          </div>

          <div className={`bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-3 ${(!isConnected || !isServerConnected) ? 'opacity-60 pointer-events-none' : ''}`}>
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Firmware Update</h3>
             <div className="flex gap-2">
                <input type="file" ref={firmwareFileInputRef} className="hidden" accept=".rom,.bin" onChange={handleFirmwareFileChange} />
                <button 
                  onClick={() => firmwareFileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw size={16} /> ROM File
                </button>
                <div className={`flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm truncate ${firmwareFileName.startsWith('Select firmware') ? 'text-gray-400 italic' : 'text-gray-700'}`}>
                  {firmwareFileName}
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-white border border-gray-300 rounded-lg shadow-inner flex-1 flex flex-col overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex justify-between items-center">
              <span>Device Log & Information</span>
              <button 
                onClick={onClearLogs}
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                title="Clear logs"
              >
                <Trash2 size={10} /> CLEAR
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-1">
              {logs.length === 0 && <p className="text-gray-400 italic">No activity yet...</p>}
              {[...logs].reverse().map((log, index) => (
                <div key={index} className="flex gap-2">
                   <span className="text-gray-400 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                   <span className="text-gray-700">{log}</span>
                </div>
              ))}
            </div>
            {isConnected && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="text-[10px] text-gray-500 grid grid-cols-2 gap-x-4 gap-y-1">
                    <p><strong>Model:</strong> {deviceName || 'Unknown Hardware'}</p>
                    <p><strong>Firmware:</strong> {deviceFirmware || 'Unknown'}</p>
                    <p><strong>S/N:</strong> {deviceUid || 'Unknown'}</p>
                    <p><strong>Interface:</strong> {interfaceMode || 'Unknown'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceTab;
