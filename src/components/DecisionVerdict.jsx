import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Share2, Download, MessageSquare, CheckCircle2, TrendingUp, Sparkles, HelpCircle, Table } from 'lucide-react';
import { exportToCsv } from '../utils/shareHelpers';

export default function DecisionVerdict({ analysis, onOpenShare, onOpenChat, onExportCard }) {
  if (!analysis) return null;

  const { winner, winnerScore, scoredOptions, verdictRationale, question } = analysis;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, [analysis]);

  return (
    <div id="verdict-card" className="bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-indigo-950/50 space-y-6 relative overflow-hidden">
      
      {/* Glow background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Conviction Score Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase font-extrabold tracking-widest text-indigo-400">
                Official TieBreaker Verdict
              </span>

              {analysis.sourceMode === "gemini-flash-live" ? (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold shadow-sm">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>✨ Gemini 3.6 Flash Live Response</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold shadow-sm" title={analysis.apiErrorDetails || "Enter API Key in Header for Live AI"}>
                  <HelpCircle className="w-3 h-3 text-amber-400" />
                  <span>⚡ Offline Engine Mode (Add API Key for Live Web AI)</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Winner: <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">{winner}</span>
            </h2>
          </div>
        </div>

        {/* Conviction Score Pill */}
        <div className="flex items-center space-x-3 bg-slate-950/90 px-4 py-2.5 rounded-2xl border border-indigo-500/40 self-start sm:self-auto shrink-0 shadow-lg">
          <TrendingUp className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Conviction Score</div>
            <div className="text-lg font-black text-emerald-400">{winnerScore}% Match</div>
          </div>
        </div>
      </div>

      {/* Why Option Wins & Score Calculation Explanation */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-inner">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Why Option Wins The Tie</span>
          </h4>
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Score Breakdown Verified
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
          {verdictRationale}
        </p>

        {/* Score Math Rationale Pill */}
        <div className="pt-2 border-t border-slate-800/80 flex items-start space-x-2 text-xs text-slate-400">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-normal">
            <strong className="text-slate-200">How the {winnerScore}% Score Was Derived:</strong> Calculated using quadratic priority weighting (weight = (priority / 100)²). It reflects {winner}'s weighted performance across your prioritized decision criteria.
          </p>
        </div>
      </div>

      {/* All Scored Options Progress Bars */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Ranked Comparison Conviction
        </h4>
        <div className="space-y-2.5">
          {scoredOptions.map((option, idx) => {
            const isWinner = option.name === winner;
            return (
              <div key={idx} className="bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="flex items-center space-x-2 text-slate-200 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isWinner ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className={`truncate ${isWinner ? 'font-bold text-white' : 'text-slate-300'}`}>
                      {option.name}
                    </span>
                    {isWinner && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                        {option.verdictTag}
                      </span>
                    )}
                  </span>
                  <span className="text-slate-200 font-mono font-bold shrink-0">
                    {option.score}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isWinner
                        ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    }`}
                    style={{ width: `${option.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 w-full sm:w-auto flex-wrap gap-y-2">
          <button
            onClick={onOpenShare}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Report (WhatsApp / X / Link)</span>
          </button>

          <button
            onClick={onExportCard}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
            title="Export Image Card (PNG)"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Image</span>
          </button>

          <button
            onClick={() => exportToCsv(analysis)}
            className="px-3.5 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-500/40 transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-950/40"
            title="Export full multi-tab analysis to Google Sheets / CSV format"
          >
            <Table className="w-4 h-4 text-emerald-300" />
            <span>Export to Google Sheets (CSV)</span>
          </button>
        </div>

        <button
          onClick={onOpenChat}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span>Ask Counselor Agent</span>
        </button>
      </div>

    </div>
  );
}
