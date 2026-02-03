import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ConnectionStatus, DeviceType, AppState, KeyMapEntry, DEFAULT_CONFIG } from './types';
import { createHandlers } from './handlers';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DeviceTab from './components/DeviceTab';
import CommonTab from './components/CommonTab';
import KeyMapTab from './components/KeyMapTab';
import LoadingOverlay from './components/LoadingOverlay';
import { CheckCircle2, AlertCircle, Info, X, Download, FileJson } from 'lucide-react';

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
    logs: ['Welcome to Web Mapper 0.7'],
    config: { ...DEFAULT_CONFIG },
    keyMaps: {}, // Centralized keyMaps within state
    loading: null, // Initialize loading as null
    notification: null,
    isDownloadModalOpen: false,
    exportFileName: 'lpu237_settings.xml',    
  });
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
        />
      );
    }

    return <div className="p-4">Select a tab from the sidebar to begin.</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      {state.loading && <LoadingOverlay loading={state.loading} />}
      
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
        />
        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
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
