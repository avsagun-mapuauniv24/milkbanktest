import React from 'react';
import { TrendingUp, Package, Users, Baby, Activity } from 'lucide-react';
import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';
import { Badge } from './Badge';
import { TopBar } from './TopBar';
import { Card } from './Card';

export function Dashboard() {
  const [showWelcome, setShowWelcome] = React.useState(true);

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
    { time: '10:23 AM', action: 'New Donation', details: 'Donor #D-2041 - 500 mL', status: 'active' as const, icon: '➕' },
    { time: '09:45 AM', action: 'Pasteurization Complete', details: 'Batch #MB-2026-041', status: 'pasteurized' as const, icon: '✓' },
    { time: '09:12 AM', action: 'Milk Dispensed', details: 'Beneficiary #B-1523 - 250 mL', status: 'dispensed' as const, icon: '📦' },
    { time: '08:30 AM', action: 'SMS Sent', details: 'Reminder to Donor #D-1892', status: 'dispensed' as const, icon: '💬' },
    { time: '08:05 AM', action: 'New Donation', details: 'Donor #D-1765 - 350 mL', status: 'active' as const, icon: '➕' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Top Bar */}
      <div className="-mx-8 -mt-8 mb-8">
        <TopBar />
      </div>

      {/* Welcome Banner */}
      {showWelcome && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-600/30 via-cyan-600/20 to-blue-700/30 border border-teal-500/50 p-6 backdrop-blur">
          <button
            onClick={() => setShowWelcome(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
          <div className="max-w-2xl">
            <h2 className="text-white text-xl font-bold mb-2">Welcome to Makati Milk Bank Inventory System 🥛</h2>
            <p className="text-white/80 mb-4">
              Your modern admin dashboard for managing milk donations, inventory, and beneficiary distribution. System is online and running smoothly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <p className="text-white/70 text-xs font-semibold mb-1">🎨 Modern Design</p>
                <p className="text-white text-sm">Dark theme with teal/green accents</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <p className="text-white/70 text-xs font-semibold mb-1">⚡ Real-time Updates</p>
                <p className="text-white text-sm">Live dashboard metrics</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <p className="text-white/70 text-xs font-semibold mb-1">📊 Analytics Ready</p>
                <p className="text-white text-sm">Detailed reports & insights</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Donated"
          value={`${stats.totalDonated}`}
          icon={<TrendingUp className="w-5 h-5 text-teal-400" />}
          trend="↑ 12% from last week"
          gradient="teal"
        />
        <StatCard
          label="Pasteurized"
          value={`${stats.pasteurized}`}
          icon={<Package className="w-5 h-5 text-cyan-400" />}
          trend="↑ 8% from last week"
          gradient="cyan"
        />
        <StatCard
          label="Dispensed"
          value={`${stats.dispensed}`}
          icon={<Activity className="w-5 h-5 text-purple-400" />}
          trend="↑ 5% from last week"
          gradient="purple"
        />
        <StatCard
          label="SMS Sent Today"
          value={stats.smsSent}
          icon={<Users className="w-5 h-5 text-teal-400" />}
          trend="47 messages delivered"
          gradient="teal"
        />
      </div>

      {/* Milk Stage Overview */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-1">Milk Stage Overview</h2>
          <p className="text-slate-400 text-sm">Current inventory distribution by processing stage</p>
        </div>
        <div className="space-y-6">
          <ProgressBar
            label="Donated"
            value={milkStages.donated.current}
            max={milkStages.donated.max}
            color="teal"
          />
          <ProgressBar
            label="Pasteurized"
            value={milkStages.pasteurized.current}
            max={milkStages.pasteurized.max}
            color="cyan"
          />
          <ProgressBar
            label="Dispensed"
            value={milkStages.dispensed.current}
            max={milkStages.dispensed.max}
            color="purple"
          />
        </div>
      </Card>

      {/* Recent Activity Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-6 border-b border-slate-700/50 flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-bold mb-1">Recent Activity</h2>
            <p className="text-slate-400 text-sm">Latest system activities and updates</p>
          </div>
          <Activity className="text-teal-400 w-6 h-6" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700/30 border-b border-slate-700/50">
                <th className="px-6 py-4 text-left font-semibold text-teal-300 text-sm uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left font-semibold text-teal-300 text-sm uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left font-semibold text-teal-300 text-sm uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left font-semibold text-teal-300 text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors last:border-b-0 group"
                >
                  <td className="px-6 py-4">
                    <span className="text-slate-300 text-sm font-medium">{activity.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{activity.icon}</span>
                      <span className="text-slate-200 font-medium">{activity.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{activity.details}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={activity.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
