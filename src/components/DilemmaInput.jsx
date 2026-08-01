import React, { useState, useEffect } from 'react';
import AgentSelector from './AgentSelector';
import OptionBuilder from './OptionBuilder';
import { SlidersHorizontal, Zap, HelpCircle, Lightbulb, RotateCcw, Filter, Check } from 'lucide-react';
import { PRESET_DILEMMAS, DOMAIN_PRIORITIES, DOMAIN_AGENTS } from '../services/agentsData';

export default function DilemmaInput({ onAnalyze, isLoading }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["Option A", "Option B"]);
  const [selectedAgentId, setSelectedAgentId] = useState("universal-agent");
  const [activePriorityCategory, setActivePriorityCategory] = useState("universal-agent");
  
  // Dynamic priorities state: key -> percentage value
  const [priorities, setPriorities] = useState({
    cost: 50,
    performance: 75,
    longevity: 70,
    convenience: 60
  });

  // Track enabled priority keys
  const [enabledKeys, setEnabledKeys] = useState({
    cost: true,
    performance: true,
    longevity: true,
    convenience: true
  });

  // Automatically update priorities schema when domain changes
  useEffect(() => {
    setActivePriorityCategory(selectedAgentId);
    const domainSchema = DOMAIN_PRIORITIES[selectedAgentId] || DOMAIN_PRIORITIES["universal-agent"];
    const newVals = {};
    const newEnabled = {};
    domainSchema.forEach(item => {
      newVals[item.key] = item.defaultVal;
      newEnabled[item.key] = true;
    });
    setPriorities(newVals);
    setEnabledKeys(newEnabled);
  }, [selectedAgentId]);

  const handlePriorityChange = (key, val) => {
    setPriorities(prev => ({ ...prev, [key]: Number(val) }));
  };

  const toggleKeyEnabled = (key) => {
    setEnabledKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryFilterSwitch = (catId) => {
    setActivePriorityCategory(catId);
    const domainSchema = DOMAIN_PRIORITIES[catId] || DOMAIN_PRIORITIES["universal-agent"];
    const newVals = {};
    const newEnabled = {};
    domainSchema.forEach(item => {
      newVals[item.key] = item.defaultVal;
      newEnabled[item.key] = true;
    });
    setPriorities(newVals);
    setEnabledKeys(newEnabled);
  };

  const handleResetToUniversal = () => {
    setSelectedAgentId("universal-agent");
    setActivePriorityCategory("universal-agent");
    const domainSchema = DOMAIN_PRIORITIES["universal-agent"];
    const newVals = {};
    const newEnabled = {};
    domainSchema.forEach(item => {
      newVals[item.key] = item.defaultVal;
      newEnabled[item.key] = true;
    });
    setPriorities(newVals);
    setEnabledKeys(newEnabled);
  };

  const handleLoadPreset = (preset) => {
    setQuestion(preset.question);
    setOptions(preset.options);
    setSelectedAgentId(preset.domainId);
    setActivePriorityCategory(preset.domainId);
    if (preset.priorities) setPriorities(preset.priorities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Filter out disabled priority keys
    const filteredPriorities = {};
    Object.keys(priorities).forEach(k => {
      if (enabledKeys[k] !== false) {
        filteredPriorities[k] = priorities[k];
      }
    });

    onAnalyze({ question, options, domainId: selectedAgentId, priorities: filteredPriorities });
  };

  const currentSchema = DOMAIN_PRIORITIES[activePriorityCategory] || DOMAIN_PRIORITIES["universal-agent"];

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      
      {/* Header & Quick Presets */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>State Your Dilemma or Question</span>
          </label>
          
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[10px] text-slate-400 font-bold uppercase mr-1 flex items-center">
              <Lightbulb className="w-3 h-3 text-amber-400 mr-1" /> Presets:
            </span>
            {PRESET_DILEMMAS.slice(0, 3).map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleLoadPreset(p)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500 text-slate-300 hover:text-white border border-slate-700 transition-all whitespace-nowrap"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Should I buy a Used Electric SUV or Plug-in Hybrid Sedan? Or should I study Data Science vs Full-Stack Dev?"
          className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          required
        />
      </div>

      {/* Options Builder */}
      <OptionBuilder
        options={options}
        setOptions={setOptions}
      />

      {/* Domain Agent Selector */}
      <AgentSelector
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
      />

      {/* Priority Weighting Sliders & Category Filters */}
      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-4">
        
        {/* Header & Reset Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <label className="text-xs uppercase font-bold tracking-wider text-slate-300">
              Domain Decision Priorities
            </label>
            <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {DOMAIN_AGENTS.find(a => a.id === activePriorityCategory)?.domain || "Universal"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetToUniversal}
            className="self-start sm:self-auto px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 flex items-center space-x-1.5 transition-all"
            title="Reset domain filters & priorities to default Universal"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>Reset to Universal</span>
          </button>
        </div>

        {/* Major Category Filter Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wide">
            <span className="flex items-center space-x-1">
              <Filter className="w-3 h-3 text-indigo-400" />
              <span>Filter Decision Criteria Schema by Category:</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {DOMAIN_AGENTS.map((agent) => {
              const isActive = activePriorityCategory === agent.id;
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => handleCategoryFilterSwitch(agent.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/60 shadow-md shadow-indigo-950/40 font-bold'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <span>{agent.domain.split(' ')[0]}</span>
                  {isActive && <Check className="w-3 h-3 text-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Priority Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {currentSchema.map((item) => {
            const isEnabled = enabledKeys[item.key] !== false;
            const currentVal = priorities[item.key] !== undefined ? priorities[item.key] : item.defaultVal;

            return (
              <div
                key={item.key}
                className={`p-3 rounded-xl border transition-all ${
                  isEnabled
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-slate-950/40 border-slate-900 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <button
                    type="button"
                    onClick={() => toggleKeyEnabled(item.key)}
                    className="flex items-center space-x-1.5 text-left group"
                    title="Click to enable/disable this priority criterion"
                  >
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] font-black ${
                      isEnabled ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isEnabled ? '✓' : ''}
                    </span>
                    <span className={`${isEnabled ? 'text-slate-200 group-hover:text-white' : 'text-slate-500 line-through'}`}>
                      {item.label}
                    </span>
                  </button>
                  <span className={`font-mono font-bold ${isEnabled ? item.color : 'text-slate-600'}`}>
                    {isEnabled ? `${currentVal}%` : 'Off'}
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  disabled={!isEnabled}
                  value={currentVal}
                  onChange={(e) => handlePriorityChange(item.key, e.target.value)}
                  className={`w-full ${item.accent} bg-slate-800 h-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed`}
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* Submit Trigger Button */}
      <button
        type="submit"
        disabled={isLoading || !question.trim()}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Analyzing Dilemma & Synthesizing Methodologies...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 fill-current animate-bounce" />
            <span>Break The Tie Now</span>
          </>
        )}
      </button>

    </form>
  );
}
