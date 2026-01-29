import React, { useMemo } from 'react';
import { DeviceType } from '../types';
import { Settings, Keyboard, Usb, CreditCard, Key } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  deviceType: DeviceType;
  isConnected: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, deviceType, isConnected }) => {
  
  const menuItems = useMemo(() => {
    const baseItems = [
      { id: 'device', label: 'Device', icon: Usb },
    ];

    if (!isConnected) return baseItems;

    const connectedItems = [
      { id: 'common', label: 'Common', icon: Settings },
    ];

    const ibuttonItems = [
      { id: 'ibutton-key-prefix', label: 'i-button key prefix', icon: Key },
      { id: 'ibutton-key-suffix', label: 'i-button key suffix', icon: Key },
      { id: 'ibutton-remove-key', label: 'i-button remove key', icon: Key },
      { id: 'ibutton-remove-prefix', label: 'i-button remove key prefix', icon: Key },
      { id: 'ibutton-remove-suffix', label: 'i-button remove key suffix', icon: Key },
    ];

    const msrItems = [
      { id: 'msr-global-prefix', label: 'MSR global prefix', icon: CreditCard },
      { id: 'msr-global-suffix', label: 'MSR global suffix', icon: CreditCard },
      { id: 'msr-iso1-prefix', label: 'MSR iso1 private prefix', icon: CreditCard },
      { id: 'msr-iso1-suffix', label: 'MSR iso1 private suffix', icon: CreditCard },
      { id: 'msr-iso2-prefix', label: 'MSR iso2 private prefix', icon: CreditCard },
      { id: 'msr-iso2-suffix', label: 'MSR iso2 private suffix', icon: CreditCard },
      { id: 'msr-iso3-prefix', label: 'MSR iso3 private prefix', icon: CreditCard },
      { id: 'msr-iso3-suffix', label: 'MSR iso3 private suffix', icon: CreditCard },
    ];

    if (deviceType === DeviceType.IBUTTON) {
      return [...baseItems, ...connectedItems, ...ibuttonItems];
    }
    if (deviceType === DeviceType.MSR) {
      return [...baseItems, ...connectedItems, ...msrItems];
    }
    // MSR + i-Button
    return [...baseItems, ...connectedItems, ...msrItems, ...ibuttonItems];

  }, [deviceType, isConnected]);

  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-xl z-0 overflow-y-auto shrink-0">
      <div className="p-4 bg-slate-900">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</h2>
      </div>
      <nav className="flex-1 py-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                isActive
                  ? 'bg-slate-700 border-blue-500 text-white'
                  : 'border-transparent text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon size={18} className={`shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="text-left whitespace-normal leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 bg-slate-900 text-xs text-slate-500 text-center">
        v0.7.0 Build 2026
      </div>
    </aside>
  );
};

export default Sidebar;