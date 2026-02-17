
import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext.tsx';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Transactions from './pages/Transactions.tsx';
import Budgets from './pages/Budgets.tsx';
import Goals from './pages/Goals.tsx';
import Premium from './pages/Premium.tsx';
import { Page } from './types.ts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'budgets': return <Budgets />;
      case 'goals': return <Goals />;
      case 'premium': return <Premium />;
      default: return <Dashboard />;
    }
  };

  return (
    <FinanceProvider>
      <Layout currentPage={currentPage} setPage={setCurrentPage}>
        {renderPage()}
      </Layout>
    </FinanceProvider>
  );
};

export default App;
