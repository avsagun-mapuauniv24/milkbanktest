import React, { useState, useRef, useEffect } from 'react';
import { Bell, Clock, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export interface TopBarProps {
  title?: string;
  subtitle?: string;
  showThemeToggle?: boolean;
  onLogout?: () => void;
}

export function TopBar({ title = 'Dashboard', subtitle = 'System Overview & Statistics', showThemeToggle = true, onLogout }: TopBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      onLogout?.();
      window.location.href = '/signin.html';
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 px-8 py-6 shadow-xl">
      <div className="flex items-center justify-between">
        {/* Left Side - Title and Date */}
        <div className="flex-1">
          {title && <h1 className="text-white text-3xl font-bold mb-1">{title}</h1>}
          <div className="flex items-center gap-2">
            {subtitle && (
              <p className="text-slate-400 text-sm">{subtitle}</p>
            )}
            <span className="inline-flex items-center gap-1 text-slate-400 text-sm">
              <Clock size={14} />
              {currentDate}
            </span>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-lg hover:bg-slate-700/40 transition-all duration-300 text-slate-400 hover:text-teal-300 group"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 transition-colors" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></span>
          </button>

          {/* Theme Toggle */}
          {showThemeToggle && <ThemeToggle variant="pill" />}

          {/* User Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:scale-110"
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              A
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
