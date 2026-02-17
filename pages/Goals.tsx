
import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Goals: React.FC = () => {
  const { goals, updateGoal } = useFinance();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Minhas Metas</h2>
        <button className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">+ Nova Meta</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {goals.map(goal => {
          const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
          
          return (
            <div key={goal.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-2xl opacity-20">⭐</span>
              </div>
              
              <h3 className="font-bold text-slate-700 mb-1">{goal.title}</h3>
              <p className="text-xs text-slate-400 mb-4">Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</p>

              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Acumulado</p>
                  <p className="text-lg font-bold text-indigo-600">R$ {goal.currentAmount.toLocaleString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Objetivo</p>
                  <p className="text-sm font-semibold text-slate-700">R$ {goal.targetAmount.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-1000" 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => updateGoal(goal.id, 50)}
                  className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-xl text-xs font-bold border border-slate-200"
                >
                  Poupar + R$ 50
                </button>
                <button 
                   onClick={() => updateGoal(goal.id, 500)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold"
                >
                  Poupar + R$ 500
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
