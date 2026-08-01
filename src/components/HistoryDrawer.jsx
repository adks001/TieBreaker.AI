import React from 'react';
import { History, X, Trash2, ArrowRight } from 'lucide-react';

export default function HistoryDrawer({ history = [], onSelectHistory, onClearHistory, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-black text-white">Past Decision History</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2 pr-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No saved decisions yet. Run your first tie-breaker!
            </div>
          ) : (
            history.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className="w-full text-left p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2 group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 line-clamp-2">
                    {item.question}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="font-semibold text-emerald-400">
                    Winner: {item.winner} ({item.winnerScore}%)
                  </span>
                  <span className="font-mono text-[10px]">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="border-t border-slate-800 pt-4">
            <button
              onClick={onClearHistory}
              className="w-full py-2.5 rounded-xl border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
