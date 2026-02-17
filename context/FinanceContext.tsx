
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, Budget, FinancialGoal, TransactionType, Badge } from '../types.ts';
import { INITIAL_TRANSACTIONS } from '../constants.tsx';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  goals: FinancialGoal[];
  isPremium: boolean;
  badges: Badge[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setPremium: (status: boolean) => void;
  addGoal: (g: Omit<FinancialGoal, 'id'>) => void;
  updateGoal: (id: string, amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isPremium, setIsPremium] = useState(false);
  const [budgets] = useState<Budget[]>([
    { categoryId: 'cat_food', limit: 800 },
    { categoryId: 'cat_leisure', limit: 300 }
  ]);
  const [goals, setGoals] = useState<FinancialGoal[]>([
    { id: '1', title: 'Viagem Japão', targetAmount: 15000, currentAmount: 2500, deadline: '2025-12-01' }
  ]);
  const [badges] = useState<Badge[]>([
    { id: 'b1', name: 'Primeiros Passos', icon: '🌱', description: 'Registrou sua primeira transação', unlocked: true },
    { id: 'b2', name: 'Poupador Mestre', icon: '🏆', description: 'Economizou 20% do salário', unlocked: false },
    { id: 'b3', name: 'Planejador', icon: '📅', description: 'Criou 3 orçamentos mensais', unlocked: false },
  ]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (g: Omit<FinancialGoal, 'id'>) => {
    const newGoal = { ...g, id: Math.random().toString(36).substr(2, 9) };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g));
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      budgets, 
      goals, 
      isPremium, 
      badges,
      addTransaction, 
      deleteTransaction,
      setPremium: setIsPremium,
      addGoal,
      updateGoal
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within a FinanceProvider");
  return context;
};
