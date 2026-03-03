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

const SEL = "w-full border-gray-300 rounded text-sm p-2 bg-white border focus:ring-1 focus:ring-blue-100 focus:border-blue-500 outline-none";
const LBL = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";

const CommonTab: React.FC<CommonTabProps> = ({ deviceType, config, handlers, onApply }) => {
  const isMSR     = deviceType === DeviceType.MSR      || deviceType === DeviceType.MSR_IBUTTON;
  const isIButton = deviceType === DeviceType.IBUTTON  || deviceType === DeviceType.MSR_IBUTTON;
  const isUserDef = config.ibuttonMode === "User definition";

  // 표시되는 섹션 수에 따라 각 섹션 내부 패딩을 동적으로 조정
  // MSR+iButton 모두 표시 시 3개 섹션 → py-4
  // MSR 또는 iButton 하나만 → py-6
  // 둘 다 없음 → py-10
  const sectionCount = 1 + (isIButton ? 1 : 0) + (isMSR ? 1 : 0);
  const innerPy = sectionCount >= 3 ? 'py-4' : sectionCount === 2 ? 'py-6' : 'py-8';

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex justify-between items-center shadow-sm shrink-0">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sliders size={16} className="text-blue-500" />
          Common Configuration
        </h2>
        <button
          onClick={onApply}
          className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Save size={14} /> Apply Changes
        </button>
      </div>

      {/* ── Body: overflow-y-auto로 작은 화면에서 스크롤, 큰 화면에서 공간 균등 분배 ── */}
      <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto">

        {/* ── GENERAL SYSTEM ── */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="bg-slate-50 px-4 py-2 border-b border-gray-200">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">General System</span>
          </div>
          <div className={`px-5 ${innerPy}`}>
            <div className="grid grid-cols-3 gap-6">
              {/* Interface Mode */}
              <div>
                <label className={LBL}><Keyboard size={11} className="inline mr-1.5 text-slate-400" />Interface Mode</label>
                <select className={SEL} value={config.interface} onChange={(e) => handlers.onInterfaceChange(e.target.value)}>
                  {lpu237.GetInterfaceStringList().map((key) => <option key={key}>{key}</option>)}
                </select>
              </div>
              {/* Language */}
              <div>
                <label className={LBL}><Globe size={11} className="inline mr-1.5 text-slate-400" />Keyboard Language</label>
                <select className={SEL} value={config.language} onChange={(e) => handlers.onLanguageChange(e.target.value)}>
                  {lpu237.GetLanguageStringList().map((key) => <option key={key}>{key}</option>)}
                </select>
              </div>
              {/* Buzzer */}
              <div>
                <label className={LBL}><Volume2 size={11} className="inline mr-1.5 text-slate-400" />Audio Feedback (Buzzer)</label>
                <div className="flex gap-6 mt-2">
                  {[true, false].map((val) => (
                    <label key={String(val)} className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-600 hover:text-blue-600">
                      <input type="radio" name="buzzer" checked={config.buzzer === val} onChange={() => handlers.onBuzzerChange(val)}
                        className="w-4 h-4 accent-blue-600" />
                      {val ? 'Enabled' : 'Disabled'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── I-BUTTON ── */}
        {isIButton && (
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden shrink-0">
            <div className="bg-slate-50 px-4 py-2 border-b border-gray-200">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">i-Button Configuration</span>
            </div>
            <div className={`px-5 ${innerPy}`}>
              <div className="grid grid-cols-3 gap-6 items-start">
                {/* Operating Mode */}
                <div>
                  <label className={LBL}>Operating Mode</label>
                  <select className={SEL} value={config.ibuttonMode} onChange={(e) => handlers.onIButtonModeChange(e.target.value)}>
                    {lpu237.GetiButtonStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
                </div>
                {/* Range Start */}
                <div className={`transition-opacity ${!isUserDef ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Range Start</label>
                    <span className={`text-xs font-black px-2 py-0.5 rounded ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>{config.ibuttonRangeStart}</span>
                  </div>
                  <input type="range" min="0" max="15" step="1" disabled={!isUserDef}
                    value={config.ibuttonRangeStart} onChange={(e) => handlers.onIButtonRangeStartChange(parseInt(e.target.value))}
                    className={`w-full h-2 bg-slate-200 rounded-lg appearance-none accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`} />
                </div>
                {/* Range End */}
                <div className={`transition-opacity ${!isUserDef ? 'opacity-40 pointer-events-none' : ''}`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Range End</label>
                    <span className={`text-xs font-black px-2 py-0.5 rounded ${isUserDef ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>{config.ibuttonRangeEnd}</span>
                  </div>
                  <input type="range" min="0" max="15" step="1" disabled={!isUserDef}
                    value={config.ibuttonRangeEnd} onChange={(e) => handlers.onIButtonRangeEndChange(parseInt(e.target.value))}
                    className={`w-full h-2 bg-slate-200 rounded-lg appearance-none accent-blue-600 ${isUserDef ? 'cursor-pointer' : 'cursor-not-allowed'}`} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── MSR ── */}
        {isMSR && (
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden shrink-0">
            <div className="bg-slate-50 px-4 py-2 border-b border-gray-200">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">MSR Data Handling</span>
            </div>
            <div className={`px-5 ${innerPy} space-y-4`}>
              {/* Row 1: 3 selects */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={LBL}>Read Direction</label>
                  <select className={SEL} value={config.msrDirection} onChange={(e) => handlers.onMsrDirectionChange(e.target.value)}>
                    {lpu237.GetDirectionStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LBL}>Track Priority Order</label>
                  <select className={SEL} value={config.msrTrackOrder} onChange={(e) => handlers.onMsrTrackOrderChange(e.target.value)}>
                    {lpu237.GetOrderStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LBL}>MMD1100 Reset Interval</label>
                  <select className={SEL} value={config.msrResetInterval} onChange={(e) => handlers.onMsrResetIntervalChange(e.target.value)}>
                    {lpu237.GetResetIntervalStringList().map((key) => <option key={key}>{key}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 1b: ISO Tracks + Condition selects — 한 줄로 통합 */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={LBL}>Active ISO Tracks</label>
                  <div className="flex gap-5 mt-2">
                    {[1, 2, 3].map(t => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-600 hover:text-blue-600 select-none">
                        <input type="checkbox"
                          checked={t === 1 ? config.msrEnableISO1 : t === 2 ? config.msrEnableISO2 : config.msrEnableISO3}
                          onChange={(e) => {
                            if (t === 1) handlers.onMsrISO1Toggle(e.target.checked);
                            if (t === 2) handlers.onMsrISO2Toggle(e.target.checked);
                            if (t === 3) handlers.onMsrISO3Toggle(e.target.checked);
                          }}
                          className="w-4 h-4 accent-blue-600 cursor-pointer rounded" />
                        ISO {t}
                      </label>
                    ))}
                  </div>
                </div>
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

        {/* ── 큰 화면에서 남은 공간을 채우는 spacer ── */}
        <div className="flex-1 min-h-0" />

      </div>
    </div>
  );
};

export default CommonTab;
