import React from 'react';
import { Scale, Sparkles, Key, History, Home } from 'lucide-react';

export default function Navbar({ onOpenApiKey, onOpenHistory, onResetToHome, historyCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Logo (Clickable to Home Screen) */}
        <button
          onClick={onResetToHome}
          className="flex items-center space-x-3 text-left hover:opacity-90 transition-opacity focus:outline-none group"
          title="Return to Home Screen"
        >
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
                TieBreaker<span className="text-indigo-400">.AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Agentic v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Universal Multi-Agent Decision & Methodology Intelligence
            </p>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          
          <button
            onClick={onResetToHome}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center space-x-1.5"
            title="Reset to Home Screen"
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center space-x-1.5"
            title="Saved Decisions History"
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenApiKey}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center space-x-1.5"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">API Key</span>
          </button>

          <div className="hidden sm:flex px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Universal AI</span>
          </div>

        </div>

      </div>
    </header>
  );
}
