import React from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';

export default function OptionBuilder({ options, setOptions }) {
  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, `Option ${String.fromCharCode(65 + options.length)}`]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Options to Compare (2 to 4 choices)</span>
        </label>
        <span className="text-[11px] text-slate-400">
          {options.length} / 4 Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option, idx) => (
          <div key={idx} className="relative flex items-center">
            <span className="absolute left-3 w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 text-xs font-extrabold flex items-center justify-center border border-indigo-500/30">
              {String.fromCharCode(65 + idx)}
            </span>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Enter Option ${String.fromCharCode(65 + idx)}...`}
              className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                className="absolute right-2.5 p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Remove Option"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {options.length < 4 && (
        <button
          type="button"
          onClick={addOption}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/30 hover:bg-slate-900/60 text-slate-400 hover:text-indigo-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add 3rd or 4th Option for Comparison</span>
        </button>
      )}
    </div>
  );
}
