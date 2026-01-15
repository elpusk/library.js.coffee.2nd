
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
}

export interface LoadingState {
  current: number;
  total: number;
  message: string;
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

export interface AppState {
  status: ConnectionStatus;
  serverStatus: ConnectionStatus;
  devicePath: string;
  deviceType: DeviceType;
  devicePaths: string[]; // List of available device paths from server
  activeTab: string;
  logs: string[];
  config: DeviceConfig;
  loading: LoadingState | null; // Added loading state
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
  interface: 'USB keyboard mode',
  buzzer: true,
  language: 'USA English',
  ibuttonMode: 'zero-16 times',
  ibuttonRangeStart: 0,
  ibuttonRangeEnd: 15,
  msrDirection: 'Bidirectional',
  msrTrackOrder: '123',
  msrResetInterval: '0(default, 03:22)',
  msrEnableISO1: true,
  msrEnableISO2: true,
  msrEnableISO3: true,
  msrGlobalSendCondition: 'No Error in all tracks',
  msrSuccessIndCondition: 'No Error in all tracks',
};
