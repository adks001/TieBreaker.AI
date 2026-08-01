import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Lightbulb, Flame } from 'lucide-react';

export default function SWOTAnalysis({ swotAnalysis, options = [], winner }) {
  if (!swotAnalysis || !options || options.length === 0) return null;
  const [activeOption, setActiveOption] = useState(options[0] || "");

  const getSwotData = (optName) => {
    if (!swotAnalysis) return { strengths: [], weaknesses: [], opportunities: [], threats: [] };
    if (swotAnalysis[optName]) return swotAnalysis[optName];
    
    // Case-insensitive & trimmed fallback lookup
    const lowerKey = (optName || "").trim().toLowerCase();
    const foundKey = Object.keys(swotAnalysis).find(k => k.trim().toLowerCase() === lowerKey);
    if (foundKey) return swotAnalysis[foundKey];

    // First available key fallback
    const firstKey = Object.keys(swotAnalysis)[0];
    return swotAnalysis[firstKey] || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  };

  const currentSwot = getSwotData(activeOption);

  return (
    <div className="space-y-6">
      
      {/* Option Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        <span className="text-xs uppercase font-bold text-slate-400 mr-2 shrink-0">Select Option:</span>
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveOption(opt)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all shrink-0 whitespace-nowrap ${
              activeOption === opt
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {opt} {opt === winner ? '🏆' : ''}
          </button>
        ))}
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm uppercase">
            <ShieldCheck className="w-5 h-5" />
            <span>Strengths (S)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {currentSwot.strengths && currentSwot.strengths.length > 0 ? (
              currentSwot.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">High performance advantage and verified quality.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm uppercase">
            <AlertTriangle className="w-5 h-5" />
            <span>Weaknesses (W)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {currentSwot.weaknesses && currentSwot.weaknesses.length > 0 ? (
              currentSwot.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Specific operational trade-off relative to alternative.</li>
            )}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-sm uppercase">
            <Lightbulb className="w-5 h-5" />
            <span>Opportunities (O)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {currentSwot.opportunities && currentSwot.opportunities.length > 0 ? (
              currentSwot.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Long-term utility and user satisfaction.</li>
            )}
          </ul>
        </div>

        {/* Threats */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-sm uppercase">
            <Flame className="w-5 h-5" />
            <span>Threats (T)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {currentSwot.threats && currentSwot.threats.length > 0 ? (
              currentSwot.threats.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-400 italic">Competitive market alternatives.</li>
            )}
          </ul>
        </div>

      </div>

    </div>
  );
}
