import React from 'react';
import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';
import { Badge } from './Badge';
import { TopBar } from './TopBar';

export function Dashboard() {
  const [showWelcome, setShowWelcome] = React.useState(true);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats = {
    totalDonated: 15420,
    pasteurized: 12340,
    dispensed: 8950,
    smsSent: 47,
  };

  const milkStages = {
    donated: { current: 15420, max: 20000 },
    pasteurized: { current: 12340, max: 20000 },
    dispensed: { current: 8950, max: 20000 },
  };

  const recentActivities = [
    { time: '10:23 AM', action: 'New Donation', details: 'Donor #D-2041 - 500 mL', status: 'active' as const },
    { time: '09:45 AM', action: 'Pasteurization Complete', details: 'Batch #MB-2026-041', status: 'pasteurized' as const },
    { time: '09:12 AM', action: 'Milk Dispensed', details: 'Beneficiary #B-1523 - 250 mL', status: 'dispensed' as const },
    { time: '08:30 AM', action: 'SMS Sent', details: 'Reminder to Donor #D-1892', status: 'dispensed' as const },
    { time: '08:05 AM', action: 'New Donation', details: 'Donor #D-1765 - 350 mL', status: 'active' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with Theme Toggle */}
      <div className="-mx-8 -mt-8 mb-6">
        <TopBar title="Dashboard" subtitle={currentDate} />
      </div>

      {/* Welcome Banner */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 relative overflow-hidden">
          <button
            onClick={() => setShowWelcome(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
          <h2 className="text-white mb-2">Welcome to Makati Milk Bank Inventory System</h2>
          <p className="text-white/90 mb-4">
            System is online and running smoothly. Try the theme toggle in the top bar to switch between light and dark modes!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white/80" style={{ fontSize: 'var(--text-caption)' }}>Quick Tips:</p>
              <p className="text-white">Use top bar theme toggle</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white/80" style={{ fontSize: 'var(--text-caption)' }}>Try:</p>
              <p className="text-white">Instant light/dark switch</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white/80" style={{ fontSize: 'var(--text-caption)' }}>Explore:</p>
              <p className="text-white">All pages adapt automatically</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Donated"
          value={`${stats.totalDonated} mL`}
          valueColor="#10b981"
          trend="↑ 12% from last week"
        />
        <StatCard
          label="Pasteurized"
          value={`${stats.pasteurized} mL`}
          valueColor="#378ADD"
          trend="↑ 8% from last week"
        />
        <StatCard
          label="Dispensed"
          value={`${stats.dispensed} mL`}
          valueColor="#f59e0b"
          trend="↑ 5% from last week"
        />
        <StatCard
          label="SMS Sent Today"
          value={stats.smsSent}
          valueColor="#ef4444"
          trend="47 messages delivered"
        />
      </div>

      {/* Milk Stage Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="mb-6">Milk Stage Overview</h2>
        <div className="space-y-5">
          <ProgressBar
            label="Donated"
            value={milkStages.donated.current}
            max={milkStages.donated.max}
            color="#10b981"
          />
          <ProgressBar
            label="Pasteurized"
            value={milkStages.pasteurized.current}
            max={milkStages.pasteurized.max}
            color="#378ADD"
          />
          <ProgressBar
            label="Dispensed"
            value={milkStages.dispensed.current}
            max={milkStages.dispensed.max}
            color="#f59e0b"
          />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-card dark:bg-[#1E2130] border border-border dark:border-[#2A2D3E] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border dark:border-[#2A2D3E]">
          <h2 className="dark:text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted dark:bg-[#1A1D27]">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Time</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Action</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Details</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index} className="bg-muted dark:bg-[#1A1D27] hover:bg-muted/50 dark:hover:bg-[#2A2D3E] transition-colors border-t border-border dark:border-[#2A2D3E]">
                  <td className="px-6 py-4 text-muted-foreground dark:text-[#9CA3B8]">{activity.time}</td>
                  <td className="px-6 py-4 text-foreground dark:text-white">{activity.action}</td>
                  <td className="px-6 py-4 text-muted-foreground dark:text-[#9CA3B8]">{activity.details}</td>
                  <td className="px-6 py-4">
                    <Badge variant={activity.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
