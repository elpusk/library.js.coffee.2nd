// Fix for line 22: Import React to provide the React namespace for Dispatch and SetStateAction types
import React from "react";
import {
  AppState,
  ConnectionStatus,
  DeviceType,
  DeviceConfig,
  KeyMapEntry,
  NotificationState
} from "./types";
import { coffee } from "@lib/elpusk.framework.coffee";
import {
  lpu237,
  type_function
} from "@lib/elpusk.device.usb.hid.lpu237";
import { ctl_lpu237 } from "@lib/elpusk.framework.coffee.ctl_lpu237";
import * as elpusk_util_keyboard_map from "@lib/elpusk.util.keyboard.map";
import * as elpusk_util_keyboard_const from "@lib/elpusk.util.keyboard.const"

// Global instances for library management
let g_coffee = coffee.get_instance();
let g_lpu_device: lpu237 | null = null;
let g_ctl: ctl_lpu237 | null = null;
// Global callbacks to trigger UI updates from non-React events
let g_force_cleanup: (() => void) | null = null;
let g_refresh_device_list: (() => void) | null = null;

/**
 * MAPPING HELPERS: HW <-> UI
 */
const IBUTTON_MODE_MAP: Record<string, number> = {
  "zero-16 times": 0x00,
  F12: 0x01,
  "zero-7 times": 0x04,
  "Code stick protocol": 0x08,
  "user definition": 0x02,
};

