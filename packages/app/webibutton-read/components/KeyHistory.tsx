import React from 'react';
import { iButtonKeyData } from '../types';
import { Trash2, CreditCard, AlertTriangle } from 'lucide-react';

interface KeyHistoryProps {
  history: iButtonKeyData[];
  onClear: () => void;
}

const TrackRow: React.FC<{ label: string; value: string; error: number }> = ({ label, value, error }) => {
  if (error !== 0) {
    return (
      <div className="flex items-start gap-2 text-xs">
        <span className="font-bold text-slate-500 w-14 shrink-0">{label}</span>
        <span className="flex items-center gap-1 text-red-600 font-semibold">
          <AlertTriangle size={11} />
          Error: 0x{error.toString(16).toUpperCase()}
        </span>
      </div>
    );
  }
  if (value.length === 0) {
    return (
      <div className="flex items-start gap-2 text-xs">
        <span className="font-bold text-slate-500 w-14 shrink-0">{label}</span>
        <span className="text-gray-400 italic">(empty)</span>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className="font-bold text-slate-500 w-14 shrink-0">{label}</span>
      <span className="font-mono text-slate-800 break-all">{value}</span>
    </div>
  );
};

const KeyHistory: React.FC<KeyHistoryProps> = ({ history, onClear }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col h-full">
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
          <CreditCard size={14} />
          iButton History
          <span className="ml-1 text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </h2>
        <button
          onClick={onClear}
          disabled={history.length === 0}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm text-center">
          <div>
            <CreditCard size={32} className="mx-auto mb-2 opacity-30" />
            <p>No ibutton read yet.</p>
            <p className="text-xs mt-1">Connect a device and start reading.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2">
          {history.map((ibutton, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-lg p-3 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  #{history.length - idx}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{ibutton.timestamp}</span>
              </div>
              <div className="space-y-1">
                <TrackRow label="key data" value={ibutton.key} error={ibutton.key_error} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyHistory;
