
// Fix for line 22: Import React to provide the React namespace for Dispatch and SetStateAction types
import React from 'react';
import { AppState, ConnectionStatus, DeviceType, DeviceConfig } from './types';
import { coffee } from '@lib/elpusk.framework.coffee';
import { lpu237, type_function, type_system_interface, type_keyboard_language_index, type_direction } from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 } from '@lib/elpusk.framework.coffee.ctl_lpu237';


// Global instances for library management
let g_coffee = coffee.get_instance();
let g_lpu_device: lpu237 | null = null;
let g_ctl: ctl_lpu237 | null = null;


/**
 * MAPPING HELPERS: HW <-> UI
 */

const INTERFACE_MAP: Record<string, number> = {
  'USB keyboard mode': type_system_interface.system_interface_usb_keyboard,
  'USB HID Vendor mode': type_system_interface.system_interface_usb_msr,
  'RS232 mode': type_system_interface.system_interface_uart
};

const LANGUAGE_LIST = [
  'USA English', 'Spanish', 'Danish', 'French', 'German', 'Italian', 'Norwegian', 'Swedish', 'UK English', 'Herbrew', 'Turkiye'
];

const IBUTTON_MODE_MAP: Record<string, number> = {
  'zero-16 times': 0x00,
  'F12': 0x01,
  'zero-7 times': 0x04,
  'Code stick protocol': 0x08,
  'user definition': 0x02
};


/**
 * GLOBAL SYSTEM HANDLERS
 */
let g_n_system_event = 0;
let g_n_opened_device_index = 0;

function _cb_system_event( s_action_code:any,s_data_field:any ){
    do{
        if( typeof s_action_code === 'undefined'){
            continue;
        }

        if( s_action_code === "c"){
            //removed event
            ++g_n_system_event;
            
            do{
                if( s_data_field.length <= 0 ){
                    continue;
                }
                if( !g_ctl ){
                    continue;
                }
                if( !g_ctl.get_device() ){
                    continue;
                }

                for( var i = 0; i<s_data_field.length; i++  ){
                    if( g_ctl.get_device().get_path() === s_data_field[i] ){
                        //remove object
                        g_ctl = null;
                        g_n_opened_device_index = 0;
                        /*
                        tools_dom_remove_connected_device_page();
                        // don't call promise function here while upates firmware.
                        // promise function will change a callback function.
                        // this will be problemed.
                        if( !g_b_updating )
                            tools_dom_update_device_list_with_promise( g_array_device_list );
                        */
                        break;//exit for
                    }
                }//end for
                
            }while(false);
            
        }
        if( s_action_code === "P"){
            //plugged in event
            ++g_n_system_event;
            //printMessage_pre("system event [" + g_n_system_event.toString() + "] : plugged in : " + s_data_field );
            //tools_dom_update_device_list_with_promise( g_array_device_list );
            continue;
        }
        //

    }while(false);
}

(window as any).cf2_initialize = () => {
  // Entry point for library initialization if needed
  coffee.set_system_event_handler(_cb_system_event);
};

(window as any).cf2_uninitialize = () => {
  // Cleanup
};

