import React, { useState } from 'react';
import { Table, Cpu, Star } from 'lucide-react';
import SpecsMatrix from './SpecsMatrix';

export default function TabularMatrix({ comparisonTable, specsMatrix, options, winner }) {
  const [subView, setSubView] = useState("ratings"); // "ratings" | "specs"

  if ((!comparisonTable || comparisonTable.length === 0) && (!specsMatrix || specsMatrix.length === 0)) return null;

  return (
    <div className="space-y-6">
      
      {/* Sub-view Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Table className="w-4 h-4 text-cyan-400" />
          <span>Tabular Matrix & Technical Specs ({options.length} Options)</span>
        </label>

        {specsMatrix && specsMatrix.length > 0 && (
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSubView("ratings")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                subView === "ratings"
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Evaluation Ratings</span>
            </button>
            <button
              type="button"
              onClick={() => setSubView("specs")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                subView === "specs"
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Specs & Deep-Dive</span>
            </button>
          </div>
        )}
      </div>

      {subView === "specs" && specsMatrix && specsMatrix.length > 0 ? (
        <SpecsMatrix specsMatrix={specsMatrix} options={options} winner={winner} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs uppercase font-bold text-slate-400">
                <th className="p-4 w-1/4">Decision Criteria</th>
                {options.map((opt, i) => (
                  <th
                    key={i}
                    className={`p-4 text-center ${
                      opt === winner ? 'bg-indigo-950/40 text-amber-300 font-black border-x border-indigo-500/30' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span>{opt}</span>
                      {opt === winner && (
                        <span className="mt-1 px-2 py-0.5 text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full font-extrabold">
                          WINNER 🏆
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {comparisonTable.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-200 bg-slate-950/30 border-r border-slate-800">
                    {row.feature}
                  </td>
                  {options.map((opt, oIdx) => {
                    const val = row[opt] || { rating: "★★★☆☆", score: 7, note: "N/A" };
                    const isWinnerCol = opt === winner;

                    return (
                      <td
                        key={oIdx}
                        className={`p-4 text-center ${
                          isWinnerCol ? 'bg-indigo-950/20 border-x border-indigo-500/20 font-semibold' : ''
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-amber-400 tracking-wider font-bold">
                            {val.rating} <span className="text-slate-300 font-mono text-[11px]">({val.score}/10)</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {val.note}
                          </p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
