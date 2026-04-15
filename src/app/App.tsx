import { useState } from 'react';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Donors } from './components/Donors';
import { Beneficiaries } from './components/Beneficiaries';
import { Reports } from './components/Reports';
import { SMSLogs } from './components/SMSLogs';
import { Users } from './components/Users';
import { ThemeComparison } from './components/ThemeComparison';
import { LoginComparison } from './components/LoginComparison';

type ViewType = 'dashboard' | 'inventory' | 'donors' | 'beneficiaries' | 'sms-logs' | 'reports' | 'users' | 'comparison' | 'login-comparison';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (itemId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(itemId as ViewType);
      setIsTransitioning(false);
    }, 150);
  };

  // Show theme comparison if view is 'comparison'
  if (currentView === 'comparison') {
    return <ThemeComparison />;
  }

  // Show login comparison if view is 'login-comparison'
  if (currentView === 'login-comparison') {
    return <LoginComparison />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="size-full flex bg-slate-950">
      {/* Sidebar */}
      <Sidebar activeItem={currentView} onNavigate={handleNavigate} />

      {/* Main Content with Transition */}
      <div className="flex-1 ml-64 overflow-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="p-8 max-w-7xl mx-auto">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'inventory' && <Inventory />}
            {currentView === 'donors' && <Donors />}
            {currentView === 'beneficiaries' && <Beneficiaries />}
            {currentView === 'reports' && <Reports />}
            {currentView === 'sms-logs' && <SMSLogs />}
            {currentView === 'users' && <Users />}
          </div>
        </div>
      </div>
    </div>
  );
}