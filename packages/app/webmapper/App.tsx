
import React, { useState, useEffect, useMemo } from 'react';
import { ConnectionStatus, DeviceType, AppState, KeyMapEntry, DEFAULT_CONFIG } from './types';
import { createHandlers } from './handlers';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DeviceTab from './components/DeviceTab';
import CommonTab from './components/CommonTab';
import KeyMapTab from './components/KeyMapTab';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ConnectionStatus.DISCONNECTED,
    serverStatus: ConnectionStatus.DISCONNECTED,
    devicePath: '',
    deviceType: DeviceType.MSR_IBUTTON,
    activeTab: 'device',
    logs: ['Welcome to Web Tools 1.0'],
    config: { ...DEFAULT_CONFIG },
  });

  const [keyMaps, setKeyMaps] = useState<Record<string, KeyMapEntry[]>>({});

  // Helper to add logs to state
  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, message]
    }));
  };

  // Initialize the central handlers
  // Note: handlers are memoized but reconstructed when state changes to ensure fresh closures
  const handlers = useMemo(() => createHandlers(state, setState, addLog), [state]);

  // Call the initialization function on startup and cleanup on termination
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
  }, [state.serverStatus, state.status]);

  const handleKeyMapChange = (tabId: string, newKeys: KeyMapEntry[]) => {
    setKeyMaps(prev => ({
      ...prev,
      [tabId]: newKeys
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
          onConnect={handlers.onConnect}
          onDisconnect={handlers.onDisconnect}
          logs={state.logs}
          onClearLogs={handlers.onClearLogs}
          setDeviceType={(type) => setState(prev => ({ ...prev, deviceType: type }))}
          onApply={handlers.onApply}
          onLoadSettings={handlers.onLoadSettings}
          onLoadFirmware={handlers.onLoadFirmware}
          onDownloadSettings={handlers.onDownloadSettings}
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
      const currentKeys = keyMaps[state.activeTab] || [];

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
      <Header 
        status={state.status} 
        serverStatus={state.serverStatus}
        devicePath={state.devicePath} 
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
