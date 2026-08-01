import React, { useState, useRef } from 'react';
import ProsConsMatrix from './ProsConsMatrix';
import SWOTAnalysis from './SWOTAnalysis';
import TabularMatrix from './TabularMatrix';
import SpecsMatrix from './SpecsMatrix';
import CostBenefitMatrix from './CostBenefitMatrix';
import SixHatsAnalysis from './SixHatsAnalysis';
import { Scale, BarChart3, Table, Cpu, DollarSign, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MethodologyViewer({ analysis }) {
  const [activeTab, setActiveTab] = useState("pros-cons");
  const scrollContainerRef = useRef(null);

  if (!analysis) return null;

  const { prosCons, swotAnalysis, comparisonTable, specsMatrix, cbaData, sixHats, scoredOptions, winner } = analysis;
  const options = scoredOptions.map(o => o.name);

  const tabs = [
    { id: "pros-cons", name: "Pros & Cons Matrix", icon: Scale },
    { id: "swot", name: "SWOT Analysis", icon: BarChart3 },
    { id: "tabular", name: "Tabular Matrix", icon: Table },
    { id: "specs", name: "Technical Specs", icon: Cpu },
    { id: "cba", name: "Cost-Benefit Analysis", icon: DollarSign },
    { id: "six-hats", name: "6 Thinking Hats", icon: Layers }
  ];

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
      
      {/* Responsive Tab Navigation Bar with Left / Right Slider Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/90 pb-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-300 flex items-center space-x-1.5 shrink-0">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Decision Methodology Views</span>
          </span>
          <span className="text-[10px] text-slate-400 lg:hidden font-mono">
            Scroll or use arrows →
          </span>
        </div>
        
        <div className="relative flex items-center space-x-1 max-w-full overflow-hidden">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollTabs('left')}
            className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shrink-0 shadow-md"
            title="Scroll Tabs Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontally Scrollable Tabs Bar */}
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-purple-500/40 scrollbar-track-slate-950 scroll-smooth max-w-full shrink px-1"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/30 ring-2 ring-purple-500/20'
                      : 'bg-slate-950/90 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollTabs('right')}
            className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shrink-0 shadow-md ring-2 ring-purple-500/30 animate-pulse"
            title="Scroll Tabs Right to see 6 Thinking Hats"
          >
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === "pros-cons" && (
          <ProsConsMatrix prosCons={prosCons} options={options} winner={winner} />
        )}
        {activeTab === "swot" && (
          <SWOTAnalysis swotAnalysis={swotAnalysis} options={options} winner={winner} />
        )}
        {activeTab === "tabular" && (
          <TabularMatrix comparisonTable={comparisonTable} options={options} winner={winner} />
        )}
        {activeTab === "specs" && (
          <SpecsMatrix specsMatrix={specsMatrix} options={options} winner={winner} />
        )}
        {activeTab === "cba" && (
          <CostBenefitMatrix cbaData={cbaData} options={options} winner={winner} />
        )}
        {activeTab === "six-hats" && (
          <SixHatsAnalysis sixHats={sixHats} winner={winner} />
        )}
      </div>

    </div>
  );
}
