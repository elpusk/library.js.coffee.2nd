import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AppState, ConnectionStatus, APP_VERSION } from './types';
import { createHandlers } from './handlers';
import Header from './components/Header';
import Footer from './components/Footer';
import ControlPanel from './components/ControlPanel';
import KeyHistory from './components/KeyHistory';
import LogPanel from './components/LogPanel';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    serverStatus: ConnectionStatus.DISCONNECTED,
    deviceStatus: ConnectionStatus.DISCONNECTED,
    devicePath: '',
    devicePaths: [],
    isReading: false,
    keyHistory: [],
    logs: [`Welcome to Elpusk i-Button Reader ${APP_VERSION}`],
    notification: null,
  });

  const [selectedPath, setSelectedPath] = useState<string>('');
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const addLog = (message: string) => {
    setState(prev => ({ ...prev, logs: [...prev.logs, message] }));
  };

  // Notification auto-dismiss
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, notification: null }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // selectedPath 자동 설정
  useEffect(() => {
    if (state.devicePaths.length > 0 && !selectedPath) {
      setSelectedPath(state.devicePaths[0]);
    }
  }, [state.devicePaths]);

  // 서버 연결 끊기면 장비 상태도 초기화
  useEffect(() => {
    if (
      state.serverStatus === ConnectionStatus.DISCONNECTED &&
      state.deviceStatus === ConnectionStatus.CONNECTED
    ) {
      addLog('[System] Server disconnected: device connection also dropped.');
      setState(prev => ({
        ...prev,
        deviceStatus: ConnectionStatus.DISCONNECTED,
        devicePath: '',
        isReading: false,
      }));
      setSelectedPath('');
    }
    if (state.serverStatus === ConnectionStatus.DISCONNECTED) {
      setSelectedPath('');
    }
  }, [state.serverStatus]);

  const handlers = useMemo(() => createHandlers(stateRef, setState, addLog), []);

  useEffect(() => {
    handlers.initializeSystem();
    return () => {
      handlers.uninitializeSystem();
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col font-sans text-gray-800 overflow-hidden">
      {/* Toast notification */}
      {state.notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-lg shadow-xl border ${
            state.notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            state.notification.type === 'error'   ? 'bg-red-50 border-red-200 text-red-800' :
                                                     'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {state.notification.type === 'success' && <CheckCircle2 size={18} className="text-green-600" />}
            {state.notification.type === 'error'   && <AlertCircle  size={18} className="text-red-600" />}
            {state.notification.type === 'info'    && <Info         size={18} className="text-blue-600" />}
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
        serverStatus={state.serverStatus}
        deviceStatus={state.deviceStatus}
        devicePath={state.devicePath}
        onToggleServer={() => {
          if (state.serverStatus === ConnectionStatus.CONNECTED) {
            handlers.onDisconnectServer();
          } else {
            handlers.onConnectServer('wss://localhost:443');
          }
        }}
      />

      {/* Main: header ~ footer 사이 전체를 채우되, Log는 하단 고정 */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left column: Control */}
        <div className="w-72 shrink-0 flex flex-col gap-3 p-3">
          <ControlPanel
            serverStatus={state.serverStatus}
            deviceStatus={state.deviceStatus}
            devicePaths={state.devicePaths}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            isReading={state.isReading}
            onConnect={() => handlers.onConnect(selectedPath)}
            onDisconnect={handlers.onDisconnect}
            onStartReading={handlers.onStartReading}
            onStopReading={handlers.onStopReading}
          />
        </div>

        {/* Right column: KeyHistory(스크롤) + Log(하단 고정) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-3 pl-0 gap-3">
          {/* KeyHistory: 남은 공간을 채우며 내부 스크롤 */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <KeyHistory
              history={state.keyHistory}
              onClear={handlers.onClearHistory}
            />
          </div>
          {/* Log: 고정 높이, 하단에 붙음 */}
          <div className="shrink-0">
            <LogPanel
              logs={state.logs}
              onClear={handlers.onClearLogs}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
