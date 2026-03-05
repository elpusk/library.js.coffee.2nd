export const APP_VERSION = 'v1.0';

export enum ConnectionStatus {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting...',
  CONNECTED = 'Connected',
}

export enum ServerStatus {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting...',
  CONNECTED = 'Connected',
}

/** ibutton key 데이터 */
export interface iButtonKeyData {
  key: string;
  key_error: number;
  timestamp: string;
}

export interface NotificationState {
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AppState {
  serverStatus: ConnectionStatus;
  deviceStatus: ConnectionStatus;
  devicePath: string;
  devicePaths: string[];
  isReading: boolean;         // key 읽기 대기 중 여부
  keyHistory: iButtonKeyData[]; // 읽은 key 기록
  logs: string[];
  notification: NotificationState | null;
}
