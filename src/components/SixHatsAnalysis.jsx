import React from 'react';
import { FileText, Heart, AlertOctagon, Sun, Sparkles, Compass } from 'lucide-react';

export default function SixHatsAnalysis({ sixHats }) {
  if (!sixHats) return null;

  const hats = [
    {
      title: "White Hat (Facts & Data)",
      icon: FileText,
      colorBg: "bg-slate-100/10 border-slate-400/30 text-slate-200",
      iconColor: "text-slate-200",
      text: sixHats.whiteHat
    },
    {
      title: "Red Hat (Emotion & Instinct)",
      icon: Heart,
      colorBg: "bg-rose-950/20 border-rose-500/30 text-rose-300",
      iconColor: "text-rose-400",
      text: sixHats.redHat
    },
    {
      title: "Black Hat (Risks & Caution)",
      icon: AlertOctagon,
      colorBg: "bg-slate-900 border-slate-700 text-slate-300",
      iconColor: "text-amber-400",
      text: sixHats.blackHat
    },
    {
      title: "Yellow Hat (Benefits & Optimism)",
      icon: Sun,
      colorBg: "bg-amber-950/20 border-amber-500/30 text-amber-300",
      iconColor: "text-amber-400",
      text: sixHats.yellowHat
    },
    {
      title: "Green Hat (Creativity & Alternatives)",
      icon: Sparkles,
      colorBg: "bg-emerald-950/20 border-emerald-500/30 text-emerald-300",
      iconColor: "text-emerald-400",
      text: sixHats.greenHat
    },
    {
      title: "Blue Hat (Process & Final Synthesis)",
      icon: Compass,
      colorBg: "bg-indigo-950/30 border-indigo-500/40 text-indigo-200",
      iconColor: "text-indigo-400",
      text: sixHats.blueHat
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Six Thinking Hats Methodology (De Bono Framework)
        </label>
        <span className="text-[11px] text-slate-400">
          Parallel multi-perspective analysis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hats.map((hat, idx) => {
          const IconComp = hat.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border space-y-3 shadow-lg ${hat.colorBg}`}
            >
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wide">
                <IconComp className={`w-4 h-4 ${hat.iconColor}`} />
                <span>{hat.title}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {hat.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
