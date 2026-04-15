import React, { useState } from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { Button } from './Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TopBar } from './TopBar';

export function Reports() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-04-14');
  const [reportType, setReportType] = useState('donation-summary');

  // Mock data for the chart
  const chartData = [
    { month: 'Jan', donated: 4200, pasteurized: 3800, dispensed: 3200 },
    { month: 'Feb', donated: 3800, pasteurized: 3500, dispensed: 2900 },
    { month: 'Mar', donated: 5100, pasteurized: 4700, dispensed: 4100 },
    { month: 'Apr', donated: 4500, pasteurized: 4200, dispensed: 3600 },
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', { startDate, endDate, reportType });
    // Here you would typically fetch report data from your backend
  };

  const handleExportPDF = () => {
    console.log('Exporting as PDF');
    // Here you would implement PDF export logic
  };

  const handleExportExcel = () => {
    console.log('Exporting as Excel');
    // Here you would implement Excel export logic
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="-mx-8 -mt-8 mb-6">
        <TopBar title="Reports" subtitle="Generate and export system reports" />
      </div>

      {/* Filter Bar */}
      <div className="bg-card dark:bg-[#1E2130] border border-border dark:border-[#2A2D3E] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block mb-2 dark:text-[#9CA3B8]">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-ring dark:text-white"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block mb-2 dark:text-[#9CA3B8]">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-ring dark:text-white"
            />
          </div>

          {/* Report Type */}
          <div>
            <label htmlFor="reportType" className="block mb-2 dark:text-[#9CA3B8]">
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-ring dark:text-white"
            >
              <option value="donation-summary">Donation Summary</option>
              <option value="dispensing-log">Dispensing Log</option>
              <option value="inventory-status">Inventory Status</option>
              <option value="donor-activity">Donor Activity</option>
            </select>
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <Button variant="primary" className="w-full" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-card dark:bg-[#1E2130] border border-border dark:border-[#2A2D3E] rounded-lg p-6">
        <div className="mb-6">
          <h2 className="dark:text-white">Monthly Milk Bank Activity</h2>
          <p className="text-muted-foreground dark:text-[#9CA3B8] mt-1">
            Volume in milliliters (mL) from {new Date(startDate).toLocaleDateString()} to{' '}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px] bg-background dark:bg-[#13151F] rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3E" className="dark:stroke-[#2A2D3E]" />
              <XAxis
                dataKey="month"
                stroke="#9CA3B8"
                style={{ fontSize: '14px' }}
              />
              <YAxis
                stroke="#9CA3B8"
                style={{ fontSize: '14px' }}
                label={{ value: 'Volume (mL)', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fill: '#9CA3B8' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--foreground)',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '14px', color: 'var(--foreground)' }}
                iconType="circle"
              />
              <Bar dataKey="donated" fill="#1D9E75" name="Donated" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pasteurized" fill="#378ADD" name="Pasteurized" radius={[4, 4, 0, 0]} />
              <Bar dataKey="dispensed" fill="#EF9F27" name="Dispensed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Buttons */}
        <div className="mt-8 pt-6 border-t border-border dark:border-[#2A2D3E] flex items-center justify-center gap-4">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-danger text-danger rounded-md hover:bg-danger/5 dark:hover:bg-danger/10 transition-colors font-medium"
          >
            <FileDown className="w-4 h-4" />
            Export as PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#10b981] text-[#10b981] rounded-md hover:bg-[#10b981]/5 dark:hover:bg-[#10b981]/10 transition-colors font-medium"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
}
