import React from 'react';
import { DOMAIN_AGENTS } from '../services/agentsData';
import { Car, HeartPulse, Stethoscope, GraduationCap, Smartphone, TrendingUp, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Car,
  HeartPulse,
  Stethoscope,
  GraduationCap,
  Smartphone,
  TrendingUp,
  Sparkles
};

export default function AgentSelector({ selectedAgentId, onSelectAgent }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Select Expert Domain Persona (Or Auto-Detect)
        </label>
        <span className="text-[11px] text-slate-400">
          Works dynamically for ANY topic
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {DOMAIN_AGENTS.map((agent) => {
          const IconComp = ICON_MAP[agent.icon] || Sparkles;
          const isSelected = selectedAgentId === agent.id;

          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => onSelectAgent(agent.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${agent.badgeColor} text-white shadow-md`}>
                  <IconComp className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                  {agent.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {agent.domain}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
