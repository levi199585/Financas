
import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Premium: React.FC = () => {
  const { isPremium, setPremium } = useFinance();

  const benefits = [
    { icon: '🏦', title: 'Conexão Bancária', desc: 'Importação automática de extratos e cartões.' },
    { icon: '🤖', title: 'Consultoria IA Pro', desc: 'Análise detalhada e personalizada do seu perfil.' },
    { icon: '☁️', title: 'Sincronização Nuvem', desc: 'Acesse de qualquer dispositivo sem perder dados.' },
    { icon: '📁', title: 'Exportação PDF/Excel', desc: 'Relatórios avançados para contadores e gestão.' },
    { icon: '🔔', title: 'Alertas Inteligentes', desc: 'Notificações preditivas sobre seus gastos.' },
  ];

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center space-y-2 py-4">
        <h2 className="text-3xl font-black text-indigo-900 leading-tight">Desbloqueie o <span className="text-indigo-600">Finance+ Pro</span></h2>
        <p className="text-slate-500 text-sm">Controle total da sua vida financeira na palma da mão.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 space-y-6">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl shrink-0">
              {benefit.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{benefit.title}</h4>
              <p className="text-xs text-slate-500">{benefit.desc}</p>
            </div>
          </div>
        ))}

        <div className="pt-4 space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-4 relative overflow-hidden cursor-pointer" onClick={() => setPremium(true)}>
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className="text-xs opacity-80">Plano Anual</p>
                <p className="text-xl font-bold">R$ 14,90/mês</p>
              </div>
              <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Economize 40%</span>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          </div>

          <div className="bg-slate-100 text-slate-800 rounded-2xl p-4 cursor-pointer" onClick={() => setPremium(true)}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-60">Plano Mensal</p>
                <p className="text-xl font-bold">R$ 24,90/mês</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-center text-slate-400">7 dias grátis para novos usuários. Cancele quando quiser.</p>
      </div>

      {isPremium && (
        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl text-center font-bold">
          🎉 Você já é um membro Premium!
        </div>
      )}
    </div>
  );
};

export default Premium;
