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

// 공통 select 스타일
const SEL = "w-full border-gray-300 rounded text-xs p-1.5 bg-white border focus:ring-1 focus:ring-blue-100 focus:border-blue-500 outline-none";
// 공통 label 스타일
const LBL = "text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1";

const CommonTab: React.FC<CommonTabProps> = ({ deviceType, config, handlers, onApply }) => {
  const isMSR     = deviceType === DeviceType.MSR      || deviceType === DeviceType.MSR_IBUTTON;
  const isIButton = deviceType === DeviceType.IBUTTON  || deviceType === DeviceType.MSR_IBUTTON;
  const isUserDef = config.ibuttonMode === "User definition";

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center shadow-sm shrink-0">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sliders size={14} className="text-blue-500" />
          Common Configuration
        </h2>
        <button
          onClick={onApply}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <Save size={12} /> Apply Changes
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="overflow-y-auto flex-1 p-3">
        <div className="max-w-4xl mx-auto space-y-3">

          {/* ── GENERAL SYSTEM ── */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-3 py-1.5 border-b border-gray-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">General System</span>
            </div>
            <div className="p-3 grid grid-cols-3 gap-3">
              {/* Interface Mode */}
              <div>
                <label className={LBL}><Keyboard size={10} className="inline mr-1 text-slate-400" />Interface Mode</label>
                <select className={SEL} value={config.interface} onChange={(e) => handlers.onInterfaceChange(e.target.value)}>
                  {lpu237.GetInterfaceStringList().map((key) => <option key={key}>{key}</option>)}
                </select>
              </div>
              {/* Language */}
              <div>
                <label className={LBL}><Globe size={10} className="inline mr-1 text-slate-400" />Language</label>
                <select className={SEL} value={config.language} onChange={(e) => handlers.onLanguageChange(e.target.value)}>
                  {lpu237.GetLanguageStringList().map((key) => <option key={key}>{key}</option>)}
                </select>
              </div>
              {/* Buzzer */}
              <div>
                <label className={LBL}><Volume2 size={10} className="inline mr-1 text-slate-400" />Buzzer</label>
                <div className="flex gap-3 mt-1.5">
                  {[true, false].map((val) => (
                    <label key={String(val)} className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-600 hover:text-blue-600">
                      <input type="radio" name="buzzer" checked={config.buzzer === val} onChange={() => handlers.onBuzzerChange(val)}
                        className="w-3.5 h-3.5 text-blue-600 accent-blue-600" />
                      {val ? 'ON' : 'OFF'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── I-BUTTON ── */}
          {isIButton && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-3 py-1.5 border-b border-gray-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">i-Button Configuration</span>
              </div>
              <div className="p-3 grid grid-cols-3 gap-3 items-start">
                {/* Operating Mode */}
                <div>
                  <label className={LBL}>Operating Mode</label>
                  <select className={SEL} value={config.ibuttonMode} onChange={(e) => handlers.onIButtonModeChange(e.target.value)}>
                    {lpu237.GetiButtonStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
                </div>
                {/* Range Start */}
                <div className={`transition-opacity ${!isUserDef ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <label className={LBL + " mb-0"}>Key Range Start</label>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>{config.ibuttonRangeStart}</span>
                  </div>
                  <input type="range" min="0" max="15" step="1" disabled={!isUserDef}
                    value={config.ibuttonRangeStart} onChange={(e) => handlers.onIButtonRangeStartChange(parseInt(e.target.value))}
                    className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`} />
                </div>
                {/* Range End */}
                <div className={`transition-opacity ${!isUserDef ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <label className={LBL + " mb-0"}>Key Range End</label>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>{config.ibuttonRangeEnd}</span>
                  </div>
                  <input type="range" min="0" max="15" step="1" disabled={!isUserDef}
                    value={config.ibuttonRangeEnd} onChange={(e) => handlers.onIButtonRangeEndChange(parseInt(e.target.value))}
                    className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`} />
                </div>
              </div>
            </section>
          )}

          {/* ── MSR ── */}
          {isMSR && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-3 py-1.5 border-b border-gray-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MSR Data Handling</span>
              </div>
              <div className="p-3 space-y-3">
                {/* Row 1: 4 selects */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className={LBL}>Read Direction</label>
                    <select className={SEL} value={config.msrDirection} onChange={(e) => handlers.onMsrDirectionChange(e.target.value)}>
                      {lpu237.GetDirectionStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LBL}>Track Priority</label>
                    <select className={SEL} value={config.msrTrackOrder} onChange={(e) => handlers.onMsrTrackOrderChange(e.target.value)}>
                      {lpu237.GetOrderStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LBL}>Reset Interval</label>
                    <select className={SEL} value={config.msrResetInterval} onChange={(e) => handlers.onMsrResetIntervalChange(e.target.value)}>
                      {lpu237.GetResetIntervalStringList().map((key) => <option key={key}>{key}</option>)}
                    </select>
                  </div>
                  {/* Active ISO Tracks */}
                  <div>
                    <label className={LBL}>Active ISO Tracks</label>
                    <div className="flex gap-4 mt-1.5">
                      {[1, 2, 3].map(t => (
                        <label key={t} className="flex items-center gap-1 cursor-pointer text-xs font-bold text-slate-600 hover:text-blue-600 select-none">
                          <input type="checkbox"
                            checked={t === 1 ? config.msrEnableISO1 : t === 2 ? config.msrEnableISO2 : config.msrEnableISO3}
                            onChange={(e) => {
                              if (t === 1) handlers.onMsrISO1Toggle(e.target.checked);
                              if (t === 2) handlers.onMsrISO2Toggle(e.target.checked);
                              if (t === 3) handlers.onMsrISO3Toggle(e.target.checked);
                            }}
                            className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" />
                          ISO{t}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Send Condition + Success Indicator as selects */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className={LBL}>Sending Condition (Global)</label>
                    <select className={SEL} value={config.msrGlobalSendCondition} onChange={(e) => handlers.onMsrGlobalSendConditionChange(e.target.value)}>
                      {lpu237.GLOBAL_TAG_SEND_CONDITION_ARRAY.map((cond: string) => <option key={cond}>{cond}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LBL}>Success Indicator Logic</label>
                    <select className={SEL} value={config.msrSuccessIndCondition} onChange={(e) => handlers.onMsrSuccessIndConditionChange(e.target.value)}>
                      {lpu237.SUCCESS_INDICATE_CONDITION_ARRAY.map((cond: string) => <option key={cond}>{cond}</option>)}
                    </select>
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
