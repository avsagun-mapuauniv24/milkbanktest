import React from 'react';
import { Eye } from 'lucide-react';

export function LoginComparison() {
  return (
    <div className="min-h-screen bg-[#E8E9EC] p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Makati Milk Bank Login Design
          </h1>
          <p className="text-xl text-gray-600">
            Light Mode vs Dark Mode Comparison
          </p>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-2 gap-12">
          {/* Light Mode */}
          <div>
            <div className="text-center mb-6">
              <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
                <span className="font-semibold text-gray-900">☀️ Light Mode</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#E1F5EE] to-[#B5F0D8] rounded-2xl p-12 shadow-xl">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                {/* Header */}
                <div className="px-8 pt-10 pb-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1D9E75] mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-white/20"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Makati Milk Bank
                  </h2>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Inventory System
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    Makati Medical Center
                  </p>
                </div>

                {/* Form */}
                <div className="px-8 pb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-gray-900 font-medium text-sm">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="admin@makatimilkbank.org"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-gray-900 font-medium text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                          disabled
                        />
                        <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded" disabled />
                        Remember me
                      </label>
                      <a href="#" className="text-[#1D9E75] font-medium">
                        Forgot password?
                      </a>
                    </div>

                    <button className="w-full py-3 bg-[#1D9E75] text-white rounded-lg font-medium mt-6">
                      Login
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
                  <p className="text-gray-500 text-xs">
                    © 2026 Makati Medical Center
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode */}
          <div>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#1E2130] px-6 py-3 rounded-lg shadow-md border border-[#2A2D3E]">
                <span className="font-semibold text-white">🌙 Dark Mode</span>
              </div>
            </div>

            <div className="bg-[#0A0C14] rounded-2xl p-12 shadow-xl">
              <div className="bg-[#1E2130] border border-[#2A2D3E] rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                {/* Header */}
                <div className="px-8 pt-10 pb-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1D9E75] mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-white/20"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Makati Milk Bank
                  </h2>
                  <h3 className="text-lg font-semibold text-white">
                    Inventory System
                  </h3>
                  <p className="text-[#9CA3B8] mt-2 text-sm">
                    Makati Medical Center
                  </p>
                </div>

                {/* Form */}
                <div className="px-8 pb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-[#F0F2F8] font-medium text-sm">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="admin@makatimilkbank.org"
                        className="w-full px-4 py-3 border border-[#2A2D3E] rounded-lg bg-[#13151F] text-white text-sm placeholder:text-[#5C6480]"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-[#F0F2F8] font-medium text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-12 border border-[#2A2D3E] rounded-lg bg-[#13151F] text-white text-sm placeholder:text-[#5C6480]"
                          disabled
                        />
                        <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3B8]" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <label className="flex items-center gap-2 text-[#9CA3B8]">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded" disabled />
                        Remember me
                      </label>
                      <a href="#" className="text-[#1D9E75] font-medium">
                        Forgot password?
                      </a>
                    </div>

                    <button className="w-full py-3 bg-[#1D9E75] text-white rounded-lg font-medium mt-6">
                      Login
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-[#13151F] px-8 py-4 text-center border-t border-[#2A2D3E]">
                  <p className="text-[#5C6480] text-xs">
                    © 2026 Makati Medical Center
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Clean, trustworthy, hospital-style login design • Capstone Project 2026
          </p>
        </div>
      </div>
    </div>
  );
}
