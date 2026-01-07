import React, { useState } from 'react';
import { KEYBOARD_LAYOUT } from '../types';

interface VirtualKeyboardProps {
  onKeyPress: (key: string, modifiers: { shift: boolean, ctrl: boolean, alt: boolean }) => void;
}

const SHIFT_MAP: Record<string, string> = {
  '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
  '-': '_', '=': '+', '`': '~', '[': '{', ']': '}', '\\': '|', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?'
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [modifiers, setModifiers] = useState({
    shift: false,
    ctrl: false,
    alt: false,
  });

  const toggleModifier = (mod: 'shift' | 'ctrl' | 'alt') => {
    setModifiers(prev => ({ ...prev, [mod]: !prev[mod] }));
  };

  const handleKeyClick = (key: string) => {
    if (key === 'Shift') {
      toggleModifier('shift');
      return;
    }
    if (key === 'Ctrl') {
      toggleModifier('ctrl');
      return;
    }
    if (key === 'Alt') {
      toggleModifier('alt');
      return;
    }
    if (['Win', 'Menu', 'Caps'].includes(key)) {
        // Aesthetic only for this demo
        return;
    }

    onKeyPress(key, modifiers);
    
    // Optional: Reset modifiers after press? Usually Shift resets, but Ctrl/Alt might stick.
    // For this demo, let's reset Shift but keep Ctrl/Alt if user wants combinations.
    if (modifiers.shift) setModifiers(prev => ({ ...prev, shift: false }));
  };

  const getDisplayLabel = (key: string) => {
    // If it's a special multi-char key (Esc, F1, Bksp, etc), return as is
    if (key.length > 1 && !['Shift', 'Ctrl', 'Alt'].includes(key)) return key;
    
    // Handle letters
    if (key.length === 1 && key.match(/[A-Z]/)) {
      return modifiers.shift ? key.toUpperCase() : key.toLowerCase();
    }

    // Handle symbols and numbers
    if (modifiers.shift && SHIFT_MAP[key]) {
      return SHIFT_MAP[key];
    }

    return key;
  };

  return (
    <div className="flex-1 bg-slate-200 rounded p-4 shadow-inner flex flex-col justify-center gap-1 select-none">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key, keyIndex) => {
            let widthClass = "w-10"; // Default width
            let colorClass = "bg-white text-slate-700 border-b-2 border-slate-300 active:border-b-0 active:translate-y-[2px]";
            
            // Modifier Active States
            if (key === 'Shift' && modifiers.shift) colorClass = "bg-blue-200 text-blue-800 border-blue-400 border-b-2 translate-y-[1px]";
            if (key === 'Ctrl' && modifiers.ctrl) colorClass = "bg-blue-200 text-blue-800 border-blue-400 border-b-2 translate-y-[1px]";
            if (key === 'Alt' && modifiers.alt) colorClass = "bg-blue-200 text-blue-800 border-blue-400 border-b-2 translate-y-[1px]";

            // Special Widths
            if (['Bksp', 'Tab', '\\', 'Enter', 'Caps'].includes(key)) widthClass = "w-16";
            if (['Shift'].includes(key)) widthClass = "w-24";
            if (['Space'].includes(key)) widthClass = "w-64";
            if (['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(key)) {
                 widthClass = "w-10"; 
                 if(rowIndex === 0) widthClass = "w-8 text-[10px] h-8"; // Smaller F-keys
            }

            const label = getDisplayLabel(key);

            return (
              <button
                key={`${rowIndex}-${keyIndex}`}
                onClick={() => handleKeyClick(key)}
                className={`
                  ${widthClass} h-10 rounded text-xs font-bold transition-all shadow-sm flex items-center justify-center
                  ${colorClass}
                  hover:bg-gray-50
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
      
      <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${modifiers.shift ? 'bg-blue-500' : 'bg-gray-300'}`}></div> Shift
        </div>
        <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${modifiers.ctrl ? 'bg-blue-500' : 'bg-gray-300'}`}></div> Ctrl
        </div>
        <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${modifiers.alt ? 'bg-blue-500' : 'bg-gray-300'}`}></div> Alt
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;