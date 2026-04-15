import React, { useState } from 'react';
import { LayoutDashboard, Package, Users, Baby, BarChart3, MessageSquare } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  activeItem?: string;
  onNavigate?: (itemId: string) => void;
}

export function Sidebar({ activeItem = 'dashboard', onNavigate }: SidebarProps) {
  const [active, setActive] = useState(activeItem);

  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'donors', label: 'Donors', icon: <Users size={20} /> },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: <Baby size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'sms-logs', label: 'SMS Logs', icon: <MessageSquare size={20} /> },
  ];

  const handleClick = (itemId: string) => {
    setActive(itemId);
    onNavigate?.(itemId);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 h-screen fixed left-0 top-0 flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20 flex-shrink-0">
            <span className="text-slate-900 font-bold text-lg">🥛</span>
          </div>
          <div className="flex-1">
            <h1 className="text-white font-bold text-sm leading-tight">Makati Milk</h1>
            <p className="text-teal-300 text-xs font-semibold">Inventory System</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
              active === item.id
                ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-300 border-l-2 border-teal-400 shadow-lg shadow-teal-500/10'
                : 'text-slate-300 hover:bg-slate-700/40 hover:text-teal-200'
            }`}
          >
            <span className={`transition-colors ${active === item.id ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-300'}`}>
              {item.icon}
            </span>
            <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
            {active === item.id && (
              <div className="w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-500/50 animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="px-4 py-6 border-t border-slate-700/50 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="px-3 py-4 bg-slate-700/20 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:bg-slate-700/30 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">Admin User</p>
              <p className="text-slate-400 text-xs truncate">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
