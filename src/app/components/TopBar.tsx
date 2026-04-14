import React from 'react';
import { Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export interface TopBarProps {
  title?: string;
  subtitle?: string;
  showThemeToggle?: boolean;
}

export function TopBar({ title, subtitle, showThemeToggle = true }: TopBarProps) {
  return (
    <div className="bg-card dark:bg-[#1A1D27] border-b border-border dark:border-[#2A2D3E] px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Title */}
        <div>
          {title && <h1 className="dark:text-white">{title}</h1>}
          {subtitle && (
            <p className="text-muted-foreground dark:text-[#9CA3B8] mt-1">{subtitle}</p>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {showThemeToggle && <ThemeToggle variant="pill" />}

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-lg hover:bg-muted dark:hover:bg-[#2A2D3E] transition-colors text-muted-foreground dark:text-[#9CA3B8] hover:text-foreground dark:hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-neutral flex items-center justify-center text-white font-medium cursor-pointer hover:opacity-90 transition-opacity">
            JD
          </div>
        </div>
      </div>
    </div>
  );
}
