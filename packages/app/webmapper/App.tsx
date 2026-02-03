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
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

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
          onDownloadSettings={handlers.onDownloadSettings}
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
