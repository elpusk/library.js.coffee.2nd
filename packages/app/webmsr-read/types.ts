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

/** MSR 3 track 데이터 */
export interface MsrTrackData {
  track1: string;
  track2: string;
  track3: string;
  track1_error: number;
  track2_error: number;
  track3_error: number;
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
  isReading: boolean;         // 카드 읽기 대기 중 여부
  cardHistory: MsrTrackData[]; // 읽은 카드 기록
  logs: string[];
  notification: NotificationState | null;
}
