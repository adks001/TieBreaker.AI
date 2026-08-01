import React from 'react';
import { DollarSign, TrendingDown, Wrench, Fuel, ShieldCheck } from 'lucide-react';

/**
 * Cost-Benefit Analysis (CBA) & Total Cost of Ownership (TCO) Module
 * Evaluates high-ticket financial trade-offs (Upfront Price, 5-Yr Depreciation, Maintenance, Fuel/Running Cost)
 */
export default function CostBenefitMatrix({ cbaData, options, winner }) {
  if (!cbaData || cbaData.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center space-x-1.5">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Cost-Benefit & 5-Year Total Cost of Ownership (TCO) Analysis</span>
        </label>
        <span className="text-[11px] text-slate-400 flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Financial Risk & Economic Impact</span>
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-xs uppercase font-bold text-slate-400">
              <th className="p-4 w-1/4">Financial & Economic Metric</th>
              {options.map((opt, i) => (
                <th
                  key={i}
                  className={`p-4 text-center ${
                    opt === winner ? 'bg-emerald-950/40 text-emerald-300 font-black border-x border-emerald-500/30' : 'text-slate-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{opt}</span>
                    {opt === winner && (
                      <span className="mt-1 px-2 py-0.5 text-[9px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full font-extrabold">
                        BEST VALUE CHOICE 💰
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {cbaData.map((row, rIdx) => {
              const specLabel = row.metricName || row.feature || `Financial Metric #${rIdx + 1}`;

              return (
                <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-emerald-300 bg-slate-950/30 border-r border-slate-800">
                    {specLabel}
                  </td>
                  {options.map((opt, oIdx) => {
                    const rawVal = row.values ? row.values[opt] : row[opt];
                    const isWinnerCol = opt === winner;

                    return (
                      <td
                        key={oIdx}
                        className={`p-4 text-center ${
                          isWinnerCol ? 'bg-emerald-950/20 border-x border-emerald-500/20 font-medium' : ''
                        }`}
                      >
                        <span className="font-semibold text-xs leading-relaxed text-slate-200">
                          {rawVal || "N/A"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
