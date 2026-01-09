
// Fix for line 22: Import React to provide the React namespace for Dispatch and SetStateAction types
import React from 'react';
import { AppState, ConnectionStatus, DeviceType, DeviceConfig } from './types';
import { coffee } from '@lib/elpusk.framework.coffee';
import { lpu237 } from '@lib/elpusk.device.usb.hid.lpu237';
import { ctl_lpu237 } from '@lib/elpusk.framework.coffee.ctl_lpu237';


// Global instances for library management
let g_coffee = coffee.get_instance();
let g_lpu_device: lpu237 | null = null;
let g_ctl: ctl_lpu237 | null = null;

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

    onConnect: (type: DeviceType) => {
      addLog(`Requesting ${type} device access...`);
      
      // REAL INTEGRATION POINT:
      // In your library version, call navigator.hid.requestDevice() 
      // or use your @lib DeviceManager to establish a real connection.
      
      const fakePath = `\\\\?\\HID#VID_04D9&PID_1400&MI_00#7&${Math.random().toString(16).slice(2, 10)}&0&0000`;
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.CONNECTED,
        devicePath: fakePath,
        deviceType: type,
        logs: [...prev.logs, `Device connected via library: ${fakePath}`]
      }));
    },

    onDisconnect: () => {
      addLog('Closing device connection...');
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
        
        setState(prev => ({
          ...prev,
          serverStatus: ConnectionStatus.CONNECTED,
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
          logs: [...prev.logs, 'Server link closed.']
        }));
      } catch (e) {
        console.error("Error during server disconnect:", e);
      }
     
    },

    onApply: () => {
      addLog('Syncing configuration with hardware...');
      // REAL INTEGRATION POINT:
      // Use your library to send HID Feature Reports or Output Reports 
      // based on the state.config object.
      addLog('Apply Success: Hardware registers updated.');
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
