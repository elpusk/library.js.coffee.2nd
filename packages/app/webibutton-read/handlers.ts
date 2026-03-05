import React from 'react';
import { AppState, ConnectionStatus, iButtonKeyData } from './types';
import { coffee } from '@lib/elpusk.framework.coffee';
import { lpu237 } from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 } from '@lib/elpusk.framework.coffee.ctl_lpu237';

// ────────────────────────────────────────────────────────────
//  Global singletons
// ────────────────────────────────────────────────────────────
let g_coffee = coffee.get_instance();
let g_lpu237: lpu237 | null = null;
let g_ctl_lpu237: ctl_lpu237 | null = null;
let g_initialized = false; // StrictMode 이중 초기화 방지
let g_refresh_device_list: (() => void) | null = null;

const IBUTTON_DEVICE_FILTER = 'hid#vid_134b&pid_0206&mi_01';
const IBUTTON_PATH_SUFFIX   = '&ibutton';

// ────────────────────────────────────────────────────────────
//  Handler factory
// ────────────────────────────────────────────────────────────
export function createHandlers(
  stateRef: React.MutableRefObject<AppState>,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void
) {

  // ── 내부 헬퍼 ──────────────────────────────────────────────
  const setServerStatus = (s: ConnectionStatus) =>
    setState(prev => ({ ...prev, serverStatus: s }));

  const setDeviceStatus = (s: ConnectionStatus) =>
    setState(prev => ({ ...prev, deviceStatus: s }));

  // ── 1. system event handler ────────────────────────────────
  function _cb_system_event(s_action_code: string, s_data_field: string[]):void {
    do {
      if (typeof s_action_code === 'undefined') break;

      if (s_action_code === 'c') {
        // 장비 제거 이벤트
        if (!s_data_field || s_data_field.length <= 0) break;
        if (!g_ctl_lpu237) break;
        if (!g_ctl_lpu237.get_device()) break;

        for (let i = 0; i < s_data_field.length; i++) {
          if (g_ctl_lpu237.get_device()!.get_path() === s_data_field[i]) {
            addLog('[System] Connected device was removed (hot-plug out).');
            g_ctl_lpu237 = null;
            g_lpu237     = null;
            setState(prev => ({
              ...prev,
              deviceStatus: ConnectionStatus.DISCONNECTED,
              devicePath: '',
              isReading: false,
            }));
            break;
          }
        }
      }

      if (s_action_code === 'P') {
        // 새 장비 삽입 이벤트 → device list 갱신
        addLog('[System] New device plugged in. Refreshing device list...');
          if (typeof g_refresh_device_list === 'function') {
            g_refresh_device_list();
          }
      }
    } while (false);
  }

  // ── 키 읽기 완료 콜백 ─────────────────────────────────────
  function _cb_read_ibutton_done(n_device_index: number, s_msg: string):void {
    addLog(`[iButton] iButton read done (device[${n_device_index}]): ${s_msg}`);

    if (!g_ctl_lpu237) return;

    const keyData: iButtonKeyData = {
      key: '',
      key_error: 0,
      timestamp: new Date().toLocaleTimeString(),
    };

    const errCode = g_ctl_lpu237.get_device()!.get_ibutton_error_code();

    do{
      if (typeof errCode !== 'number') continue;
      if (errCode !== 0) {
        keyData.key_error = errCode;
        addLog(`[iButton] Key error code: ${errCode.toString(16)}h(${errCode.toString(10)})`);
      } else {
        const data = g_ctl_lpu237.get_device()!.get_ibutton_data();
        keyData.key = data;
        if (data.length > 0) {
          //addLog(`[iButton] Track${i + 1}: ${data}`);
        } else {
          //addLog(`[iButton] Track${i + 1}: (empty)`);
        }
      }
    }while(false);

    // 카드 데이터 초기화
    g_ctl_lpu237.get_device()!.reset_ibutton_data();

    // 기록 추가 (최대 50건)
    setState(prev => ({
      ...prev,
      keyHistory: [keyData, ...prev.keyHistory].slice(0, 50),
    }));
    // 자동으로 카드 읽기 대기 재진입 (라이브러리가 처리)
  }

  // ── 키 읽기 에러 콜백 ──────────────────────────────────── 
  function _cb_read_ibutton_error(n_device_index: number, event_error: Error | Event):void {
    if( event_error instanceof Error){
      addLog(`[iButton] Read error (device[${n_device_index}]): ${event_error.message}`);
    }
    // 라이브러리가 자동으로 키 읽기 대기 종료
    setState(prev => ({ ...prev, isReading: false }));
  }

  // ── 키 읽기 취소 완료 콜백 ───────────────────────────────
  function _cb_stop_ibutton_done(n_device_index: number, s_msg: string):void {
    addLog(`[iButton] Read cancelled (device[${n_device_index}]): ${s_msg}`);
    setState(prev => ({ ...prev, isReading: false }));
  }

  // ── 키 읽기 취소 에러 콜백 ───────────────────────────────
  function _cb_stop_ibutton_error(n_device_index: number, event_error: Error| Event):void {
    if( event_error instanceof Error){
      addLog(`[iButton] Cancel error (device[${n_device_index}]): ${event_error.message}`);
    }
    setState(prev => ({ ...prev, isReading: false }));
  }

  // ────────────────────────────────────────────────────────────
  //  Public handlers
  // ────────────────────────────────────────────────────────────

  /** 브라우저 종료 시 카드 읽기 대기 취소 */
  function _cb_before_unload(): void {
    if (g_ctl_lpu237 && stateRef.current.isReading) {
      g_ctl_lpu237.read_ibutton_from_device_with_callback(
        false,
        (_idx, _msg) => { /* ignore */ },
        (_idx, _err) => { /* ignore */ }
      );
    }
  }

  /** 앱 초기화 (StrictMode 이중 실행 방지 포함) */
  async function initializeSystem() {
    if (g_initialized) return;
    g_initialized = true;
    addLog('[System] Initializing...');
    try {
      // 1. system event handler 설정
      coffee.set_system_event_handler(_cb_system_event);
      addLog('[System] System event handler registered.');
      // 브라우저 종료 시 키 읽기 대기 자동 취소 등록
      window.addEventListener('beforeunload', _cb_before_unload);
    } catch (e) {
      addLog(`[Error] initializeSystem: ${e}`);
    }

    g_refresh_device_list = async () => {
      try {
        if (g_coffee.get_session_number()) {
          const dev_list = await g_coffee.get_device_list(IBUTTON_DEVICE_FILTER,);
          const ibuttonPaths = dev_list.filter(p => p.endsWith(IBUTTON_PATH_SUFFIX));
          setState(prev => ({ ...prev, devicePaths: ibuttonPaths }));
          addLog(`[Info] iButton device paths: ${ibuttonPaths.length > 0 ? ibuttonPaths.join(', ') : '(none)'}`);

        }
      } catch (e) {
        addLog(`[Error] get_device_list failed: ${e}`);
      }
    };
  }

  /** 앱 종료 정리 */
  function uninitializeSystem() {
    if (!g_initialized) return;
    g_initialized = false;
    addLog('[System] Uninitializing...');
    window.removeEventListener('beforeunload', _cb_before_unload);
    if (g_coffee) {
      try { g_coffee.disconnect(); } catch (_) { /* ignore */ }
    }
    g_ctl_lpu237 = null;
    g_lpu237     = null;
    g_refresh_device_list = null;
  }

  /** cf2 서버 연결 */
  async function onConnectServer(url: string = 'wss://localhost:443') {
    addLog(`[Server] Connecting to ${url} ...`);
    setServerStatus(ConnectionStatus.CONNECTING);
    try {
      // 2. cf2 클라이언트 session 생성
      const s_session_number = await g_coffee.connect('wss', '443');
      if(typeof s_session_number !== "string"){
        throw Error("fail connects server.");
      }
      addLog(`Session number:${s_session_number}`);

      setServerStatus(ConnectionStatus.CONNECTED);
      addLog('[Server] Connected.');
      if(g_refresh_device_list){
        await g_refresh_device_list();
      }
    } catch (e) {
      setServerStatus(ConnectionStatus.DISCONNECTED);
      addLog(`[Error] Server connect failed: ${e}`);
    }
  }

  /** cf2 서버 연결 해제 */
  async function onDisconnectServer() {
    addLog('[Server] Disconnecting...');
    try {
      if (g_ctl_lpu237) {
        // key 읽기 대기 중이면 먼저 취소 후 close
        if (stateRef.current.isReading) {
          addLog('[Server] Stopping ibutton read before disconnect...');
          await new Promise<void>((resolve) => {
            g_ctl_lpu237!.read_ibutton_from_device_with_callback(
              false,
              (_idx, _msg) => { resolve(); },
              (_idx, _err) => { resolve(); }
            );
          });
          addLog('[Server] iButton read stopped.');
        }
        await g_ctl_lpu237.close_with_promise().catch(() => {/* ignore */});
        g_ctl_lpu237 = null;
        g_lpu237     = null;
      }
      g_coffee.disconnect();
    } catch (_) { /* ignore */ }
    setServerStatus(ConnectionStatus.DISCONNECTED);
    setDeviceStatus(ConnectionStatus.DISCONNECTED);
    setState(prev => ({ ...prev, devicePath: '', devicePaths: [], isReading: false }));
    addLog('[Server] Disconnected.');
  }

  /** 장비 연결 */
  async function onConnect(selectedPath: string) {
    if (!selectedPath) {
      addLog('[Error] No device path selected.');
      return;
    }
    addLog(`[Device] Connecting to ${selectedPath} ...`);
    setDeviceStatus(ConnectionStatus.CONNECTING);
    try {
      // 4. lpu237 객체 생성
      g_lpu237 = new lpu237(selectedPath);
      // 5. ctl_lpu237 객체 생성
      g_ctl_lpu237 = new ctl_lpu237(g_coffee, g_lpu237);
      // 6. 장비 open
      await g_ctl_lpu237.open_with_promise();
      addLog('[Device] Opened.');
      // 7. 기본 정보 읽기
      await g_ctl_lpu237.load_basic_info_from_device_with_promise();
      addLog('[Device] Basic info loaded.');
      setDeviceStatus(ConnectionStatus.CONNECTED);
      setState(prev => ({ ...prev, devicePath: selectedPath }));
    } catch (e) {
      setDeviceStatus(ConnectionStatus.DISCONNECTED);
      g_ctl_lpu237 = null;
      g_lpu237     = null;
      addLog(`[Error] Device connect failed: ${e}`);
    }
  }

  /** 장비 연결 해제 */
  async function onDisconnect() {
    if (!g_ctl_lpu237) return;
    addLog('[Device] Disconnecting...');
    try {
      // 9. 카드 읽기 대기 중이면 먼저 취소 후 close
      if (stateRef.current.isReading) {
        addLog('[Device] Stopping ibutton read before disconnect...');
        await new Promise<void>((resolve) => {
          g_ctl_lpu237!.read_ibutton_from_device_with_callback(
            false,
            (_idx, _msg) => { resolve(); },
            (_idx, _err) => { resolve(); }
          );
        });
        addLog('[Device] iButton read stopped.');
      }
      // 10. close
      await g_ctl_lpu237.close_with_promise();
      addLog('[Device] Closed.');
    } catch (e) {
      addLog(`[Warn] close error: ${e}`);
    }
    g_ctl_lpu237 = null;
    g_lpu237     = null;
    setDeviceStatus(ConnectionStatus.DISCONNECTED);
    setState(prev => ({ ...prev, devicePath: '', isReading: false }));
  }

  /** 카드 읽기 시작 */
  function onStartReading() {
    if (!g_ctl_lpu237) {
      addLog('[Error] Device not connected.');
      return;
    }
    addLog('[iButton] Starting ibutton read wait...');
    // 8. 카드 읽기 대기 상태로 전환
    g_ctl_lpu237.read_ibutton_from_device_with_callback(
      true,
      _cb_read_ibutton_done,
      _cb_read_ibutton_error
    );
    setState(prev => ({ ...prev, isReading: true }));
  }

  /** 카드 읽기 취소 */
  function onStopReading() {
    if (!g_ctl_lpu237) {
      addLog('[Error] Device not connected.');
      return;
    }
    addLog('[iButton] Cancelling ibutton read wait...');
    // 9. 카드 읽기 대기 취소
    g_ctl_lpu237.read_ibutton_from_device_with_callback(
      false,
      _cb_stop_ibutton_done,
      _cb_stop_ibutton_error
    );
  }

  /** 로그 초기화 */
  function onClearLogs() {
    setState(prev => ({ ...prev, logs: [] }));
  }

  /** 카드 기록 초기화 */
  function onClearHistory() {
    setState(prev => ({ ...prev, keyHistory: [] }));
    addLog('[Info] iButton history cleared.');
  }

  return {
    initializeSystem,
    uninitializeSystem,
    onConnectServer,
    onDisconnectServer,
    onConnect,
    onDisconnect,
    onStartReading,
    onStopReading,
    onClearLogs,
    onClearHistory,
  };
}