export const createHandlers = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void
) => {
  const updateSetting = (key: keyof DeviceConfig, value: any, label?: string) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value },
      logs: [...prev.logs, `Update: ${label || key} set to ${value}`]
    }));
  };

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  return {
    initializeSystem: () => {
      if (typeof (window as any).cf2_initialize === 'function') {
        (window as any).cf2_initialize();
      }
      addLog('System components initialized.');
    },

    uninitializeSystem: () => {
      if (typeof (window as any).cf2_uninitialize === 'function') {
        (window as any).cf2_uninitialize();
      }
    },

    onConnect: async (path: string) => {
      addLog(`Connecting to device at path: ${path}`);
      
      setState(prev => ({ 
        ...prev, 
        loading: { current: 0, total: 100, message: 'Scanning for devices...' } 
      }));

      // REAL INTEGRATION POINT:
      // In your library version, call navigator.hid.requestDevice() 
      // or use your @lib DeviceManager to establish a real connection.
      try{
        let s_result : string = "";

        if (!path) {
          addLog("Connection Aborted: No device path selected.");
          setState(prev => ({ ...prev, loading: null }));
          return;
        }
        // Create the LPU device instance using the selected path string
        g_lpu_device = new lpu237(path);
        // Create the controller instance
        g_ctl = new ctl_lpu237(g_coffee, g_lpu_device);      
        
        // Requirement: Open the equipment corresponding to the selected device path
        setState(prev => ({ ...prev, loading: { ...prev.loading!, message: 'Opening communication channel...' } }));
        addLog("Opening communication channel...");
        s_result = await g_ctl.open_with_promise();
        addLog(`the result of open_with_promise ${s_result}`);

        // Requirement: Read basic information from the opened equipment
        setState(prev => ({ ...prev, loading: { ...prev.loading!, message: 'Retrieving hardware identity...' } }));        
        addLog("Retrieving basic hardware information...");
        s_result = await g_ctl.load_min_parameter_from_device_with_promise();
        addLog(`Identity Verified: ${g_lpu_device.get_name() || 'LPU Device'}`);

        // Requirement: Read all information with progress tracking
        addLog("Syncing full configuration registry...");
        await g_ctl.load_all_parameter_from_device_with_promise(
          (n_idx, n_total, n_current) => {
            setState(prev => ({
              ...prev,
              loading: {
                current: n_current,
                total: n_total,
                message: `Retrieving system parameters...`
              }
            }));
          }
        );
        addLog("Hardware parameters synchronized.");


        // Apply hardware parameters to UI state (CommonTab)
        const hw = g_lpu_device;
        const currentInterface = Object.keys(INTERFACE_MAP).find(k => INTERFACE_MAP[k] === hw.get_interface()) || 'USB keyboard mode';
        const currentLanguage = LANGUAGE_LIST[hw.get_language()] || 'USA English';
        
        const currentBlank = hw.get_blank(); // Assuming this is the 4-byte array
        const currentIButtonMode = Object.keys(IBUTTON_MODE_MAP).find(k => IBUTTON_MODE_MAP[k] === (currentBlank[2] & 0x0F)) || 'zero-16 times';
        const currentResetInterval = hw.get_mmd1100_reset_interval();
        const isAnyTrackNormalSuccess = hw.get_indicate_success_when_any_not_error();
        const ar_range = hw.get_ibutton_range();

        const newConfig: DeviceConfig = {
          interface: currentInterface,
          buzzer: hw.get_buzzer_count() > 5000, 
          language: currentLanguage,
          ibuttonMode: currentIButtonMode,
          ibuttonRangeStart: ar_range[0], 
          ibuttonRangeEnd: ar_range[1],
          msrDirection: hw.get_direction_string(0),
          msrTrackOrder: hw.get_track_order().map(n => n + 1).join(''),
          msrResetInterval: hw.get_mmd1100_reset_interval_string(currentResetInterval,true),
          msrEnableISO1: hw.get_enable_iso(0),
          msrEnableISO2: hw.get_enable_iso(1),
          msrEnableISO3: hw.get_enable_iso(2),
          msrGlobalSendCondition: hw.get_global_pre_postfix_send_condition() ? 'No Error in all tracks' : 'One more track is normal',
          msrSuccessIndCondition: isAnyTrackNormalSuccess ? 'One more track is normal' : 'No Error in all tracks',
        };

        // Determine DeviceType for UI Logic based on the path string
        let type = DeviceType.MSR_IBUTTON;

        const dt = g_lpu_device.get_device_function();
        switch(dt){
          case type_function.fun_msr_ibutton:
            break;
          case type_function.fun_msr:
            type = DeviceType.MSR;
            break;
          case type_function.fun_ibutton:
            type = DeviceType.IBUTTON;
            break;
          default:
            throw new Error("unknown device type");
        }//end switch

        setState(prev => ({
          ...prev,
          status: ConnectionStatus.CONNECTED,
          devicePath: path,
          deviceType: type,
          config: newConfig,
          loading: null,
          logs: [...prev.logs, `Device connected via library: ${path}`]
        }));
      } catch (error: any) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        addLog(`Connection Failure: ${errorMsg}`);
        console.error("Connect sequence error:", error);
        
        g_ctl = null;
        g_lpu_device = null;
        setState(prev => ({ ...prev, loading: null }));
      }

    },

    onDisconnect: async () => {
      addLog('Closing device connection...');
      try{
        if( !g_ctl ){
          addLog('None device control object.');
          return;
        }

        const s_result = await g_ctl.close_with_promise();
        addLog(`Closing result: ${s_result}`);
        g_ctl = null;
        g_lpu_device = null;

      } catch (error: any) {

      }
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.DISCONNECTED,
        devicePath: '',
        activeTab: 'device',
        logs: [...prev.logs, 'Device session ended.']
      }));
    },

    onConnectServer: async (url: string) => {
      addLog(`Connecting to global server: ${url}`);
      try {
        // Parse URL for coffee.connect (Expects ws/wss and port separately)
        const urlObj = new URL(url);
        const protocol = urlObj.protocol.replace(':', '');
        const port = urlObj.port;
        
        const sessionId = await g_coffee.connect(protocol, port);
        let dev_list : string[];
        let filtered_list : string[];
        try {
            dev_list = await g_coffee.get_device_list("hid#vid_134b&pid_0206&mi_01");

            filtered_list = dev_list.filter(str => {
                // 끝이 &ibutton 또는 &msr 로 끝나는 경우
                // 또는 &scr 또는 &switch 뒤에 숫자가 1개 이상 오는 경우
                return !/&(ibutton|msr|(scr|switch)\d+)$/.test(str);
            });            
        }
        catch (error: any) {
          addLog(`get device list failure: ${error.message}`);
        }

        setState(prev => ({
          ...prev,
          serverStatus: ConnectionStatus.CONNECTED,
          devicePaths: filtered_list, // Clear paths on initial connect
          logs: [...prev.logs, `Successfully established link with ${url}, session id ${sessionId}`]
        }));


      } catch (error: any) {
        addLog(`Server link failure: ${error.message}`);
      }
    },

    onDisconnectServer: async () => {
      addLog('Terminating global server connection...');
      try {
        const sessionId = await g_coffee.disconnect();
        addLog(`disconnected OK, session id ${sessionId}`);
        setState(prev => ({
          ...prev,
          serverStatus: ConnectionStatus.DISCONNECTED,
          devicePaths: [], // Clear paths on disconnect
          logs: [...prev.logs, 'Server link closed.']
        }));
      } catch (e) {
        console.error("Error during server disconnect:", e);
      }
     
    },

    onApply: async () => {
      if (!g_lpu_device || !g_ctl) {
        addLog('Error: No device connection available for Apply.');
        return;
      }

      addLog('Uploading configuration to hardware...');
      setState(prev => ({ ...prev, loading: { current: 0, total: 100, message: 'Writing registers...' } }));

      try {
        const ui = state.config;
        const hw = g_lpu_device;

        // Push UI settings back to LPU237 instance using its set_x methods
        hw.set_interface(INTERFACE_MAP[ui.interface] as any);
        hw.set_language_index(LANGUAGE_LIST.indexOf(ui.language) as any);
        hw.set_buzzer_count(ui.buzzer ? 26000 : 5000);
        
        hw.set_global_pre_postfix_send_condition(ui.msrGlobalSendCondition === 'No Error in all tracks');
        hw.set_order(ui.msrTrackOrder.split('').map(c => parseInt(c) - 1));
        
        for (let i = 0; i < 3; i++) {
          const isEnabled = i === 0 ? ui.msrEnableISO1 : i === 1 ? ui.msrEnableISO2 : ui.msrEnableISO3;
          hw.set_enable_iso(i, isEnabled);
          hw.set_direction_by_string(i, ui.msrDirection);
        }

        // Handle composite bits in blank registers
        const blank = hw.get_blank(); 
        // Success condition bit 0 of blank[1]
        if (ui.msrSuccessIndCondition === 'One more track is normal') blank[1] |= 0x01;
        else blank[1] &= ~0x01;
        
        // Reset interval bits 4-7 of blank[1]
        const intervalValue = parseInt(ui.msrResetInterval.split('(')[0]);
        blank[1] = (blank[1] & 0x0F) | (intervalValue & 0xF0);

        // iButton mode bits 0-3 of blank[2]
        const iMode = IBUTTON_MODE_MAP[ui.ibuttonMode];
        blank[2] = (blank[2] & 0xF0) | (iMode & 0x0F);
        
        hw.set_blank(blank);

        // Commit changes to hardware non-volatile memory
        await g_ctl.save_parameter_to_device_with_promise((n, total, cur) => {
          setState(prev => ({
            ...prev,
            loading: {
              current: cur,
              total: total,
              message: `Updating hardware registry (${cur}/${total})...`
            }
          }));
        });

        addLog('Apply Success: Hardware settings persistent.');
        setState(prev => ({ ...prev, loading: null }));
      } catch (error: any) {
        addLog(`Apply Failure: ${error.message}`);
        setState(prev => ({ ...prev, loading: null }));
      }
    },

    onClearLogs: () => {
      setState(prev => ({ ...prev, logs: [] }));
    },

    config: {
      onInterfaceChange: (val: string) => updateSetting('interface', val, 'Interface Mode'),
      onBuzzerChange: (val: boolean) => updateSetting('buzzer', val, 'Buzzer State'),
      onLanguageChange: (val: string) => updateSetting('language', val, 'Keyboard Language'),
      onIButtonModeChange: (val: string) => updateSetting('ibuttonMode', val, 'i-Button Mode'),
      onIButtonRangeStartChange: (val: number) => {
        const clampedStart = clamp(val, 0, 15);
        setState(prev => {
          const currentEnd = prev.config.ibuttonRangeEnd;
          const newEnd = Math.max(clampedStart, currentEnd);
          const logs = [...prev.logs, `Update: i-Button Range Start set to ${clampedStart}`];
          if (newEnd !== currentEnd) logs.push(`Update: i-Button Range End auto-adjusted to ${newEnd}`);
          return { ...prev, config: { ...prev.config, ibuttonRangeStart: clampedStart, ibuttonRangeEnd: newEnd }, logs };
        });
      },
      onIButtonRangeEndChange: (val: number) => {
        const clampedEnd = clamp(val, 0, 15);
        setState(prev => {
          const currentStart = prev.config.ibuttonRangeStart;
          const newStart = Math.min(clampedEnd, currentStart);
          const logs = [...prev.logs, `Update: i-Button Range End set to ${clampedEnd}`];
          if (newStart !== currentStart) logs.push(`Update: i-Button Range Start auto-adjusted to ${newStart}`);
          return { ...prev, config: { ...prev.config, ibuttonRangeStart: newStart, ibuttonRangeEnd: clampedEnd }, logs };
        });
      },
      onMsrDirectionChange: (val: string) => updateSetting('msrDirection', val, 'MSR Direction'),
      onMsrTrackOrderChange: (val: string) => updateSetting('msrTrackOrder', val, 'MSR Track Order'),
      onMsrResetIntervalChange: (val: string) => updateSetting('msrResetInterval', val, 'MSR Reset Interval'),
      onMsrISO1Toggle: (val: boolean) => updateSetting('msrEnableISO1', val, 'ISO Track 1'),
      onMsrISO2Toggle: (val: boolean) => updateSetting('msrEnableISO2', val, 'ISO Track 2'),
      onMsrISO3Toggle: (val: boolean) => updateSetting('msrEnableISO3', val, 'ISO Track 3'),
      onMsrGlobalSendConditionChange: (val: string) => updateSetting('msrGlobalSendCondition', val, 'Global Sending Condition'),
      onMsrSuccessIndConditionChange: (val: string) => updateSetting('msrSuccessIndCondition', val, 'Success Indication Condition'),
    },

    onLoadSettings: (fileName: string) => {
      addLog(`Importing settings from ${fileName}...`);
    },

    onLoadFirmware: (fileName: string) => {
      addLog(`Firmware binary ready: ${fileName}`);
    },

    onDownloadSettings: () => {
      addLog('Exporting current configuration...');
      const data = { config: state.config, deviceType: state.deviceType, timestamp: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elpusk_config_${new Date().getTime()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
};
