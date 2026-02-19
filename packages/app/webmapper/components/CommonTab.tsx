import React from 'react';
import { DeviceType, DeviceConfig } from '../types';
import { Sliders, Volume2, Globe, Keyboard, Save } from 'lucide-react';
import { lpu237 } from '@lib/elpusk.device.usb.hid.lpu237';

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
  const isUserDef = config.ibuttonMode === "User definition";

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Sliders size={22} className="text-blue-500" />
          Common Configuration
        </h2>
        <button 
          onClick={onApply}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-200 transition-all active:scale-95"
        >
          <Save size={18} /> Apply Changes
        </button>
      </div>

      <div className="p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* SYSTEM SECTION */}
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">General System</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                   <Keyboard size={14} className="text-slate-400" /> Interface Mode
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                   value={config.interface}
                   onChange={(e) => handlers.onInterfaceChange(e.target.value)}
                 >
                    {lpu237.GetInterfaceStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                   <Volume2 size={14} className="text-slate-400" /> Audio Feedback (Buzzer)
                 </label>
                 <div className="flex items-center gap-6 mt-1">
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer group">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       checked={config.buzzer === true}
                       onChange={() => handlers.onBuzzerChange(true)}
                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                     /> 
                     <span className="group-hover:text-blue-600 transition-colors">Enabled</span>
                   </label>
                   <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer group">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       checked={config.buzzer === false}
                       onChange={() => handlers.onBuzzerChange(false)}
                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                     /> 
                     <span className="group-hover:text-blue-600 transition-colors">Disabled</span>
                   </label>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                   <Globe size={14} className="text-slate-400" /> Keyboard Language
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                   value={config.language}
                   onChange={(e) => handlers.onLanguageChange(e.target.value)}
                 >
                    {lpu237.GetLanguageStringList().map((key) => <option key={key}>{key}</option>)}
                 </select>
               </div>
            </div>
          </section>

          {/* I-BUTTON SECTION */}
          {isIButton && (
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
               <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">i-Button Configuration</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Operating Mode</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                      value={config.ibuttonMode}
                      onChange={(e) => handlers.onIButtonModeChange(e.target.value)}
                    >
                        {lpu237.GetiButtonStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                  </div>
                  
                  <div className={`space-y-6 transition-opacity duration-200 ${!isUserDef ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-600">Key Range Start</label>
                        <span className={`text-xs font-black px-2 py-0.5 rounded shadow-sm transition-colors ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                          {config.ibuttonRangeStart}
                        </span>
                      </div>
                      <input 
                        type="range" min="0" max="15" step="1"
                        disabled={!isUserDef}
                        value={config.ibuttonRangeStart} 
                        onChange={(e) => handlers.onIButtonRangeStartChange(parseInt(e.target.value))}
                        className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none transition-all accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-600">Key Range End</label>
                        <span className={`text-xs font-black px-2 py-0.5 rounded shadow-sm transition-colors ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                          {config.ibuttonRangeEnd}
                        </span>
                      </div>
                      <input 
                        type="range" min="0" max="15" step="1"
                        disabled={!isUserDef}
                        value={config.ibuttonRangeEnd} 
                        onChange={(e) => handlers.onIButtonRangeEndChange(parseInt(e.target.value))}
                        className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none transition-all accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MSR SECTION */}
          {isMSR && (
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-gray-200">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">MSR Data Handling</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Read Direction</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                      value={config.msrDirection}
                      onChange={(e) => handlers.onMsrDirectionChange(e.target.value)}
                    >
                        {lpu237.GetDirectionStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Track Priority Order</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                      value={config.msrTrackOrder}
                      onChange={(e) => handlers.onMsrTrackOrderChange(e.target.value)}
                    >
                        {lpu237.GetOrderStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">MMD1100 Reset Interval</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg text-sm p-2.5 bg-white border focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                      value={config.msrResetInterval}
                      onChange={(e) => handlers.onMsrResetIntervalChange(e.target.value)}
                    >
                        {lpu237.GetResetIntervalStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-600 block">Active ISO Tracks</label>
                   <div className="flex flex-wrap gap-6 mt-3">
                     {[1, 2, 3].map(t => (
                       <label key={t} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer select-none group">
                          <input 
                            type="checkbox" 
                            checked={(t === 1 ? config.msrEnableISO1 : t === 2 ? config.msrEnableISO2 : config.msrEnableISO3)} 
                            onChange={(e) => {
                              if (t === 1) handlers.onMsrISO1Toggle(e.target.checked);
                              if (t === 2) handlers.onMsrISO2Toggle(e.target.checked);
                              if (t === 3) handlers.onMsrISO3Toggle(e.target.checked);
                            }}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                          /> 
                          <span className="group-hover:text-blue-600 transition-colors">ISO {t}</span>
                       </label>
                     ))}
                   </div>
                 </div>

                 <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                           <label className="text-xs font-black text-slate-400 uppercase block mb-3 leading-tight tracking-wider">Sending Condition (Global)</label>
                           <div className="space-y-2.5">
                              {lpu237.GLOBAL_TAG_SEND_CONDITION_ARRAY.map(cond => (
                                <label key={cond} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer group">
                                  <input 
                                    type="radio" name="global_send" 
                                    checked={config.msrGlobalSendCondition === cond}
                                    onChange={() => handlers.onMsrGlobalSendConditionChange(cond)}
                                    className="w-4 h-4 text-blue-600" 
                                  /> 
                                  <span className="group-hover:text-blue-600 transition-colors">{cond}</span>
                                </label>
                              ))}
                           </div>
                       </div>
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                           <label className="text-xs font-black text-slate-400 uppercase block mb-3 leading-tight tracking-wider">Success Indicator Logic</label>
                           <div className="space-y-2.5">
                              {lpu237.SUCCESS_INDICATE_CONDITION_ARRAY.map(cond => (
                                <label key={cond} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer group">
                                  <input 
                                    type="radio" name="success_ind" 
                                    checked={config.msrSuccessIndCondition === cond}
                                    onChange={() => handlers.onMsrSuccessIndConditionChange(cond)}
                                    className="w-4 h-4 text-blue-600" 
                                  /> 
                                  <span className="group-hover:text-blue-600 transition-colors">{cond}</span>
                                </label>
                              ))}
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