// HID key code 값에 대응하는 키보드 키 심볼 저장.
export const HID_REVERSE_MAP: Record<string, string> = {
  [elpusk_util_keyboard_const.HIDKEY____a____A]: "A",
  [elpusk_util_keyboard_const.HIDKEY____b____B]: "B",
  [elpusk_util_keyboard_const.HIDKEY____c____C]: "C",
  [elpusk_util_keyboard_const.HIDKEY____d____D]: "D",
  [elpusk_util_keyboard_const.HIDKEY____e____E]: "E",
  [elpusk_util_keyboard_const.HIDKEY____f____F]: "F",
  [elpusk_util_keyboard_const.HIDKEY____g____G]: "G",
  [elpusk_util_keyboard_const.HIDKEY____h____H]: "H",
  [elpusk_util_keyboard_const.HIDKEY____i____I]: "I",
  [elpusk_util_keyboard_const.HIDKEY____j____J]: "J",
  [elpusk_util_keyboard_const.HIDKEY____k____K]: "K",
  [elpusk_util_keyboard_const.HIDKEY____l____L]: "L",
  [elpusk_util_keyboard_const.HIDKEY____m____M]: "M",
  [elpusk_util_keyboard_const.HIDKEY____n____N]: "N",
  [elpusk_util_keyboard_const.HIDKEY____o____O]: "O",
  [elpusk_util_keyboard_const.HIDKEY____p____P]: "P",
  [elpusk_util_keyboard_const.HIDKEY____q____Q]: "Q",
  [elpusk_util_keyboard_const.HIDKEY____r____R]: "R",
  [elpusk_util_keyboard_const.HIDKEY____s____S]: "S",
  [elpusk_util_keyboard_const.HIDKEY____t____T]: "T",
  [elpusk_util_keyboard_const.HIDKEY____u____U]: "U",
  [elpusk_util_keyboard_const.HIDKEY____v____V]: "V",
  [elpusk_util_keyboard_const.HIDKEY____w____W]: "W",
  [elpusk_util_keyboard_const.HIDKEY____x____X]: "X",
  [elpusk_util_keyboard_const.HIDKEY____y____Y]: "Y",
  [elpusk_util_keyboard_const.HIDKEY____z____Z]: "Z",
  [elpusk_util_keyboard_const.HIDKEY____1_EXCL]: "1",
  [elpusk_util_keyboard_const.HIDKEY____2_QUOT]: "2",
  [elpusk_util_keyboard_const.HIDKEY____3_SHAR]: "3",
  [elpusk_util_keyboard_const.HIDKEY____4_DOLL]: "4",
  [elpusk_util_keyboard_const.HIDKEY____5_PERC]: "5",
  [elpusk_util_keyboard_const.HIDKEY____6_CIRC]: "6",
  [elpusk_util_keyboard_const.HIDKEY____7_AMPE]: "7",
  [elpusk_util_keyboard_const.HIDKEY____8_ASTE]: "8",
  [elpusk_util_keyboard_const.HIDKEY____9_L_PA]: "9",
  [elpusk_util_keyboard_const.HIDKEY____0_R_PA]: "0",
  [elpusk_util_keyboard_const.HIDKEY____RETURN]: "Enter",
  [elpusk_util_keyboard_const.HIDKEY____ESCAPE]: "Esc",
  [elpusk_util_keyboard_const.HIDKEY_BACKSPACE]: "Bksp",
  [elpusk_util_keyboard_const.HIDKEY_______TAB]: "Tab",
  [elpusk_util_keyboard_const.HIDKEY_____SPACE]: "Space",
  [elpusk_util_keyboard_const.HIDKEY_MIN_UNDER]: "-",
  [elpusk_util_keyboard_const.HIDKEY_EQU__PLUS]: "=",
  [elpusk_util_keyboard_const.HIDKEY_LBT___LBR]: "[",
  [elpusk_util_keyboard_const.HIDKEY_RBT___RBR]: "]",
  [elpusk_util_keyboard_const.HIDKEY_BSLA_VBAR]: "\\",
  [elpusk_util_keyboard_const.HIDKEY_SEMI__COL]: ";",
  [elpusk_util_keyboard_const.HIDKEY_APOS_QUOT]: "'",
  [elpusk_util_keyboard_const.HIDKEY_GRAV_TILD]: "`",
  [elpusk_util_keyboard_const.HIDKEY_COMA___LT]: ",",
  [elpusk_util_keyboard_const.HIDKEY_PERIOD_GT]: ".",
  [elpusk_util_keyboard_const.HIDKEY_SLASH__QM]: "/",
  //caplock 사용 안함.
  [elpusk_util_keyboard_const.HIDKEY________F1]: "F1",
  [elpusk_util_keyboard_const.HIDKEY________F2]: "F2",
  [elpusk_util_keyboard_const.HIDKEY________F3]: "F3",
  [elpusk_util_keyboard_const.HIDKEY________F4]: "F4",
  [elpusk_util_keyboard_const.HIDKEY________F5]: "F5",
  [elpusk_util_keyboard_const.HIDKEY________F6]: "F6",
  [elpusk_util_keyboard_const.HIDKEY________F7]: "F7",
  [elpusk_util_keyboard_const.HIDKEY________F8]: "F8",
  [elpusk_util_keyboard_const.HIDKEY________F9]: "F9",
  [elpusk_util_keyboard_const.HIDKEY_______F10]: "F10",
  [elpusk_util_keyboard_const.HIDKEY_______F11]: "F11",
  [elpusk_util_keyboard_const.HIDKEY_______F12]: "F12",
};

/**
 * Utility to map a human-readable key label back to a USB HID scan code.
 */
export const getHidCodeByLabel = (label: string): string => {
  const normalized = label.toLowerCase();
  for (const [code, symbol] of Object.entries(HID_REVERSE_MAP)) {
    if (symbol.toLowerCase() === normalized) return code;
  }
  return "00";
};

const _get_tag_string = (b_shift:boolean, b_ctl:boolean, b_alt:boolean, s_hex_hid_key_code:string): string =>{
  let s_hex_tag ="";

  if(s_hex_hid_key_code.length == 2){
    let c_modifier_code = 0;
    if(b_shift){//left shift
      c_modifier_code |= 0x02;
    }
    if(b_ctl){//left control
      c_modifier_code |= 0x01;
    }
    if(b_alt){//left alt
      c_modifier_code |= 0x04;
    }

    const s_m = c_modifier_code.toString(16).padStart(2, "0").toLowerCase();
    s_hex_tag = s_m+s_hex_hid_key_code;
  }

  return s_hex_tag;
}

