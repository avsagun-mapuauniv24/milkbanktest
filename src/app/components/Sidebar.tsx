import React, { useState } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  activeItem?: string;
  onNavigate?: (itemId: string) => void;
}

export function Sidebar({ activeItem = 'dashboard', onNavigate }: SidebarProps) {
  const [active, setActive] = useState(activeItem);

  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', color: '#1D9E75' },
    { id: 'inventory', label: 'Inventory', color: '#378ADD' },
    { id: 'donors', label: 'Donors', color: '#8B5CF6' },
    { id: 'beneficiaries', label: 'Beneficiaries', color: '#BA7517' },
    { id: 'sms-logs', label: 'SMS Logs', color: '#D85A30' },
    { id: 'reports', label: 'Reports', color: '#888780' },
    { id: 'users', label: 'Users', color: '#888780' },
  ];

  const handleClick = (itemId: string) => {
    setActive(itemId);
    onNavigate?.(itemId);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[220px] bg-sidebar dark:bg-[#13151F] border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="px-4 py-6 border-b border-sidebar-border dark:border-[#2A2D3E]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0"></div>
          <div>
            <div className="font-bold text-foreground dark:text-white leading-tight">Makati Milk Bank</div>
            <div className="text-muted-foreground dark:text-[#9CA3B8] leading-tight" style={{ fontSize: 'var(--text-caption)' }}>
              Inventory System
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all
                  ${
                    active === item.id
                      ? 'bg-primary/10 dark:bg-[#1D9E7520] border-l-4 border-primary pl-[8px] text-foreground dark:text-white'
                      : 'hover:bg-muted dark:hover:bg-[#2A2D3E] border-l-4 border-transparent pl-[8px] text-foreground dark:text-[#9CA3B8]'
                  }
                `}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-t border-sidebar-border dark:border-[#2A2D3E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral flex-shrink-0 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground dark:text-white truncate">Jane Doe</div>
            <div className="text-muted-foreground dark:text-[#9CA3B8] truncate" style={{ fontSize: 'var(--text-caption)' }}>
              Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
