import React from 'react';
import { Trash2 } from 'lucide-react';

interface LogPanelProps {
  logs: string[];
  onClear: () => void;
}

const LogPanel: React.FC<LogPanelProps> = ({ logs, onClear }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col" style={{ height: '180px' }}>
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <h2 className="text-sm font-bold text-slate-700">Log</h2>
        <button
          onClick={onClear}
          disabled={logs.length === 0}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-[11px] text-slate-600 space-y-0.5">
        {logs.map((log, i) => (
          <div key={i} className="leading-relaxed">{log}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default LogPanel;
