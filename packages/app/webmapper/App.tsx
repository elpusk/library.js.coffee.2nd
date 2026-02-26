import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ConnectionStatus, DeviceType, AppState, KeyMapEntry, DEFAULT_CONFIG, APP_VERSION } from './types';
import { createHandlers } from './handlers';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DeviceTab from './components/DeviceTab';
import CommonTab from './components/CommonTab';
import KeyMapTab from './components/KeyMapTab';
import LoadingOverlay from './components/LoadingOverlay';
import { CheckCircle2, AlertCircle, Info, X, Download, FileJson, Cpu, AlertTriangle, ShieldCheck, WrenchIcon } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ConnectionStatus.DISCONNECTED,
    serverStatus: ConnectionStatus.DISCONNECTED,
    devicePath: '',
    deviceUid: '', // Initialize deviceUid
    deviceName: '', // Initialize deviceName
    deviceFirmware: '', // Initialize deviceFirmware
    deviceType: DeviceType.MSR_IBUTTON,
    devicePaths: [], // Initially empty
    activeTab: 'device',
    logs: [`Welcome to Web Mapper ${APP_VERSION}`],
    config: { ...DEFAULT_CONFIG },
    keyMaps: {}, // Centralized keyMaps within state
    loading: null, // Initialize loading as null
    notification: null,
    isDownloadModalOpen: false,
    exportFileName: 'lpu237_settings.xml',    
    
    // Firmware Update related state
    isFirmwareModalOpen: false,
    romItems: [],
    compatibleItemIndex: -1,
    selectedRomItemIndex: -1,
    pendingFirmwareFile: null,

    // HID Bootloader Recovery state
    isRecoveryConfirmOpen: false,
    isRecoveryMode: false,
    recoveryDevicePath: '',
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Track the string currently selected in the dropdown
  const [selectedPath, setSelectedPath] = useState<string>('');

  // Helper to add logs to state
  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, message]
    }));
  };

  // Notification cleanup timer
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, notification: null }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // Sync selectedPath when devicePaths is first populated
  useEffect(() => {
    if (state.devicePaths.length > 0 && !selectedPath) {
      setSelectedPath(state.devicePaths[0]);
    }
  }, [state.devicePaths]);

  // Initialize the central handlers
  // Note: handlers are memoized but reconstructed when state changes to ensure fresh closures
  const handlers = useMemo(() => createHandlers(stateRef,setState, addLog), []);

  // Requirement: Call the initialization function on startup and cleanup on termination
  useEffect(() => {
    handlers.initializeSystem();
    return () => {
      handlers.uninitializeSystem();
    };
  }, []);

  // Requirement: If the server connection is lost while the device is already connected, 
  // automatically disconnect the device connection as well.
  useEffect(() => {
    if (state.serverStatus === ConnectionStatus.DISCONNECTED && state.status === ConnectionStatus.CONNECTED) {
      addLog('Server link lost: Automatically disconnecting device...');
      handlers.onDisconnect();
    }
    if (state.serverStatus === ConnectionStatus.DISCONNECTED) {
      setSelectedPath('');
    }    
  }, [state.serverStatus, state.status]);

  const handleKeyMapChange = (tabId: string, newKeys: KeyMapEntry[]) => {
    setState(prev => ({
      ...prev,
      keyMaps: {
        ...prev.keyMaps,
        [tabId]: newKeys
      }
    }));
    addLog(`Key map updated for ${tabId.replace(/-/g, ' ')} (${newKeys.length} keys)`);
  };

  const openDownloadModal = () => {
    setState(prev => ({ ...prev, isDownloadModalOpen: true }));
  };

  const closeDownloadModal = () => {
    setState(prev => ({ ...prev, isDownloadModalOpen: false }));
  };

  const executeDownload = () => {
    handlers.onDownloadSettings();
    closeDownloadModal();
  };

  const handleFirmwareConfirm = () => {
    const isRom = state.romItems.length > 0;

    if (state.isRecoveryMode) {
      // 복구 모드: 호환성 체크 없이 바로 복구 실행
      if (!isRom) {
        if (!window.confirm("This file is not a standard ROM format. Proceed with raw binary recovery anyway?")) return;
      }
      handlers.onStartRecovery(isRom ? state.selectedRomItemIndex : undefined);
      return;
    }

    // 일반 fw 업데이트 모드
    const isCompatible = !isRom || state.selectedRomItemIndex === state.compatibleItemIndex;
    if (!isCompatible) {
      if (!window.confirm("The selected firmware is not compatible with this device. Do you really want to proceed?")) return;
    } else if (!isRom) {
      if (!window.confirm("This file is not a standard ROM format. Proceeed with incompatible firmware update anyway?")) return;
    }
    handlers.onFirmwareSelected(isRom ? state.selectedRomItemIndex : undefined);
  };

  const renderContent = () => {
    if (state.activeTab === 'device') {
      return (
        <DeviceTab 
          status={state.status}
          serverStatus={state.serverStatus}
          deviceType={state.deviceType}
          devicePaths={state.devicePaths} // Pass the list to the dropdown
          selectedPath={selectedPath}
          setSelectedPath={setSelectedPath}          
          onConnect={() => handlers.onConnect(selectedPath)} // Pass selected string path
          onDisconnect={handlers.onDisconnect}
          logs={state.logs}
          onClearLogs={handlers.onClearLogs}
          setDeviceType={(type) => setState(prev => ({ ...prev, deviceType: type }))}
          onApply={handlers.onApply}
          onLoadSettings={handlers.onLoadSettings}
          onLoadFirmware={handlers.onLoadFirmware}
          onDownloadSettings={openDownloadModal} // Change to open modal
          deviceName={state.deviceName} // Pass dynamic device name
          deviceUid={state.deviceUid} // Pass dynamic UID
          deviceFirmware={state.deviceFirmware} // Pass firmware version
          interfaceMode={state.config.interface} // Pass dynamic interface          
        />
      );
    }

    if (state.status === ConnectionStatus.DISCONNECTED) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg max-w-sm">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Device Not Connected</h3>
            <p className="text-sm">Please go to the <strong>Device</strong> tab and connect your reader to start configuration.</p>
          </div>
        </div>
      );
    }

    if (state.activeTab === 'common') {
      return (
        <CommonTab 
          deviceType={state.deviceType} 
          config={state.config} 
          handlers={handlers.config}
          onApply={handlers.onApply}
        />
      );
    }

    const isKeyMapTab = state.activeTab.includes('prefix') || 
                        state.activeTab.includes('suffix') || 
                        state.activeTab === 'ibutton-remove-key';

    if (isKeyMapTab) {
      const maxKeys = state.activeTab === 'ibutton-remove-key' ? 20 : 7;
      const currentKeys = state.keyMaps[state.activeTab] || [];

      return (
        <KeyMapTab 
          title={state.activeTab} 
          maxKeys={maxKeys} 
          keys={currentKeys}
          onKeysChange={(keys) => handleKeyMapChange(state.activeTab, keys)}
          onApply={handlers.onApply}
          language={state.config.language}
        />
      );
    }

    return <div className="p-4">Select a tab from the sidebar to begin.</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      {state.loading && <LoadingOverlay loading={state.loading} />}
      
      {/* HID Bootloader Recovery Confirm Modal */}
      {state.isRecoveryConfirmOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-200 flex items-center gap-2">
              <WrenchIcon size={20} className="text-amber-600" />
              <h3 className="font-bold text-amber-800 text-lg">HID Bootloader Recovery</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-bold text-amber-900">Device stuck in bootloader mode detected.</p>
                  <p className="text-xs text-amber-700 mt-1 font-mono break-all">{state.recoveryDevicePath}</p>
                  <p className="text-xs text-amber-700 mt-2">Would you like to recover this device now?</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Select Recovery Firmware (.rom / .bin)</label>
                <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors group">
                  <Cpu size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-slate-600 group-hover:text-amber-700">Choose .rom or .bin file</p>
                    <p className="text-xs text-slate-400">Upload firmware to recover the device</p>
                  </div>
                  <input
                    type="file"
                    accept=".rom,.bin"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlers.onLoadRecoveryFirmware(file);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-100">
              <button
                onClick={handlers.onCancelRecovery}
                className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Skip Recovery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Firmware Selection Modal */}
      {state.isFirmwareModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                {state.isRecoveryMode
                  ? <><WrenchIcon size={20} className="text-amber-600" /><span>Firmware Selection <span className="text-amber-600">— Recovery Mode</span></span></>
                  : <><Cpu size={20} className="text-blue-600" />Firmware Selection</>}
              </h3>
              <button onClick={handlers.onCancelFirmwareModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {state.romItems.length > 0 ? (
                <>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                    {state.compatibleItemIndex >= 0 ? (
                      <>
                        <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-bold text-blue-900">Compatible firmware found.</p>
                          <p className="text-xs text-blue-700 font-medium">We've identified the best match for your {state.deviceName}.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-bold text-amber-900">No direct compatibility match found.</p>
                          <p className="text-xs text-amber-700 font-medium">Please select a firmware manually and proceed with caution.</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Available Firmware Items</label>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0">
                            <tr>
                              <th className="px-4 py-2.5 w-12 text-center">Sel</th>
                              <th className="px-4 py-2.5">Model Name</th>
                              <th className="px-4 py-2.5 w-24">Version</th>
                              <th className="px-4 py-2.5 w-24 text-right">Condition</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {state.romItems.map((item) => (
                              <tr 
                                key={item.index} 
                                className={`cursor-pointer transition-colors ${state.selectedRomItemIndex === item.index ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                                onClick={() => setState(prev => ({ ...prev, selectedRomItemIndex: item.index }))}
                              >
                                <td className="px-4 py-3 text-center">
                                  <input 
                                    type="radio" 
                                    name="rom_item" 
                                    checked={state.selectedRomItemIndex === item.index}
                                    onChange={() => setState(prev => ({ ...prev, selectedRomItemIndex: item.index }))}
                                    className="w-4 h-4 text-blue-600"
                                  />
                                </td>
                                <td className="px-4 py-3 font-bold text-slate-700">
                                  {item.model}
                                  {item.index === state.compatibleItemIndex && (
                                    <span className="ml-2 text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black uppercase">Compatible</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.version}</td>
                                <td className="px-4 py-3 text-right font-mono text-xs text-slate-400">0x{item.condition.toString(16).toUpperCase()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center py-8 text-center space-y-4">
                  <div className="bg-amber-50 p-4 rounded-full">
                    <AlertTriangle size={48} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Non-Standard Firmware File</h4>
                    <p className="text-sm text-slate-500 max-w-xs mt-1">
                      This file does not contain a standard ROM header. 
                      Proceeding will flash the raw binary to your device.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={handlers.onCancelFirmwareModal}
                className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleFirmwareConfirm}
                className="px-8 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
              >
                <Download size={16} />
                Update Firmware
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filename Input Modal (Replaces window.prompt) */}
      {state.isDownloadModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <Download size={18} className="text-blue-600" />
                Save Configuration
              </h3>
              <button onClick={closeDownloadModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filename</label>
                <div className="relative">
                  <FileJson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                    placeholder="settings.xml"
                    value={state.exportFileName}
                    onChange={(e) => setState(prev => ({ ...prev, exportFileName: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && executeDownload()}
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic">Example: my_lpu237_config.xml</p>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={closeDownloadModal}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDownload}
                className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {state.notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-lg shadow-xl border ${
            state.notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            state.notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {state.notification.type === 'success' && <CheckCircle2 size={18} className="text-green-600" />}
            {state.notification.type === 'error' && <AlertCircle size={18} className="text-red-600" />}
            {state.notification.type === 'info' && <Info size={18} className="text-blue-600" />}
            <span className="text-sm font-bold">{state.notification.message}</span>
            <button 
              onClick={() => setState(prev => ({ ...prev, notification: null }))}
              className="ml-2 p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <Header 
        status={state.status} 
        serverStatus={state.serverStatus}
        devicePath={state.devicePath} 
        deviceUid={state.deviceUid} // Pass deviceUid to Header
        onToggleServer={() => {
          if (state.serverStatus === ConnectionStatus.CONNECTED) {
            handlers.onDisconnectServer();
          } else {
            handlers.onConnectServer("wss://localhost:443");
          }
        }}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={state.activeTab} 
          onTabChange={(tab) => setState(prev => ({ ...prev, activeTab: tab }))}
          deviceType={state.deviceType}
          isConnected={state.status === ConnectionStatus.CONNECTED}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}          
        />
        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 transition-all duration-300">
          <div className="bg-white border border-gray-300 shadow-sm min-h-[600px] h-full rounded flex flex-col">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
