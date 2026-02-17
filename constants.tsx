
import { Category, Transaction, TransactionType } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat_food', name: 'Alimentação', icon: '🍔', color: '#f59e0b' },
  { id: 'cat_transport', name: 'Transporte', icon: '🚗', color: '#3b82f6' },
  { id: 'cat_housing', name: 'Moradia', icon: '🏠', color: '#ef4444' },
  { id: 'cat_leisure', name: 'Lazer', icon: '🎬', color: '#8b5cf6' },
  { id: 'cat_salary', name: 'Salário', icon: '💰', color: '#10b981' },
  { id: 'cat_health', name: 'Saúde', icon: '🏥', color: '#ec4899' },
  { id: 'cat_education', name: 'Educação', icon: '📚', color: '#6366f1' },
  { id: 'cat_others', name: 'Outros', icon: '📦', color: '#64748b' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 5000,
    date: new Date().toISOString(),
    category: 'cat_salary',
    type: TransactionType.INCOME,
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 450.20,
    date: new Date().toISOString(),
    category: 'cat_food',
    type: TransactionType.EXPENSE,
  },
  {
    id: '3',
    description: 'Uber Trabalho',
    amount: 32.50,
    date: new Date().toISOString(),
    category: 'cat_transport',
    type: TransactionType.EXPENSE,
  },
  {
    id: '4',
    description: 'Aluguel',
    amount: 1200,
    date: new Date().toISOString(),
    category: 'cat_housing',
    type: TransactionType.EXPENSE,
  },
];
