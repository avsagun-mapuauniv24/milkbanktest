import React, { useState } from 'react';
import { Search, Send, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface SMSLog {
  id: string;
  dateTime: string;
  recipientName: string;
  phoneNumber: string;
  message: string;
  status: 'sent' | 'failed';
}

export function SMSLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Mock data
  const smsLogsData: SMSLog[] = [
    {
      id: 'SMS-001',
      dateTime: '2026-04-14T10:23:00',
      recipientName: 'Maria Santos',
      phoneNumber: '+63 917 123 4567',
      message: 'Dear Maria, thank you for your donation on April 10. Your milk has been successfully pasteurized and is ready for dispensing. Your contribution helps save lives.',
      status: 'sent',
    },
    {
      id: 'SMS-002',
      dateTime: '2026-04-14T09:45:00',
      recipientName: 'Ana Reyes',
      phoneNumber: '+63 917 234 5678',
      message: 'Reminder: Your next donation appointment is scheduled for April 20, 2026 at 10:00 AM. Please confirm your attendance.',
      status: 'sent',
    },
    {
      id: 'SMS-003',
      dateTime: '2026-04-14T09:12:00',
      recipientName: 'Baby Care Unit',
      phoneNumber: '+63 917 345 6789',
      message: 'Milk batch MB-2026-041 has been dispensed to Beneficiary #B-1523. Volume: 250 mL. Please acknowledge receipt.',
      status: 'sent',
    },
    {
      id: 'SMS-004',
      dateTime: '2026-04-14T08:30:00',
      recipientName: 'Rosa Cruz',
      phoneNumber: '+63 917 456 7890',
      message: 'Thank you for your interest in becoming a milk donor. Your screening appointment is confirmed for April 18, 2026.',
      status: 'failed',
    },
    {
      id: 'SMS-005',
      dateTime: '2026-04-13T16:20:00',
      recipientName: 'Carmen dela Cruz',
      phoneNumber: '+63 917 567 8901',
      message: 'Your donated milk (Lot MB-2026-040) has passed quality checks and has been added to our inventory. Thank you!',
      status: 'sent',
    },
    {
      id: 'SMS-006',
      dateTime: '2026-04-13T14:15:00',
      recipientName: 'Luz Garcia',
      phoneNumber: '+63 917 678 9012',
      message: 'Reminder: Please ensure proper storage of expressed milk. Keep refrigerated at 4°C or below. We look forward to your next donation.',
      status: 'sent',
    },
    {
      id: 'SMS-007',
      dateTime: '2026-04-13T11:30:00',
      recipientName: 'Elena Ramos',
      phoneNumber: '+63 917 789 0123',
      message: 'Alert: Your milk lot MB-2026-036 is approaching expiry date (April 20). Please advise on priority dispensing.',
      status: 'failed',
    },
    {
      id: 'SMS-008',
      dateTime: '2026-04-13T10:05:00',
      recipientName: 'Sofia Mendoza',
      phoneNumber: '+63 917 890 1234',
      message: 'Thank you for your donation. Your contribution of 380 mL has been received and logged as Lot MB-2026-035.',
      status: 'sent',
    },
    {
      id: 'SMS-009',
      dateTime: '2026-04-12T15:45:00',
      recipientName: 'Isabel Torres',
      phoneNumber: '+63 917 901 2345',
      message: 'Your screening results are available. You have been approved as a donor. Welcome to the Makati Milk Bank program!',
      status: 'sent',
    },
    {
      id: 'SMS-010',
      dateTime: '2026-04-12T13:20:00',
      recipientName: 'Neonatal ICU',
      phoneNumber: '+63 917 012 3456',
      message: 'Emergency request fulfilled. 500 mL of pasteurized milk dispatched. Estimated arrival: 30 minutes.',
      status: 'sent',
    },
  ];

  const truncateMessage = (message: string, maxLength: number = 50): string => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalPages = Math.ceil(smsLogsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = smsLogsData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>SMS Logs</h1>
        <Button variant="primary">
          <Send className="w-4 h-4 mr-2" />
          Send SMS Now
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by recipient name, phone, or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-foreground">Date & Time</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Recipient Name</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Phone Number</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Message</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {formatDateTime(log.dateTime)}
                  </td>
                  <td className="px-6 py-4 text-foreground font-medium">{log.recipientName}</td>
                  <td className="px-6 py-4 text-foreground">{log.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{truncateMessage(log.message)}</span>
                      <button
                        onClick={() => setSelectedMessage(log.message)}
                        className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-sm">View</span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={log.status === 'sent' ? 'active' : 'expired'}>
                      {log.status === 'sent' ? 'Sent' : 'Failed'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, smsLogsData.length)} of{' '}
            {smsLogsData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedMessage(null)}
          ></div>
          <div className="relative bg-card rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="px-6 py-4 border-b border-border">
              <h2>Full Message</h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-foreground leading-relaxed">{selectedMessage}</p>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end">
              <Button variant="secondary" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
