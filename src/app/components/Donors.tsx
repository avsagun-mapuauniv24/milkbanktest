import React, { useState } from 'react';
import { Search, Plus, Edit2, History } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { DonationHistoryPanel, DonationRecord } from './DonationHistoryPanel';

interface Donor {
  id: string;
  fullName: string;
  contactNumber: string;
  bloodType: string;
  screeningDate: string;
  status: 'active' | 'inactive';
  donations: DonationRecord[];
}

export function Donors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Mock data
  const donorsData: Donor[] = [
    {
      id: 'D-2041',
      fullName: 'Maria Santos',
      contactNumber: '+63 917 123 4567',
      bloodType: 'O+',
      screeningDate: '2026-01-15',
      status: 'active',
      donations: [
        { date: '2026-04-10', lotNumber: 'MB-2026-041', volume: 500 },
        { date: '2026-03-28', lotNumber: 'MB-2026-032', volume: 450 },
        { date: '2026-03-15', lotNumber: 'MB-2026-023', volume: 480 },
        { date: '2026-03-01', lotNumber: 'MB-2026-015', volume: 520 },
      ],
    },
    {
      id: 'D-1892',
      fullName: 'Ana Reyes',
      contactNumber: '+63 917 234 5678',
      bloodType: 'A+',
      screeningDate: '2025-12-20',
      status: 'active',
      donations: [
        { date: '2026-04-12', lotNumber: 'MB-2026-040', volume: 350 },
        { date: '2026-04-01', lotNumber: 'MB-2026-033', volume: 380 },
        { date: '2026-03-18', lotNumber: 'MB-2026-025', volume: 400 },
      ],
    },
    {
      id: 'D-1765',
      fullName: 'Rosa Cruz',
      contactNumber: '+63 917 345 6789',
      bloodType: 'B+',
      screeningDate: '2025-11-10',
      status: 'active',
      donations: [
        { date: '2026-04-08', lotNumber: 'MB-2026-039', volume: 450 },
        { date: '2026-03-25', lotNumber: 'MB-2026-030', volume: 420 },
      ],
    },
    {
      id: 'D-1523',
      fullName: 'Carmen dela Cruz',
      contactNumber: '+63 917 456 7890',
      bloodType: 'AB+',
      screeningDate: '2025-10-05',
      status: 'inactive',
      donations: [
        { date: '2026-02-14', lotNumber: 'MB-2026-010', volume: 300 },
        { date: '2026-01-22', lotNumber: 'MB-2026-005', volume: 350 },
      ],
    },
    {
      id: 'D-1421',
      fullName: 'Luz Garcia',
      contactNumber: '+63 917 567 8901',
      bloodType: 'O-',
      screeningDate: '2025-09-18',
      status: 'active',
      donations: [
        { date: '2026-04-03', lotNumber: 'MB-2026-037', volume: 400 },
        { date: '2026-03-20', lotNumber: 'MB-2026-027', volume: 430 },
        { date: '2026-03-05', lotNumber: 'MB-2026-018', volume: 390 },
      ],
    },
    {
      id: 'D-1358',
      fullName: 'Elena Ramos',
      contactNumber: '+63 917 678 9012',
      bloodType: 'A-',
      screeningDate: '2025-08-22',
      status: 'active',
      donations: [
        { date: '2026-04-11', lotNumber: 'MB-2026-036', volume: 550 },
        { date: '2026-03-29', lotNumber: 'MB-2026-031', volume: 500 },
      ],
    },
    {
      id: 'D-1287',
      fullName: 'Sofia Mendoza',
      contactNumber: '+63 917 789 0123',
      bloodType: 'B-',
      screeningDate: '2025-07-14',
      status: 'inactive',
      donations: [
        { date: '2026-03-10', lotNumber: 'MB-2026-020', volume: 320 },
      ],
    },
  ];

  const handleViewHistory = (donor: Donor) => {
    setSelectedDonor(donor);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedDonor(null), 300); // Wait for animation to complete
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Donors</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Donor
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or contact number..."
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
                <th className="px-6 py-3 text-left font-medium text-foreground">Full Name</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Contact Number</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Blood Type</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Screening Date</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donorsData.map((donor, index) => (
                <tr
                  key={donor.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <td className="px-6 py-4 text-foreground font-medium">{donor.fullName}</td>
                  <td className="px-6 py-4 text-foreground">{donor.contactNumber}</td>
                  <td className="px-6 py-4 text-foreground">{donor.bloodType}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(donor.screeningDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={donor.status === 'active' ? 'active' : 'expired'}>
                      {donor.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleViewHistory(donor)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-secondary/10 transition-colors text-secondary hover:text-secondary"
                        aria-label="View History"
                      >
                        <History className="w-4 h-4" />
                        <span>View History</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donation History Panel */}
      <DonationHistoryPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        donorName={selectedDonor?.fullName || ''}
        donations={selectedDonor?.donations || []}
      />
    </div>
  );
}
