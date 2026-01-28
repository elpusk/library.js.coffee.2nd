import React from 'react';
import { KeyMapEntry } from '../types';
import VirtualKeyboard from './VirtualKeyboard';
import { Trash2, Keyboard, Save } from 'lucide-react';
import { getHidCodeByLabel } from '../handlers';

interface KeyMapTabProps {
  title: string;
  maxKeys: number;
  keys: KeyMapEntry[];
  onKeysChange: (keys: KeyMapEntry[]) => void;
  onApply: () => void;
}

const KeyMapTab: React.FC<KeyMapTabProps> = ({ title, maxKeys, keys, onKeysChange, onApply }) => {
  
  const handleClearAll = () => {
    // Only clear if there are keys to clear
    if (keys.length > 0) {
      // Direct update without confirmation to ensure functionality in all environments
      onKeysChange([]);
    }
  };

  const handleKeyPress = (key: string, modifiers: { shift: boolean, ctrl: boolean, alt: boolean }) => {
    if (keys.length >= maxKeys) {
      alert(`Maximum limit of ${maxKeys} keys reached.`);
      return;
    }

    const newEntry: KeyMapEntry = {
      id: Date.now(),
      shift: modifiers.shift,
      ctrl: modifiers.ctrl,
      alt: modifiers.alt,
      keyValue: `[${key}] key`,
      hidCode: getHidCodeByLabel(key) // Resolve HID scan code from key label
    };
    onKeysChange([...keys, newEntry]);
  };

  const handleRemoveKey = (id: number) => {
    onKeysChange(keys.filter(k => k.id !== id));
  };

  // Format title for display
  const displayTitle = title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <Keyboard size={20} className="text-gray-500" />
            {displayTitle}
          </h2>
          <button 
            onClick={onApply}
            className="px-3 py-1 bg-blue-600 text-white rounded border border-blue-700 hover:bg-blue-700 font-semibold text-xs flex items-center gap-1 shadow-sm transition-colors"
          >
            <Save size={14} /> Apply
          </button>
        </div>
        <div className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
          Keys: {keys.length} / {maxKeys}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        
        {/* Table Section */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-600 uppercase">Configured Keys</h3>
            <button 
              type="button"
              onClick={handleClearAll}
              disabled={keys.length === 0}
              className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                keys.length === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-red-600 hover:text-red-800 hover:bg-red-50'
              }`}
            >
              <Trash2 size={12} /> Clear all
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-500 font-medium sticky top-0">
                <tr>
                  <th className="px-4 py-2 w-16 text-center">No.</th>
                  <th className="px-4 py-2 w-16 text-center">Shift</th>
                  <th className="px-4 py-2 w-16 text-center">Ctrl</th>
                  <th className="px-4 py-2 w-16 text-center">Alt</th>
                  <th className="px-4 py-2">Key Value</th>
                  <th className="px-4 py-2 w-24 text-center">HID Code</th>
                  <th className="px-4 py-2 w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {keys.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 italic">
                      No keys configured. Use the virtual keyboard below to add keys.
                    </td>
                  </tr>
                ) : (
                  keys.map((key, index) => (
                    <tr key={key.id} className="hover:bg-blue-50 transition-colors group">
                      <td className="px-4 py-2 text-center text-gray-400">{index + 1}</td>
                      <td className="px-4 py-2 text-center text-gray-600">{key.shift ? '✓' : ''}</td>
                      <td className="px-4 py-2 text-center text-gray-600">{key.ctrl ? '✓' : ''}</td>
                      <td className="px-4 py-2 text-center text-gray-600">{key.alt ? '✓' : ''}</td>
                      <td className="px-4 py-2 font-mono text-blue-700 font-medium">{key.keyValue}</td>
                      <td className="px-4 py-2 text-center font-mono text-xs text-slate-500 bg-slate-50/50">0x{key.hidCode.toUpperCase()}</td>
                      <td className="px-4 py-2 text-center">
                        <button 
                          type="button"
                          onClick={() => handleRemoveKey(key.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Keyboard Section */}
        <div className="h-1/2 min-h-[300px] bg-slate-100 rounded-lg border border-gray-300 p-4 flex flex-col shadow-inner">
           <div className="mb-2 flex justify-between items-center">
             <span className="text-xs font-bold text-gray-500 uppercase">Virtual Input</span>
             <span className="text-xs text-gray-400">Click keys to add to table</span>
           </div>
           <VirtualKeyboard onKeyPress={handleKeyPress} />
        </div>

      </div>
    </div>
  );
};

export default KeyMapTab;