// Completed fix for _set_ui_tag_to_device to handle all tab labels
const _set_ui_tag_to_device = (state: AppState,s_tab_lable:string):void => {
      const hw = g_lpu_device;
      if(hw === null){
        return;
      }
      const km = state.keyMaps;

      if( s_tab_lable in km ){
        let s_tab = s_tab_lable;
        let s_hex_key = "";
        let s_hex_mode_and_key = "";
        let s_tags = "";
        let s : boolean = false;
        let c : boolean = false;
        let a : boolean = false;
        let s_len = (km[s_tab].length*2).toString(16).padStart(2, "0").toLowerCase();

        for( let i=0; i<km[s_tab].length; i++ ){
          s = km[s_tab][i].shift;
          c = km[s_tab][i].ctrl;
          a = km[s_tab][i].alt;
          s_hex_key = km[s_tab][i].hidCode;
          s_hex_mode_and_key += _get_tag_string(s,c,a,s_hex_key);
        }//end for
        s_tags = s_len + s_hex_mode_and_key;

        switch(s_tab_lable){
        case "msr-global-prefix":
          hw.set_global_prefix(s_tags);
          break;
        case "msr-global-suffix":
          hw.set_global_postfix(s_tags);
          break;
        case "msr-iso1-prefix":
          hw.set_msr_private_prefix(0,0,s_tags);
          break;
        case "msr-iso1-suffix":
          hw.set_msr_private_postfix(0,0,s_tags);
          break;
        case "msr-iso2-prefix":
          hw.set_msr_private_prefix(1,0,s_tags);
          break;
        case "msr-iso2-suffix":
          hw.set_msr_private_postfix(1,0,s_tags);
          break;
        case "msr-iso3-prefix":
          hw.set_msr_private_prefix(2,0,s_tags);
          break;
        case "msr-iso3-suffix":
          hw.set_msr_private_postfix(2,0,s_tags);
          break;

        case "ibutton-key-prefix":
          hw.set_prefix_ibutton(s_tags);
          break;
        case "ibutton-key-suffix":
          hw.set_postfix_ibutton(s_tags);
          break;
        case "ibutton-remove-key":
          hw.set_ibutton_remove(s_tags);
          break;
        case "ibutton-remove-prefix":
          hw.set_prefix_ibutton_remove(s_tags);
          break;
        case "ibutton-remove-suffix":
          hw.set_postfix_ibutton_remove(s_tags);
          break;
        default:
          break;
        }//end switch
      }
}

/**
 * Helper to parse LPU237 hex tag format (length + modifier/keycode pairs) into KeyMapEntry array.
 */
const parseHexToKeyMap = (n_lang: number,hex: string | null): KeyMapEntry[] => {
  if (!hex || hex === "00" || hex === "") return [];

  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  const length = bytes[0]; // First byte is data length in bytes
  if (length === 0) return [];

  const entries: KeyMapEntry[] = [];
  // Each pair is 2 bytes (modifier, keycode)
  for (let i = 1; i <= length && i + 1 < bytes.length; i += 2) {
    let c_mod = bytes[i];
    let c_code = bytes[i+1];
    if (c_mod == 0xff) {
      // code 는 ASCII code.  code 를 키토드로 변경해야함.
      const s_mod = elpusk_util_keyboard_map.get_ascii_to_hid_key_map_value(n_lang,c_code,0);
      const s_code = elpusk_util_keyboard_map.get_ascii_to_hid_key_map_value(n_lang,c_code,1);

      c_mod = parseInt(s_mod,16);
      c_code = parseInt(s_code,16);
    }

    //c_code 는 여기에서 1byte HID keycode .
    const code = c_code.toString(16).padStart(2, "0").toLowerCase();

    entries.push({
      id: Date.now() + Math.random(), // Unique ID for table mapping
      shift: (c_mod & 0x02) !== 0,
      ctrl: (c_mod & 0x01) !== 0,
      alt: (c_mod & 0x04) !== 0,
      keyValue: `[${HID_REVERSE_MAP[code] || code}] key`, //HID keycode 에 대응하는 키보드 키 심볼이 있으면, 심볼을 없으면, HID 키코드 값 자체를 저장.
      hidCode: code, // Store standard HID scan code
    });
  }
  return entries;
};

