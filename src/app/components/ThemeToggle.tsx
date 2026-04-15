import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  variant?: 'pill' | 'icon';
}

export function ThemeToggle({ variant = 'icon' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        className={`relative w-[52px] h-[28px] rounded-full transition-all duration-300 ease-in-out ${
          isDark ? 'bg-[#1A1D27]' : 'bg-white shadow-sm'
        }`}
        aria-label="Toggle theme"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {/* Sun Icon - Left Side */}
        <Sun
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-all duration-300 ${
            isDark ? 'text-gray-600 opacity-40' : 'text-amber-500 opacity-100'
          }`}
        />

        {/* Moon Icon - Right Side */}
        <Moon
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-all duration-300 ${
            isDark ? 'text-blue-400 opacity-100' : 'text-gray-400 opacity-40'
          }`}
        />

        {/* Thumb */}
        <div
          className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ease-in-out ${
            isDark
              ? 'left-1 bg-primary shadow-md'
              : 'right-1 bg-white shadow-lg'
          }`}
        />
      </button>
    );
  }

  // Icon variant (original)
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
