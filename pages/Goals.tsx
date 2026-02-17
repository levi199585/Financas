
import React from 'react';
import { useFinance } from '../context/FinanceContext.tsx';

const Goals: React.FC = () => {
  const { goals, updateGoal } = useFinance();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Metas</h2>
      <div className="grid grid-cols-1 gap-4">
        {goals.map(goal => {
          const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
          return (
            <div key={goal.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-700">{goal.title}</h3>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden my-3">
                <div className="h-full bg-indigo-500" style={{ width: `${percent}%` }}></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateGoal(goal.id, 50)} className="flex-1 bg-slate-100 py-2 rounded-xl text-xs font-bold">+ R$ 50</button>
                <button onClick={() => updateGoal(goal.id, 500)} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">+ R$ 500</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
