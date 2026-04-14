import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
  };

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#E1F5EE] to-[#B5F0D8] dark:from-[#0A0C14] dark:to-[#0A0C14] transition-colors duration-300">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle variant="pill" />
      </div>

      <div className="w-full max-w-md px-4">
        {/* Login Card */}
        <div className="bg-white dark:bg-[#1E2130] border border-gray-200 dark:border-[#2A2D3E] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center">
            {/* Logo */}
            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center shadow-lg">
              <div className="w-14 h-14 rounded-full bg-white/20"></div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Makati Milk Bank
            </h1>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Inventory System
            </h2>
            <p className="text-muted-foreground dark:text-[#9CA3B8] mt-2">
              Makati Medical Center
            </p>
          </div>

          {/* Login Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block mb-2 text-foreground dark:text-[#F0F2F8] font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@makatimilkbank.org"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-[#2A2D3E] rounded-lg bg-white dark:bg-[#13151F] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#5C6480] focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-foreground dark:text-[#F0F2F8] font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-[#2A2D3E] rounded-lg bg-white dark:bg-[#13151F] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#5C6480] focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9CA3B8] hover:text-gray-600 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2 text-gray-600 dark:text-[#9CA3B8] cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-[#2A2D3E] text-primary focus:ring-2 focus:ring-primary"
                  />
                  Remember me
                </label>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" variant="primary" className="w-full py-3.5 text-base mt-6">
                Login
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#2A2D3E]">
              <p className="text-center text-gray-500 dark:text-[#9CA3B8] mb-2" style={{ fontSize: 'var(--text-caption)' }}>
                Demo Credentials
              </p>
              <div className="space-y-1 text-center">
                <p className="text-gray-600 dark:text-[#9CA3B8]" style={{ fontSize: 'var(--text-caption)' }}>
                  Email: admin@makatimilkbank.org
                </p>
                <p className="text-gray-600 dark:text-[#9CA3B8]" style={{ fontSize: 'var(--text-caption)' }}>
                  Password: admin123
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-[#13151F] px-8 py-4 text-center border-t border-gray-200 dark:border-[#2A2D3E]">
            <p className="text-gray-500 dark:text-[#5C6480]" style={{ fontSize: 'var(--text-caption)' }}>
              © 2026 Makati Medical Center. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
