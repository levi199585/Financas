
import React from 'react';
import { useFinance } from '../context/FinanceContext.tsx';

const Premium: React.FC = () => {
  const { isPremium, setPremium } = useFinance();

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-black text-indigo-900">Finance+ Pro</h2>
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100">
        <p className="text-slate-500 mb-6">Desbloqueie análises avançadas com IA e conexão bancária.</p>
        <button 
          onClick={() => setPremium(true)}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl"
        >
          {isPremium ? 'Membro Pro Ativo' : 'Assinar por R$ 14,90/mês'}
        </button>
      </div>
    </div>
  );
};

export default Premium;
