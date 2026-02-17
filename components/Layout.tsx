
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (p: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Início' },
    { id: 'transactions', icon: '💸', label: 'Extrato' },
    { id: 'budgets', icon: '🎯', label: 'Limites' },
    { id: 'goals', icon: '⭐', label: 'Metas' },
    { id: 'premium', icon: '💎', label: 'Premium' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="p-4 bg-indigo-600 text-white flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold">Finance+</h1>
        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-sm font-semibold">
          JD
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 flex justify-between items-center max-w-md mx-auto z-50">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`flex flex-col items-center transition-colors ${currentPage === item.id ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
