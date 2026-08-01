import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Image as ImageIcon, Share2 } from 'lucide-react';
import { shareToWhatsApp, shareToLinkedIn, shareToTwitter, copyToClipboard, buildShareText } from '../utils/shareHelpers';

export default function ShareModal({ analysis, onClose, onExportCard }) {
  const [copied, setCopied] = useState(false);

  if (!analysis) return null;

  const shareText = buildShareText(analysis);

  const handleCopyText = () => {
    copyToClipboard(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white">Share Decision & Verdict</h3>
            <p className="text-xs text-slate-400">Share your TieBreaker analysis across networking platforms</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Platform Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => shareToWhatsApp(analysis)}
            className="p-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all group"
          >
            <MessageSquare className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Share to WhatsApp</span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => shareToLinkedIn(analysis)}
            className="p-4 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all group"
          >
            <svg className="w-6 h-6 text-blue-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z"/>
            </svg>
            <span>Share to LinkedIn</span>
          </button>

          {/* X / Twitter */}
          <button
            type="button"
            onClick={() => shareToTwitter(analysis)}
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all group"
          >
            <svg className="w-5 h-5 text-slate-200 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Share to X (Twitter)</span>
          </button>

          {/* Download PNG Card */}
          <button
            type="button"
            onClick={() => {
              onExportCard();
              onClose();
            }}
            className="p-4 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all group"
          >
            <ImageIcon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>Download PNG Card</span>
          </button>

        </div>

        {/* Formatted Text Preview & Copy */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Formatted Summary Text</span>
            <button
              onClick={handleCopyText}
              className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>
          </div>
          <textarea
            readOnly
            rows={4}
            value={shareText}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}
