
import React from 'react';
import { useFinance } from '../context/FinanceContext.tsx';
import { CATEGORIES } from '../constants.tsx';
import { TransactionType } from '../types.ts';

const Budgets: React.FC = () => {
  const { budgets, transactions } = useFinance();

  const getCategorySpending = (catId: string) => {
    return transactions
      .filter(t => t.category === catId && t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Orçamentos</h2>
      <div className="space-y-4">
        {budgets.map(budget => {
          const category = CATEGORIES.find(c => c.id === budget.categoryId);
          const spending = getCategorySpending(budget.categoryId);
          const percent = Math.min((spending / budget.limit) * 100, 100);

          return (
            <div key={budget.categoryId} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-700">{category?.icon} {category?.name}</span>
                <span className="text-xs text-slate-400">Limite: R$ {budget.limit}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
