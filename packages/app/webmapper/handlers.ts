// Fix for line 22: Import React to provide the React namespace for Dispatch and SetStateAction types
import React from "react";
import {
  AppState,
  ConnectionStatus,
  DeviceType,
  DeviceConfig,
  KeyMapEntry,
} from "./types";
import { coffee } from "@lib/elpusk.framework.coffee";
import {
  lpu237,
  type_function,
  type_system_interface,
  type_keyboard_language_index,
  type_direction,
} from "@lib/elpusk.device.usb.hid.lpu237";
import { ctl_lpu237 } from "@lib/elpusk.framework.coffee.ctl_lpu237";
import * as elpusk_util_keyboard_map from "@lib/elpusk.util.keyboard.map";

// Global instances for library management
let g_coffee = coffee.get_instance();
let g_lpu_device: lpu237 | null = null;
let g_ctl: ctl_lpu237 | null = null;

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

const HID_REVERSE_MAP: Record<string, string> = {
  "04": "A",
  "05": "B",
  "06": "C",
  "07": "D",
  "08": "E",
  "09": "F",
  "0a": "G",
  "0b": "H",
  "0c": "I",
  "0d": "J",
  "0e": "K",
  "0f": "L",
  "10": "M",
  "11": "N",
  "12": "O",
  "13": "P",
  "14": "Q",
  "15": "R",
  "16": "S",
  "17": "T",
  "18": "U",
  "19": "V",
  "1a": "W",
  "1b": "X",
  "1c": "Y",
  "1d": "Z",
  "1e": "1",
  "1f": "2",
  "20": "3",
  "21": "4",
  "22": "5",
  "23": "6",
  "24": "7",
  "25": "8",
  "26": "9",
  "27": "0",
  "28": "Enter",
  "29": "Esc",
  "2a": "Bksp",
  "2b": "Tab",
  "2c": "Space",
  "2d": "-",
  "2e": "=",
  "2f": "[",
  "30": "]",
  "31": "\\",
  "33": ";",
  "34": "'",
  "35": "`",
  "36": ",",
  "37": ".",
  "38": "/",
  "3a": "F1",
  "3b": "F2",
  "3c": "F3",
  "3d": "F4",
  "3e": "F5",
  "3f": "F6",
  "40": "F7",
  "41": "F8",
  "42": "F9",
  "43": "F10",
  "44": "F11",
  "45": "F12",
};

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
    const code = c_code.toString(16).padStart(2, "0").toLowerCase();

    entries.push({
      id: Date.now() + Math.random(), // Unique ID for table mapping
      shift: (c_mod & 0x02) !== 0,
      ctrl: (c_mod & 0x01) !== 0,
      alt: (c_mod & 0x04) !== 0,
      keyValue: `[${HID_REVERSE_MAP[code] || code}] key`,
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
  if (typeof s_action_code === "undefined") return;

  if (s_action_code === "c") {
    ++g_n_system_event;
    if (g_ctl && g_ctl.get_device()) {
      for (let i = 0; i < s_data_field.length; i++) {
        if (g_ctl.get_device().get_path() === s_data_field[i]) {
          g_ctl = null;
          g_n_opened_device_index = 0;
          break;
        }
      }
    }
  }
}

(window as any).cf2_initialize = () => {
  coffee.set_system_event_handler(_cb_system_event);
};

(window as any).cf2_uninitialize = () => {};

export const createHandlers = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void,
) => {
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

  return {
    initializeSystem: () => {
      if (typeof (window as any).cf2_initialize === "function") {
        (window as any).cf2_initialize();
      }
      addLog("System components initialized.");
    },

    uninitializeSystem: () => {
      if (typeof (window as any).cf2_uninitialize === "function") {
        (window as any).cf2_uninitialize();
      }
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
          "msr-global-prefix": parseHexToKeyMap(hw.get_language(),hw.get_global_prefix()),
          "msr-global-suffix": parseHexToKeyMap(hw.get_language(),hw.get_global_postfix()),
          "msr-iso1-prefix": parseHexToKeyMap(hw.get_language(),hw.get_private_prefix(0, 0)),
          "msr-iso1-suffix": parseHexToKeyMap(hw.get_language(),hw.get_private_postfix(0, 0)),
          "msr-iso2-prefix": parseHexToKeyMap(hw.get_language(),hw.get_private_prefix(1, 0)),
          "msr-iso2-suffix": parseHexToKeyMap(hw.get_language(),hw.get_private_postfix(1, 0)),
          "msr-iso3-prefix": parseHexToKeyMap(hw.get_language(),hw.get_private_prefix(2, 0)),
          "msr-iso3-suffix": parseHexToKeyMap(hw.get_language(),hw.get_private_postfix(2, 0)),
          "ibutton-key-prefix": parseHexToKeyMap(hw.get_language(),hw.get_prefix_ibutton()),
          "ibutton-key-suffix": parseHexToKeyMap(hw.get_language(),hw.get_postfix_ibutton()),
          "ibutton-remove-key": parseHexToKeyMap(hw.get_language(),hw.get_ibutton_remove()),
          "ibutton-remove-prefix": parseHexToKeyMap(
            hw.get_language(),
            hw.get_prefix_ibutton_remove(),
          ),
          "ibutton-remove-suffix": parseHexToKeyMap(
            hw.get_language(),
            hw.get_postfix_ibutton_remove(),
          ),
        };

        let type = DeviceType.MSR_IBUTTON;
        const dt = hw.get_device_function();
        if (dt === type_function.fun_msr) type = DeviceType.MSR;
        else if (dt === type_function.fun_ibutton) type = DeviceType.IBUTTON;

        setState((prev) => ({
          ...prev,
          status: ConnectionStatus.CONNECTED,
          devicePath: path,
          deviceUid: hw.get_uid() || "Unknown", // Store device UID
          deviceType: type,
          config: newConfig,
          keyMaps: keyMaps, // Populate the UI key maps from hardware
          loading: null,
          logs: [...prev.logs, `Hardware ready: ${hw.get_name()}`],
        }));
      } catch (error: any) {
        addLog(`Error: ${error.message}`);
        g_ctl = null;
        g_lpu_device = null;
        setState((prev) => ({ ...prev, loading: null }));
      }
    },

    onDisconnect: async () => {
      if (g_ctl) {
        await g_ctl.close_with_promise();
        g_ctl = null;
        g_lpu_device = null;
      }
      setState((prev) => ({
        ...prev,
        status: ConnectionStatus.DISCONNECTED,
        devicePath: "",
        deviceUid: "", // Reset device UID
        activeTab: "device",
        keyMaps: {}, // Clear key maps
        logs: [...prev.logs, "Disconnected."],
      }));
    },

    onConnectServer: async (url: string) => {
      addLog(`Server link: ${url}`);
      try {
        const urlObj = new URL(url);
        await g_coffee.connect(urlObj.protocol.replace(":", ""), urlObj.port);
        const dev_list = await g_coffee.get_device_list(
          "hid#vid_134b&pid_0206&mi_01",
        );
        const filtered_list = dev_list.filter(
          (str) => !/&(ibutton|msr|(scr|switch)\d+)$/.test(str),
        );

        setState((prev) => ({
          ...prev,
          serverStatus: ConnectionStatus.CONNECTED,
          devicePaths: filtered_list,
          logs: [...prev.logs, `Server link established.`],
        }));
      } catch (error: any) {
        addLog(`Link failure: ${error.message}`);
      }
    },

    onDisconnectServer: async () => {
      if (g_ctl) {
        await g_ctl.close_with_promise();
        g_ctl = null;
        g_lpu_device = null;
      }
      setState((prev) => ({
        ...prev,
        status: ConnectionStatus.DISCONNECTED,
        devicePath: "",
        deviceUid: "", // Reset device UID
        activeTab: "device",
        logs: [...prev.logs, "Disconnected."],
      }));

      await g_coffee.disconnect();
      setState((prev) => ({
        ...prev,
        serverStatus: ConnectionStatus.DISCONNECTED,
        devicePaths: [],
        logs: [...prev.logs, "Server link closed."],
      }));
    },

    onApply: async () => {
      if (!g_lpu_device || !g_ctl) return;
      setState((prev) => ({
        ...prev,
        loading: { current: 0, total: 100, message: "Saving parameters..." },
      }));
      try {
        const ui = state.config;
        const hw = g_lpu_device;
        hw.set_interface_by_string(ui.interface);
        hw.set_language_index_by_string(ui.language);
        hw.set_buzzer_count(ui.buzzer ? 26000 : 5000);
        hw.set_global_pre_postfix_send_condition(
          ui.msrGlobalSendCondition === "No Error in all tracks",
        );
        hw.set_order(ui.msrTrackOrder.split("").map((c) => parseInt(c) - 1));
        for (let i = 0; i < 3; i++) {
          hw.set_enable_iso(
            i,
            i === 0
              ? ui.msrEnableISO1
              : i === 1
                ? ui.msrEnableISO2
                : ui.msrEnableISO3,
          );
          hw.set_direction_by_string(i, ui.msrDirection);
        }
        const blank = hw.get_blank();
        if (ui.msrSuccessIndCondition === "One more track is normal")
          blank[1] |= 0x01;
        else blank[1] &= ~0x01;
        blank[1] =
          (blank[1] & 0x0f) |
          (parseInt(ui.msrResetInterval.split("(")[0]) & 0xf0);
        blank[2] =
          (blank[2] & 0xf0) | (IBUTTON_MODE_MAP[ui.ibuttonMode] & 0x0f);
        hw.set_blank(blank);

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
      } catch (error: any) {
        addLog(`Apply failed: ${error.message}`);
        setState((prev) => ({ ...prev, loading: null }));
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

    onLoadSettings: (n: string) => addLog(`Loading config: ${n}`),
    onLoadFirmware: (n: string) => addLog(`Loading ROM: ${n}`),
    onDownloadSettings: () => {
      const blob = new Blob([JSON.stringify(state.config)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "config.json";
      a.click();
    },
  };
};
