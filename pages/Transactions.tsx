
import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.tsx';
import { TransactionType } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';

const Transactions: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState(CATEGORIES[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      type,
      category,
    });

    setDescription('');
    setAmount('');
    setShowModal(false);
  };

  const getCategoryIcon = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId)?.icon || '❓';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-slate-800">Transações</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                {getCategoryIcon(t.category)}
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 text-sm">{t.description}</h4>
                <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${t.type === TransactionType.INCOME ? 'text-emerald-500' : 'text-slate-700'}`}>
                {t.type === TransactionType.INCOME ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <button onClick={() => deleteTransaction(t.id)} className="text-[10px] text-rose-400">Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[60]">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Nova Transação</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="number" step="0.01" placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-slate-50 border-0 p-4 rounded-xl" required />
              <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-50 border-0 p-4 rounded-xl" required />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border-0 p-4 rounded-xl">
                {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
              </select>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
