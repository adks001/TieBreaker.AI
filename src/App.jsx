import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DilemmaInput from './components/DilemmaInput';
import DecisionVerdict from './components/DecisionVerdict';
import MethodologyViewer from './components/MethodologyViewer';
import ShareModal from './components/ShareModal';
import ConversationalChat from './components/ConversationalChat';
import ApiKeyModal from './components/ApiKeyModal';
import HistoryDrawer from './components/HistoryDrawer';
import { analyzeDilemma } from './services/llmEngine';
import { exportCardAsImage } from './utils/shareHelpers';
import { Sparkles, AlertTriangle, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("tiebreaker_gemini_key") || "";
  });

  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isInvalidKeyError, setIsInvalidKeyError] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("tiebreaker_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tiebreaker_history", JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("tiebreaker_gemini_key", key);
    if (typeof window !== "undefined") {
      window.__TIEBREAKER_KEY__ = key;
    }
    setShowApiKeyModal(false);
    setIsInvalidKeyError(false);
  };

  const handleRunAnalysis = async (dilemmaData) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const result = await analyzeDilemma({
        question: dilemmaData.question,
        options: dilemmaData.options,
        domainId: dilemmaData.domainId,
        priorities: dilemmaData.priorities,
        userApiKey: apiKey
      });

      setCurrentAnalysis(result);
      setHistory(prev => [result, ...prev.filter(h => h.question !== result.question)].slice(0, 30));
      
      setTimeout(() => {
        const el = document.getElementById("verdict-card");
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (err) {
      console.error("Dilemma Analysis Failed:", err);
      if (err.isApiKeyInvalid || (err.message && err.message.includes("API_KEY"))) {
        setIsInvalidKeyError(true);
        setShowApiKeyModal(true);
      } else {
        setErrorMsg(err.message || "Failed to analyze dilemma. Please check your options and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("tiebreaker_history");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Navbar */}
      <Navbar
        apiKey={apiKey}
        onOpenApiKeyModal={() => {
          setIsInvalidKeyError(false);
          setShowApiKeyModal(true);
        }}
        onOpenHistory={() => setShowHistoryDrawer(true)}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Hero & Input Section */}
        <section className="space-y-6">
          <DilemmaInput
            onAnalyze={handleRunAnalysis}
            isLoading={isLoading}
          />
        </section>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/50 rounded-2xl p-4 text-red-200 flex items-center justify-between text-sm shadow-xl">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg("")}
              className="text-xs uppercase font-bold text-red-400 hover:text-red-200 px-3 py-1 bg-red-900/50 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Results Container */}
        {currentAnalysis && (
          <div className="space-y-8 pt-4">
            
            {/* Primary Winner Verdict Card */}
            <DecisionVerdict
              analysis={currentAnalysis}
              onOpenShare={() => setShowShareModal(true)}
              onOpenChat={() => setShowChatModal(true)}
              onExportCard={() => exportCardAsImage("verdict-card", `TieBreaker_${currentAnalysis.winner.replace(/[^a-zA-Z0-9]/g, '_')}_Verdict.png`)}
            />

            {/* Methodology Tabbed Switcher */}
            <MethodologyViewer analysis={currentAnalysis} />

          </div>
        )}

      </main>

      {/* Footer & Copyright */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-400 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p>© 2026 TieBreaker AI — Built & Created by <span className="font-bold text-slate-200">Ankur Singh</span>. All rights reserved.</p>
          <a
            href="https://wa.me/917506009321?text=Hi%20Ankur%2C%20I%20have%20a%20query%20or%20feedback%20regarding%20TieBreaker%20AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect on WhatsApp (+917506009321)</span>
          </a>
        </div>
        <p className="text-[11px] text-slate-400">Universal Pair Decision Intelligence • Grounded by Gemini 3.6 Flash Live Web AI</p>
      </footer>

      {/* Floating WhatsApp Help Button (Lower Corner) */}
      <a
        href="https://wa.me/917506009321?text=Hi%20Ankur%2C%20I%20have%20a%20query%20or%20concern%20regarding%20TieBreaker%20AI"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95"
        title="In case of query or concern, connect with Ankur Singh on WhatsApp (+917506009321)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-bold text-xs">Help / Contact Ankur</span>
      </a>

      {/* Modals & Drawers */}
      {showShareModal && (
        <ShareModal
          analysis={currentAnalysis}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showChatModal && (
        <ConversationalChat
          currentAnalysis={currentAnalysis}
          userApiKey={apiKey}
          onClose={() => setShowChatModal(false)}
        />
      )}

      {showApiKeyModal && (
        <ApiKeyModal
          apiKey={apiKey}
          isInvalidKeyError={isInvalidKeyError}
          onSaveKey={handleSaveApiKey}
          onClose={() => {
            setShowApiKeyModal(false);
            setIsInvalidKeyError(false);
          }}
        />
      )}

      {showHistoryDrawer && (
        <HistoryDrawer
          history={history}
          onSelectHistory={(item) => {
            setCurrentAnalysis(item);
            setShowHistoryDrawer(false);
            setTimeout(() => {
              const el = document.getElementById("verdict-card");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 200);
          }}
          onClearHistory={handleClearHistory}
          onClose={() => setShowHistoryDrawer(false)}
        />
      )}

    </div>
  );
}
