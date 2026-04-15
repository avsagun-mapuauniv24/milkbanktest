import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeComparison() {
  return (
    <div className="min-h-screen bg-[#E8E9EC] dark:bg-[#080A0F] p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Makati Milk Bank Inventory System
          </h1>
          <p className="text-xl text-muted-foreground">
            Light Mode vs Dark Mode Comparison
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Light Mode Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-gray-900">Light Mode</span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-900">Dashboard</h3>
              </div>
              <div className="p-6 space-y-4 bg-white">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Total Donated</p>
                    <p className="text-2xl font-bold text-green-600">15,420 mL</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Pasteurized</p>
                    <p className="text-2xl font-bold text-blue-600">12,340 mL</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">Donated</span>
                    <span className="text-gray-600">77%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Preview */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-900">Inventory</h3>
              </div>
              <div className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">LOT NUMBER</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">STAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 text-gray-900">MB-2026-041</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          Pasteurized
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50 border-t border-gray-200">
                      <td className="px-4 py-3 text-gray-900">MB-2026-040</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reports Preview */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-900">Reports</h3>
              </div>
              <div className="p-6">
                <div className="bg-white h-32 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="flex gap-2">
                    <div className="w-8 bg-teal-500 h-20 rounded-t"></div>
                    <div className="w-8 bg-blue-500 h-16 rounded-t mt-4"></div>
                    <div className="w-8 bg-amber-500 h-24 rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-[#1E2130] px-6 py-3 rounded-lg shadow-md border border-[#2A2D3E]">
                <Moon className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Dark Mode</span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-[#1E2130] rounded-lg shadow-lg overflow-hidden border border-[#2A2D3E]">
              <div className="bg-[#1A1D27] border-b border-[#2A2D3E] px-6 py-4">
                <h3 className="font-semibold text-white">Dashboard</h3>
              </div>
              <div className="p-6 space-y-4 bg-[#0F1117]">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-4">
                    <p className="text-xs text-[#9CA3B8] mb-1">Total Donated</p>
                    <p className="text-2xl font-bold text-[#1D9E75]">15,420 mL</p>
                  </div>
                  <div className="bg-[#1E2130] border border-[#2A2D3E] rounded-lg p-4">
                    <p className="text-xs text-[#9CA3B8] mb-1">Pasteurized</p>
                    <p className="text-2xl font-bold text-[#378ADD]">12,340 mL</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Donated</span>
                    <span className="text-[#9CA3B8]">77%</span>
                  </div>
                  <div className="h-2 bg-[#2A2D3E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1D9E75] w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Preview */}
            <div className="bg-[#1E2130] rounded-lg shadow-lg overflow-hidden border border-[#2A2D3E]">
              <div className="bg-[#1A1D27] border-b border-[#2A2D3E] px-6 py-4">
                <h3 className="font-semibold text-white">Inventory</h3>
              </div>
              <div className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#1A1D27]">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#9CA3B8]">LOT NUMBER</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#9CA3B8]">STAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#2A2D3E] bg-[#0F1117]">
                      <td className="px-4 py-3 text-white">MB-2026-041</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-[#378ADD]/15 text-[#378ADD] rounded-full text-xs">
                          Pasteurized
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-[#141720] border-t border-[#2A2D3E]">
                      <td className="px-4 py-3 text-white">MB-2026-040</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-[#1D9E75]/15 text-[#1D9E75] rounded-full text-xs">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reports Preview */}
            <div className="bg-[#1E2130] rounded-lg shadow-lg overflow-hidden border border-[#2A2D3E]">
              <div className="bg-[#1A1D27] border-b border-[#2A2D3E] px-6 py-4">
                <h3 className="font-semibold text-white">Reports</h3>
              </div>
              <div className="p-6">
                <div className="bg-[#13151F] h-32 rounded-lg border border-[#2A2D3E] flex items-center justify-center">
                  <div className="flex gap-2">
                    <div className="w-8 bg-[#1D9E75] h-20 rounded-t"></div>
                    <div className="w-8 bg-[#378ADD] h-16 rounded-t mt-4"></div>
                    <div className="w-8 bg-[#EF9F27] h-24 rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Professional medical monitoring system design • Capstone Project 2026
          </p>
        </div>
      </div>
    </div>
  );
}
