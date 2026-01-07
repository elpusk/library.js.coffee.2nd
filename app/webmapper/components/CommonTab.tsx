import React from 'react';
import { DeviceType, DeviceConfig } from '../types';
import { Sliders, Volume2, Globe, Keyboard, Save } from 'lucide-react';

interface CommonTabProps {
  deviceType: DeviceType;
  config: DeviceConfig;
  onApply: () => void;
  handlers: {
    onInterfaceChange: (val: string) => void;
    onBuzzerChange: (val: boolean) => void;
    onLanguageChange: (val: string) => void;
    onIButtonModeChange: (val: string) => void;
    onIButtonRangeStartChange: (val: number) => void;
    onIButtonRangeEndChange: (val: number) => void;
    onMsrDirectionChange: (val: string) => void;
    onMsrTrackOrderChange: (val: string) => void;
    onMsrResetIntervalChange: (val: string) => void;
    onMsrISO1Toggle: (val: boolean) => void;
    onMsrISO2Toggle: (val: boolean) => void;
    onMsrISO3Toggle: (val: boolean) => void;
    onMsrGlobalSendConditionChange: (val: string) => void;
    onMsrSuccessIndConditionChange: (val: string) => void;
  };
}

const CommonTab: React.FC<CommonTabProps> = ({ deviceType, config, handlers, onApply }) => {
  const isMSR = deviceType === DeviceType.MSR || deviceType === DeviceType.MSR_IBUTTON;
  const isIButton = deviceType === DeviceType.IBUTTON || deviceType === DeviceType.MSR_IBUTTON;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          <Sliders size={20} className="text-gray-500" />
          Common Configuration
        </h2>
        <button 
          onClick={onApply}
          className="px-4 py-1.5 bg-blue-600 text-white rounded border border-blue-700 hover:bg-blue-700 font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Save size={16} /> Apply
        </button>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* SYSTEM SECTION */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">System Settings</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Keyboard size={14} /> Interface
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                   value={config.interface}
                   onChange={(e) => handlers.onInterfaceChange(e.target.value)}
                 >
                    <option>USB keyboard mode</option>
                    <option>USB HID Vendor mode</option>
                    <option>RS232 mode</option>
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Volume2 size={14} /> Buzzer
                 </label>
                 <div className="flex items-center gap-4 mt-2">
                   <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       checked={config.buzzer === true}
                       onChange={() => handlers.onBuzzerChange(true)}
                       className="text-blue-600 focus:ring-blue-500" 
                     /> ON
                   </label>
                   <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       checked={config.buzzer === false}
                       onChange={() => handlers.onBuzzerChange(false)}
                       className="text-blue-600 focus:ring-blue-500" 
                     /> OFF
                   </label>
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Globe size={14} /> Language
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                   value={config.language}
                   onChange={(e) => handlers.onLanguageChange(e.target.value)}
                 >
                    <option>USA English</option>
                    <option>Spanish</option>
                    <option>Danish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Italian</option>
                    <option>Norwegian</option>
                    <option>Swedish</option>
                    <option>Herbrew</option>
                    <option>Turkiye</option>
                 </select>
               </div>
            </div>
          </section>

          {/* I-BUTTON SECTION */}
          {isIButton && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
               <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">i-Button / Code Sticks</span>
              </div>
              <div className="p-4 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mode</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      value={config.ibuttonMode}
                      onChange={(e) => handlers.onIButtonModeChange(e.target.value)}
                    >
                        <option>zero-16 times</option>
                        <option>F12</option>
                        <option>zero-7 times</option>
                        <option>Code stick protocol</option>
                        <option>user definition</option>
                    </select>
                  </div>
                  
                  {/* Touch Friendly Range Selection */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Key Range Start</label>
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{config.ibuttonRangeStart}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="15" 
                        step="1"
                        value={config.ibuttonRangeStart} 
                        onChange={(e) => handlers.onIButtonRangeStartChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 px-1">
                        <span>0</span>
                        <span>15</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">Key Range End</label>
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{config.ibuttonRangeEnd}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="15" 
                        step="1"
                        value={config.ibuttonRangeEnd} 
                        onChange={(e) => handlers.onIButtonRangeEndChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 px-1">
                        <span>0</span>
                        <span>15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MSR SECTION */}
          {isMSR && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">MSR Settings</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Direction</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      value={config.msrDirection}
                      onChange={(e) => handlers.onMsrDirectionChange(e.target.value)}
                    >
                        <option>Bidirectional</option>
                        <option>Forward</option>
                        <option>Backward</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Track Order</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      value={config.msrTrackOrder}
                      onChange={(e) => handlers.onMsrTrackOrderChange(e.target.value)}
                    >
                        <option>123</option>
                        <option>132</option>
                        <option>213</option>
                        <option>231</option>
                        <option>312</option>
                        <option>321</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Reset Interval</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      value={config.msrResetInterval}
                      onChange={(e) => handlers.onMsrResetIntervalChange(e.target.value)}
                    >
                        <option>0(default, 03:22)</option>
                        <option>16(06:43)</option>
                        <option>32(13:27)</option>
                        <option>48(20:10)</option>
                        <option>64(26:53)</option>
                        <option>80(33:36)</option>
                        <option>96(40:19)</option>
                        <option>112(47:03)</option>
                        <option>128(53:46)</option>
                        <option>144(01:00:29)</option>
                        <option>160(01:07:12)</option>
                        <option>176(01:13:55)</option>
                        <option>192(01:20:39)</option>
                        <option>208(01:27:22)</option>
                        <option>224(01:34:05)</option>
                        <option>240(disable)</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700 block mb-2">Enable ISO Tracks</label>
                   <div className="flex flex-wrap gap-4">
                     <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={config.msrEnableISO1} 
                          onChange={(e) => handlers.onMsrISO1Toggle(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500" 
                        /> ISO1
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={config.msrEnableISO2} 
                          onChange={(e) => handlers.onMsrISO2Toggle(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500" 
                        /> ISO2
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={config.msrEnableISO3} 
                          onChange={(e) => handlers.onMsrISO3Toggle(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500" 
                        /> ISO3
                     </label>
                   </div>
                 </div>

                 <div className="space-y-2 md:col-span-2 border-t pt-4 mt-2">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 uppercase block mb-2 text-wrap leading-tight">Global pre/suffix sending condition</label>
                          <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="global_send" 
                                 checked={config.msrGlobalSendCondition === 'No Error in all tracks'}
                                 onChange={() => handlers.onMsrGlobalSendConditionChange('No Error in all tracks')}
                                 className="text-blue-600" 
                               /> No Error in all tracks
                             </label>
                             <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="global_send" 
                                 checked={config.msrGlobalSendCondition === 'One more track is normal'}
                                 onChange={() => handlers.onMsrGlobalSendConditionChange('One more track is normal')}
                                 className="text-blue-600" 
                               /> One more track is normal
                             </label>
                          </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 uppercase block mb-2 text-wrap leading-tight">Success indication condition</label>
                          <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="success_ind" 
                                 checked={config.msrSuccessIndCondition === 'No Error in all tracks'}
                                 onChange={() => handlers.onMsrSuccessIndConditionChange('No Error in all tracks')}
                                 className="text-blue-600" 
                               /> No Error in all tracks
                             </label>
                             <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="success_ind" 
                                 checked={config.msrSuccessIndCondition === 'One more track is normal'}
                                 onChange={() => handlers.onMsrSuccessIndConditionChange('One more track is normal')}
                                 className="text-blue-600" 
                               /> One more track is normal
                             </label>
                          </div>
                      </div>
                   </div>
                 </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonTab;