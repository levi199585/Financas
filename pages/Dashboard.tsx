
import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext.tsx';
import { TransactionType } from '../types.ts';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORIES } from '../constants.tsx';
import { getFinancialAdvice } from '../services/geminiService.ts';

const Dashboard: React.FC = () => {
  const { transactions, badges } = useFinance();
  const [advice, setAdvice] = useState<string>("Carregando sua dica financeira...");

  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const categoryData = CATEGORIES.map(cat => {
    const amount = transactions
      .filter(t => t.category === cat.id && t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: cat.name, value: amount, color: cat.color };
  }).filter(d => d.value > 0);

  useEffect(() => {
    const fetchAdvice = async () => {
      const msg = await getFinancialAdvice(transactions, balance);
      setAdvice(msg);
    };
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
        <p className="text-sm opacity-80 mb-1">Saldo Atual</p>
        <h2 className="text-3xl font-bold mb-4">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="opacity-70">Receitas</p>
            <p className="font-semibold text-emerald-400">+ R$ {totalIncome.toLocaleString('pt-BR')}</p>
          </div>
          <div className="text-right">
            <p className="opacity-70">Despesas</p>
            <p className="font-semibold text-rose-300">- R$ {totalExpense.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start animate-pulse">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-bold text-amber-800 text-sm">Insight do Finance+ AI</h4>
          <p className="text-amber-900 text-sm italic">{advice}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4">Gastos por Categoria</h3>
        <div className="h-64 w-full">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 italic">
              Nenhum gasto registrado este mês
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-700">Conquistas</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {badges.map(badge => (
            <div 
              key={badge.id} 
              className={`flex-shrink-0 w-16 text-center ${badge.unlocked ? 'opacity-100' : 'opacity-30 grayscale'}`}
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <p className="text-[10px] font-medium leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