/**
 * GLOBAL SYSTEM HANDLERS
 */
let g_n_system_event = 0;
let g_n_opened_device_index = 0;

function _cb_system_event(s_action_code: any, s_data_field: any) {
  do{
    if (typeof s_action_code === "undefined"){
      continue;
    }

    if (s_action_code === "c") {
      // 중요 +_+ 이 이벤트는 현재 open 된 장비가 있어야 발생함.
      //a device is plugged out in the connected device status. 
      ++g_n_system_event;

      // check the current status is the connected device status.
      if(!g_ctl){
        continue;
      }
      if(!g_ctl.get_device()){
        continue;
      }

      // find the removed device
      for (let i = 0; i < s_data_field.length; i++) {
        if (g_ctl.get_device().get_path() === s_data_field[i]) {
          // found the removed device.
          // need that disconnect the removed device and disconnect server.
          // Trigger the cleanup logic to update UI and close connections
          if (typeof g_force_cleanup === 'function') {
            g_force_cleanup();
          }
          break;
        }
      }//end for
      continue;
    }//the end of "c" event

    if( s_action_code === "P"){
        //a device have been plugged in connected server status.
        ++g_n_system_event;
        if (typeof g_refresh_device_list === 'function') {
          g_refresh_device_list();
        }
        continue;
    }//the end of "P" event

  }while(false);

} // the end of _cb_system_event

(window as any).cf2_initialize = () => {
  coffee.set_system_event_handler(_cb_system_event);
};

(window as any).cf2_uninitialize = () => {};

