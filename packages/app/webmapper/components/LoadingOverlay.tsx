
import React from 'react';
import { LoadingState } from '../types';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  loading: LoadingState;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  const percent = loading.total > 0 ? Math.round((loading.current / loading.total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center border border-slate-200">
        <div className="bg-blue-50 p-4 rounded-full mb-6">
          <Loader2 size={48} className="text-blue-600 animate-spin" />
        </div>
        
        <h2 className="text-xl font-bold text-slate-800 mb-2">Processing</h2>
        <p className="text-slate-500 text-sm text-center mb-8 h-10 px-4 leading-relaxed">
          {loading.message}
        </p>
        
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Progress</span>
            <span className="text-sm font-mono font-bold text-slate-700">
              {loading.current} / {loading.total}
            </span>
          </div>
          
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out shadow-inner"
              style={{ width: `${percent}%` }}
            />
          </div>
          
          <div className="flex justify-between">
            <span className="text-[10px] text-slate-400 font-medium italic">Items loaded so far...</span>
            <span className="text-[10px] font-bold text-slate-500">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
