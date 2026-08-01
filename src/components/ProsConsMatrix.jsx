import React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';

export default function ProsConsMatrix({ prosCons, options, winner }) {
  if (!prosCons) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, idx) => {
          const item = prosCons[option] || { pros: [], cons: [] };
          const isWinner = option === winner;

          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border space-y-4 ${
                isWinner
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-950/20'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black text-white flex items-center space-x-2">
                  <span>{option}</span>
                </h3>
                {isWinner && (
                  <span className="px-2.5 py-0.5 text-[10px] uppercase font-black rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Winner Choice
                  </span>
                )}
              </div>

              {/* Pros List */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Pros & Advantages</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.pros?.map((pro, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons List */}
              <div className="space-y-2 pt-2">
                <div className="text-xs uppercase font-bold tracking-wider text-rose-400 flex items-center space-x-1.5">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Cons & Limitations</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.cons?.map((con, cIdx) => (
                    <li key={cIdx} className="flex items-start space-x-2 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
