import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export function Modal({ isOpen, onClose, title, children, width = '480px' }: ModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/80"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="relative bg-card dark:bg-[#1E2130] border border-transparent dark:border-[#2A2D3E] shadow-xl max-h-[90vh] overflow-y-auto"
        style={{ width: width, maxWidth: '90vw', borderRadius: '12px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-[#2A2D3E]">
          <h2 className="dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted dark:hover:bg-[#2A2D3E] transition-colors text-muted-foreground dark:text-[#9CA3B8] hover:text-foreground dark:hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
