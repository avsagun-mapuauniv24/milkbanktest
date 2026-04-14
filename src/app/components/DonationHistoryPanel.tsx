import React from 'react';
import { X } from 'lucide-react';

export interface DonationRecord {
  date: string;
  lotNumber: string;
  volume: number;
}

export interface DonationHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  donorName: string;
  donations: DonationRecord[];
}

export function DonationHistoryPanel({ isOpen, onClose, donorName, donations }: DonationHistoryPanelProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-card border-l border-border shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2>Donation History</h2>
            <p className="text-muted-foreground mt-1">{donorName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="px-6 py-6 overflow-y-auto h-[calc(100vh-88px)]">
          {donations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No donation history available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{donation.lotNumber}</p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-caption)' }}>
                        {new Date(donation.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{donation.volume} mL</p>
                    </div>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Math.min((donation.volume / 600) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Total Donated</p>
                  <p className="text-2xl font-bold text-primary">
                    {donations.reduce((sum, d) => sum + d.volume, 0).toLocaleString()} mL
                  </p>
                </div>
                <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-caption)' }}>
                  {donations.length} {donations.length === 1 ? 'donation' : 'donations'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
