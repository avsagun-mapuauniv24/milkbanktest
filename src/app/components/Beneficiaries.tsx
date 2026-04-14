import React, { useState } from 'react';
import { Search, Plus, Edit2, Eye } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface Beneficiary {
  id: string;
  babyName: string;
  motherName: string;
  contactNumber: string;
  dateAdmitted: string;
  totalReceived: number;
  status: 'active' | 'discharged';
}

export function Beneficiaries() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const beneficiariesData: Beneficiary[] = [
    {
      id: 'B-1523',
      babyName: 'Baby Cruz',
      motherName: 'Jennifer Cruz',
      contactNumber: '+63 917 111 2222',
      dateAdmitted: '2026-04-01',
      totalReceived: 1250,
      status: 'active',
    },
    {
      id: 'B-1522',
      babyName: 'Baby Santos',
      motherName: 'Michelle Santos',
      contactNumber: '+63 917 222 3333',
      dateAdmitted: '2026-03-28',
      totalReceived: 2100,
      status: 'active',
    },
    {
      id: 'B-1521',
      babyName: 'Baby Reyes',
      motherName: 'Amanda Reyes',
      contactNumber: '+63 917 333 4444',
      dateAdmitted: '2026-03-25',
      totalReceived: 1800,
      status: 'discharged',
    },
    {
      id: 'B-1520',
      babyName: 'Baby Garcia',
      motherName: 'Patricia Garcia',
      contactNumber: '+63 917 444 5555',
      dateAdmitted: '2026-03-20',
      totalReceived: 950,
      status: 'active',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Beneficiaries</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Beneficiary
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by baby name or mother name..."
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
                <th className="px-6 py-3 text-left font-medium text-foreground">Baby Name</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Mother Name</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Contact Number</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Date Admitted</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Total Received (mL)</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beneficiariesData.map((beneficiary, index) => (
                <tr
                  key={beneficiary.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <td className="px-6 py-4 text-foreground font-medium">{beneficiary.babyName}</td>
                  <td className="px-6 py-4 text-foreground">{beneficiary.motherName}</td>
                  <td className="px-6 py-4 text-foreground">{beneficiary.contactNumber}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(beneficiary.dateAdmitted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-foreground font-medium">{beneficiary.totalReceived}</td>
                  <td className="px-6 py-4">
                    <Badge variant={beneficiary.status === 'active' ? 'active' : 'expired'}>
                      {beneficiary.status === 'active' ? 'Active' : 'Discharged'}
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-secondary/10 transition-colors text-secondary hover:text-secondary"
                        aria-label="View Details"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