export const createHandlers = (
  stateRef: React.MutableRefObject<AppState>,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void,
) => {
  
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setState(prev => ({
      ...prev,
      notification: { message, type }
    }));
  };

  const updateSetting = (
    key: keyof DeviceConfig,
    value: any,
    label?: string,
  ) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, [key]: value },
      logs: [...prev.logs, `Update: ${label || key} set to ${value}`],
    }));
  };

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  /**
   * Internal helper to extract the current state of the hardware instance
   * and update the React application state.
   */
  const _syncHardwareToState = (hw: lpu237) => {
    const newConfig: DeviceConfig = {
      interface: hw.get_interface_string(),
      buzzer: hw.get_buzzer_count_boolean(),
      language: hw.get_keyboard_language_index_string(),
      ibuttonMode: hw.get_ibutton_mode_string(),
      ibuttonRangeStart: hw.get_ibutton_range_start(),
      ibuttonRangeEnd: hw.get_ibutton_range_end(),
      msrDirection: hw.get_direction_string(0),
      msrTrackOrder: hw.get_order_string(),
      msrResetInterval: hw.get_mmd1100_reset_interval_string_cur(),
      msrEnableISO1: hw.get_enable_iso(0),
      msrEnableISO2: hw.get_enable_iso(1),
      msrEnableISO3: hw.get_enable_iso(2),
      msrGlobalSendCondition:
        hw.get_global_pre_postfix_send_condition_string(),
      msrSuccessIndCondition:
        hw.get_indicate_success_when_any_not_error_string(),
    };

    // Extract and parse all key mapping configurations
    const keyMaps: Record<string, KeyMapEntry[]> = {
      "msr-global-prefix": parseHexToKeyMap(hw.get_language(), hw.get_global_prefix()),
      "msr-global-suffix": parseHexToKeyMap(hw.get_language(), hw.get_global_postfix()),
      "msr-iso1-prefix": parseHexToKeyMap(hw.get_language(), hw.get_private_prefix(0, 0)),
      "msr-iso1-suffix": parseHexToKeyMap(hw.get_language(), hw.get_private_postfix(0, 0)),
      "msr-iso2-prefix": parseHexToKeyMap(hw.get_language(), hw.get_private_prefix(1, 0)),
      "msr-iso2-suffix": parseHexToKeyMap(hw.get_language(), hw.get_private_postfix(1, 0)),
      "msr-iso3-prefix": parseHexToKeyMap(hw.get_language(), hw.get_private_prefix(2, 0)),
      "msr-iso3-suffix": parseHexToKeyMap(hw.get_language(), hw.get_private_postfix(2, 0)),
      "ibutton-key-prefix": parseHexToKeyMap(hw.get_language(), hw.get_prefix_ibutton()),
      "ibutton-key-suffix": parseHexToKeyMap(hw.get_language(), hw.get_postfix_ibutton()),
      "ibutton-remove-key": parseHexToKeyMap(hw.get_language(), hw.get_ibutton_remove()),
      "ibutton-remove-prefix": parseHexToKeyMap(hw.get_language(), hw.get_prefix_ibutton_remove()),
      "ibutton-remove-suffix": parseHexToKeyMap(hw.get_language(), hw.get_postfix_ibutton_remove()),
    };

    setState((prev) => ({
      ...prev,
      config: newConfig,
      keyMaps: keyMaps,
      deviceName: hw.get_name() || "Unknown Hardware",
      deviceFirmware: hw.get_system_version_by_string() || "Unknown",
      deviceUid: hw.get_uid() || "Unknown",
    }));
  };

  const onDisconnect = async () => {
    if (g_ctl) {
      try{
        await g_ctl.close_with_promise();
      }
      catch(e){
        //console.warn("Hardware close failed, proceeding with cleanup.", e);
      }
      g_ctl = null;
      g_lpu_device = null;
    }
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.DISCONNECTED,
      devicePath: "",
      deviceUid: "", // Reset device UID
      deviceName: "", // Reset device name
      deviceFirmware: "", // Reset firmware version
      activeTab: "device",
      keyMaps: {}, // Clear key maps
      logs: [...prev.logs, "Disconnected."],
    }));
    showNotification('Device disconnected', 'info');
  };

  const onDisconnectServer = async () => {
    if (g_ctl) {
      try{
        await g_ctl.close_with_promise();
      }
      catch(e){
        //console.warn("Hardware close failed during server disconnect, proceeding.", e);
      }
      g_ctl = null;
      g_lpu_device = null;
    }
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.DISCONNECTED,
      devicePath: "",
      deviceUid: "",
      deviceName: "",
      deviceFirmware: "",
      activeTab: "device",
      logs: [...prev.logs, "Disconnected."],
    }));

    try{
      await g_coffee.disconnect();
    }
    catch(e){
      //console.warn("Server disconnect failed.", e);
    }

    setState((prev) => ({
      ...prev,
      serverStatus: ConnectionStatus.DISCONNECTED,
      devicePaths: [],
      logs: [...prev.logs, "Server link closed."],
    }));
  };


  /**
   * Firmware update progress callback.
   * Updates UI loading overlay with current byte transfer status.
   */
  const _cb_progress_fw_copy = (b_result: boolean, n_progress: number, n_file_size: number, s_message: string) => {
    if (!b_result) {
      addLog(`Firmware transfer error: ${s_message}`);
      setState(prev => ({ ...prev, loading: null }));
      showNotification('Firmware transfer failed', 'error');
      return;
    }

    if( n_progress > 0 && n_progress === n_file_size ){
      addLog(`Firmware successfully uploaded to server cache (${n_file_size} bytes).`);
      setState(prev => ({ ...prev, loading: null }));
      showNotification('Firmware upload complete', 'success');
    } else {
      // Show progress in UI overlay
      setState(prev => ({
        ...prev,
        loading: {
          current: n_progress,
          total: n_file_size,
          message: `Transferring ROM to server: ${Math.round((n_progress / n_file_size) * 100)}%`
        }
      }));
    }
  };

  return {
    initializeSystem: () => {
      if (typeof (window as any).cf2_initialize === "function") {
        (window as any).cf2_initialize();
      }
      // Re-assign the global cleanup callback on initialization
      // This ensures it points to the most recent closure's handlers even if StrictMode re-mounts.
      g_force_cleanup = () => {
        addLog("Device removal detected. Auto-disconnecting...");
        onDisconnectServer(); // This also triggers device disconnect
      };

      g_refresh_device_list = async () => {
        try {
          if (g_coffee.get_session_number()) {
            const dev_list = await g_coffee.get_device_list(
              "hid#vid_134b&pid_0206&mi_01",
            );

            let filtered_list:string[] = [];

            if(Array.isArray(dev_list) ){
              if(dev_list.length > 0){
                filtered_list = dev_list.filter(
                (str) => !/&(ibutton|msr|(scr|switch)\d+)$/.test(str),
              );
              }
            }
            setState(prev => ({ ...prev, devicePaths: filtered_list }));
          }
        } catch (e) {
          console.error("Refresh device list failed", e);
        }
      };
      addLog("System components initialized.");
    },

    uninitializeSystem: () => {
      if (typeof (window as any).cf2_uninitialize === "function") {
        (window as any).cf2_uninitialize();
      }
      g_force_cleanup = null;
      g_refresh_device_list = null;
    },

    onConnect: async (path: string) => {
      addLog(`Connecting to device: ${path}`);
      setState((prev) => ({
        ...prev,
        loading: {
          current: 0,
          total: 100,
          message: "Opening device channel...",
        },
      }));

      try {
        if (!path) {
          addLog("Connection Aborted: No path provided.");
          setState((prev) => ({ ...prev, loading: null }));
          return;
        }

        g_lpu_device = new lpu237(path);
        g_ctl = new ctl_lpu237(g_coffee, g_lpu_device);

        await g_ctl.open_with_promise();
        await g_ctl.load_min_parameter_from_device_with_promise();

        await g_ctl.load_all_parameter_from_device_with_promise(
          (idx, total, cur) => {
            setState((prev) => ({
              ...prev,
              loading: {
                current: cur,
                total: total,
                message: `Syncing registers (${cur}/${total})`,
              },
            }));
          },
        );

        const hw = g_lpu_device;
        let type = DeviceType.MSR_IBUTTON;
        const dt = hw.get_device_function();
        if (dt === type_function.fun_msr) type = DeviceType.MSR;
        else if (dt === type_function.fun_ibutton) type = DeviceType.IBUTTON;

        setState((prev) => ({
          ...prev,
          status: ConnectionStatus.CONNECTED,
          devicePath: path,
          deviceType: type,
          loading: null,
          logs: [...prev.logs, `Hardware ready: ${hw.get_name()}`],
        }));

         _syncHardwareToState(hw);
         showNotification(`Connected to ${hw.get_name()}`, 'success');
      } catch (error: any) {
        addLog(`Error: ${error.message}`);
        g_ctl = null;
        g_lpu_device = null;
        setState((prev) => ({ ...prev, loading: null }));
        showNotification('Connection failed', 'error');
      }
    },

    onDisconnect,

    onConnectServer: async (url: string) => {
      addLog(`Server link: ${url}`);
      try {
        const urlObj = new URL(url);
        const s_session_number = await g_coffee.connect(urlObj.protocol.replace(":", ""), urlObj.port);
        if(typeof s_session_number !== "string"){
          throw Error("fail connects server.");
        }
        addLog('Session number:${s_session_number}');

        const dev_list = await g_coffee.get_device_list(
          "hid#vid_134b&pid_0206&mi_01",
        );

        let filtered_list:string[] = [];

        if(Array.isArray(dev_list) ){
          if(dev_list.length > 0){
            filtered_list = dev_list.filter(
            (str) => !/&(ibutton|msr|(scr|switch)\d+)$/.test(str),
          );
          }
        }

        setState((prev) => ({
          ...prev,
          serverStatus: ConnectionStatus.CONNECTED,
          devicePaths: filtered_list,
          logs: [...prev.logs, `Server link established.`],
        }));
      } catch (error: any) {
        addLog(`Link failure: ${error.message}`);
        showNotification('Server connection failed(connects a device)', 'error');
      }
    },

    onDisconnectServer,

    onApply: async () => {
      if (!g_lpu_device || !g_ctl) return;

      const cur_status = stateRef.current; //최신 state 확보

      setState((prev) => ({
        ...prev,
        loading: { current: 0, total: 100, message: "Saving parameters..." },
      }));
      try {
        const hw = g_lpu_device;
        hw.set_interface_by_string(cur_status.config.interface);
        hw.set_language_index_by_string(cur_status.config.language);
        hw.set_buzzer_count_by_boolean(cur_status.config.buzzer);
        hw.set_global_pre_postfix_send_condition_by_string(cur_status.config.msrGlobalSendCondition);
        hw.set_order_by_string(cur_status.config.msrTrackOrder);
        hw.set_enable_iso_read(cur_status.config.msrEnableISO1,cur_status.config.msrEnableISO2,cur_status.config.msrEnableISO3);
        hw.set_direction_read_by_string(cur_status.config.msrDirection);
        hw.set_ibutton_range(cur_status.config.ibuttonRangeStart,cur_status.config.ibuttonRangeEnd );

        //blank part
        hw.set_success_indicate_when_one_more_track_is_normal_by_string(cur_status.config.msrSuccessIndCondition);
        hw.set_mmd1100_reset_interval_by_string(cur_status.config.msrResetInterval);
        hw.set_ibutton_mode_by_string(cur_status.config.ibuttonMode);

        _set_ui_tag_to_device(cur_status,"msr-global-prefix");
        _set_ui_tag_to_device(cur_status,"msr-global-suffix");
        _set_ui_tag_to_device(cur_status,"msr-iso1-prefix");
        _set_ui_tag_to_device(cur_status,"msr-iso1-suffix");
        _set_ui_tag_to_device(cur_status,"msr-iso2-prefix");
        _set_ui_tag_to_device(cur_status,"msr-iso2-suffix");
        _set_ui_tag_to_device(cur_status,"msr-iso3-prefix");
        _set_ui_tag_to_device(cur_status,"msr-iso3-suffix");

        _set_ui_tag_to_device(cur_status,"ibutton-key-prefix");
        _set_ui_tag_to_device(cur_status,"ibutton-key-suffix");
        _set_ui_tag_to_device(cur_status,"ibutton-remove-key");
        _set_ui_tag_to_device(cur_status,"ibutton-remove-prefix");
        _set_ui_tag_to_device(cur_status,"ibutton-remove-suffix");
        //
        // start saving
        await g_ctl.save_parameter_to_device_with_promise((idx, total, cur) => {
          setState((prev) => ({
            ...prev,
            loading: {
              current: cur,
              total: total,
              message: `Writing registers (${cur}/${total})`,
            },
          }));
        });
        setState((prev) => ({
          ...prev,
          loading: null,
          logs: [...prev.logs, "Settings applied successfully."],
        }));
        showNotification('Settings applied successfully', 'success');
      } catch (error: any) {
        addLog(`Apply failed: ${error.message}`);
        setState((prev) => ({ ...prev, loading: null }));
        showNotification('Failed to apply settings', 'error');
      }
    },

    onClearLogs: () => setState((prev) => ({ ...prev, logs: [] })),

    config: {
      onInterfaceChange: (v: string) => updateSetting("interface", v),
      onBuzzerChange: (v: boolean) => updateSetting("buzzer", v),
      onLanguageChange: (v: string) => updateSetting("language", v),
      onIButtonModeChange: (v: string) => updateSetting("ibuttonMode", v),
      onIButtonRangeStartChange: (v: number) => {
        const s = clamp(v, 0, 15);
        setState((prev) => ({
          ...prev,
          config: {
            ...prev.config,
            ibuttonRangeStart: s,
            ibuttonRangeEnd: Math.max(s, prev.config.ibuttonRangeEnd),
          },
        }));
      },
      onIButtonRangeEndChange: (v: number) => {
        const e = clamp(v, 0, 15);
        setState((prev) => ({
          ...prev,
          config: {
            ...prev.config,
            ibuttonRangeEnd: e,
            ibuttonRangeStart: Math.min(e, prev.config.ibuttonRangeStart),
          },
        }));
      },
      onMsrDirectionChange: (v: string) => updateSetting("msrDirection", v),
      onMsrTrackOrderChange: (v: string) => updateSetting("msrTrackOrder", v),
      onMsrResetIntervalChange: (v: string) =>
        updateSetting("msrResetInterval", v),
      onMsrISO1Toggle: (v: boolean) => updateSetting("msrEnableISO1", v),
      onMsrISO2Toggle: (v: boolean) => updateSetting("msrEnableISO2", v),
      onMsrISO3Toggle: (v: boolean) => updateSetting("msrEnableISO3", v),
      onMsrGlobalSendConditionChange: (v: string) =>
        updateSetting("msrGlobalSendCondition", v),
      onMsrSuccessIndConditionChange: (v: string) =>
        updateSetting("msrSuccessIndCondition", v),
    },

    onLoadSettings: async (file: File) => {
      if (!g_lpu_device) {
        addLog("Error: Device not connected. Settings cannot be loaded without an active device instance.");
        showNotification('Connect device first', 'error');
        return;
      }
      addLog(`Loading configuration from file: ${file.name}`);
      try {
        const success = await g_lpu_device.set_from_file(file);
        if (success) {
          _syncHardwareToState(g_lpu_device);
          addLog("Settings successfully read and reflected in UI.");
          showNotification('Configuration loaded successfully', 'success');
        } else {
          addLog("Failed to parse settings file. Please check XML format.");
          showNotification('Invalid XML format', 'error');
        }
      } catch (e: any) {
        addLog(`File Load Error: ${e.message}`);
      }
    },

    onLoadFirmware: (file: File) => {
      if (!file) return;
      
      addLog(`Initiating firmware transfer: ${file.name}`);
      
      // Initialize loading state for transfer
      setState(prev => ({
        ...prev,
        loading: {
          current: 0,
          total: file.size,
          message: 'Starting firmware upload to server...'
        }
      }));

      // Call library to perform chunked file transfer to server's firmware cache
      // 10*1024 is the default packet size for transfer
      const n_packet_size = 10*1024; //10K bytes
      g_coffee.file_Copy_firmware_callback(file, n_packet_size, _cb_progress_fw_copy);
    },

    onDownloadSettings: () => {
      if(!g_lpu_device){
        addLog("Error: Device not connected. Cannot download settings.");
        showNotification('Connect device first', 'error');
        return;
      }

      const fileNameFromState = stateRef.current.exportFileName;
      const sanitizedName = fileNameFromState.trim() || "lpu237_settings.xml";
      // Ensure it ends with .xml for consistency
      const finalName = sanitizedName.toLowerCase().endsWith(".xml") ? sanitizedName : sanitizedName + ".xml";

      addLog(`Starting settings download to ${finalName}...`);
      g_lpu_device.save_to_file(finalName)
          .then((success) => {
            if (success) {
              addLog(`Settings saved successfully as ${finalName}.`);
              showNotification('Download complete', 'success');
            } else {
              addLog("Failed to save settings. This may be restricted by your browser in a preview environment.");
              showNotification('Download failed', 'error');
            }
          })
          .catch((err) => {
            addLog(`Download Error: ${err.message}`);
            showNotification('Download error', 'error');
          })
          .finally(() => {
          });
    },
  };
};
