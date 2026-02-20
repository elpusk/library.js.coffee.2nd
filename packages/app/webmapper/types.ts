export enum ConnectionStatus {
  DISCONNECTED = 'not connect',
  CONNECTED = 'connected',
}

export enum DeviceType {
  IBUTTON = 'i-button',
  MSR = 'msr',
  MSR_IBUTTON = 'msr+i-button',
}

export interface KeyMapEntry {
  id: number;
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  keyValue: string;
  hidCode: string; // Added field for USB HID Scan Code
}

export interface LoadingState {
  current: number;
  total: number;
  message: string;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface DeviceConfig {
  interface: string;
  buzzer: boolean;
  language: string;
  ibuttonMode: string;
  ibuttonRangeStart: number;
  ibuttonRangeEnd: number;
  msrDirection: string;
  msrTrackOrder: string;
  msrResetInterval: string;
  msrEnableISO1: boolean;
  msrEnableISO2: boolean;
  msrEnableISO3: boolean;
  msrGlobalSendCondition: string;
  msrSuccessIndCondition: string;
}

export interface RomItemInfo {
  index: number;
  model: string;
  version: string;
  condition: number;
}

export interface AppState {
  status: ConnectionStatus;
  serverStatus: ConnectionStatus;
  devicePath: string;
  deviceUid: string; // Added field for hardware identifier
  deviceName: string; // Added field for hardware model name
  deviceFirmware: string; // Added field for hardware firmware version
  deviceType: DeviceType;
  devicePaths: string[]; // List of available device paths from server
  activeTab: string;
  logs: string[];
  config: DeviceConfig;
  keyMaps: Record<string, KeyMapEntry[]>; // Unified key mapping state
  loading: LoadingState | null; // Added loading state
  notification: NotificationState | null; // Added for toast alerts
  isDownloadModalOpen: boolean; // For filename input modal
  exportFileName: string; // Stored filename for export  
  
  // Firmware Update related state
  isFirmwareModalOpen: boolean;
  romItems: RomItemInfo[];
  compatibleItemIndex: number;
  selectedRomItemIndex: number;
  pendingFirmwareFile: File | null;  
}

export const KEYBOARD_LAYOUT = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Bksp'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

export const DEFAULT_CONFIG: DeviceConfig = {
  interface: 'USB HID Vendor',
  buzzer: true,
  language: 'USA English',
  ibuttonMode: 'Zeros',
  ibuttonRangeStart: 0,
  ibuttonRangeEnd: 15,
  msrDirection: 'Bidirectional',
  msrTrackOrder: '123',
  msrResetInterval: 'disable',
  msrEnableISO1: true,
  msrEnableISO2: true,
  msrEnableISO3: true,
  msrGlobalSendCondition: 'One more track is normal',
  msrSuccessIndCondition: 'No Error in all tracks',
};

// 중앙 관리용 애플리케이션 버전 상수
export const APP_VERSION = '1.3';