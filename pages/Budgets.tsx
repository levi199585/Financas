
import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../constants';
import { TransactionType } from '../types';

const Budgets: React.FC = () => {
  const { budgets, transactions } = useFinance();

  const getCategorySpending = (catId: string) => {
    return transactions
      .filter(t => t.category === catId && t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Orçamentos</h2>
        <button className="text-indigo-600 font-semibold text-sm">+ Configurar</button>
      </div>

      <div className="space-y-4">
        {budgets.map(budget => {
          const category = CATEGORIES.find(c => c.id === budget.categoryId);
          const spending = getCategorySpending(budget.categoryId);
          const percent = Math.min((spending / budget.limit) * 100, 100);
          const isOver = spending > budget.limit;

          return (
            <div key={budget.categoryId} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category?.icon}</span>
                  <span className="font-bold text-slate-700">{category?.name}</span>
                </div>
                <span className="text-xs text-slate-400">Limite: R$ {budget.limit.toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs font-semibold ${isOver ? 'text-rose-500' : 'text-slate-500'}`}>
                  R$ {spending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} gastos
                </span>
                <span className="text-[10px] text-slate-400">
                  {isOver ? 'Excedeu o limite!' : `Restam R$ ${(budget.limit - spending).toLocaleString('pt-BR')}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <h4 className="font-bold text-indigo-800 text-sm mb-1">Dica de Planejamento</h4>
        <p className="text-xs text-indigo-700">A regra 50-30-20 (essenciais, desejos, dívidas/investimentos) é um ótimo ponto de partida para organizar seus orçamentos!</p>
      </div>
    </div>
  );
};

export default Budgets;
