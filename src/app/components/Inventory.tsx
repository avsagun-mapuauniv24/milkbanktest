import React, { useState } from 'react';
import { Search, Plus, Edit2, Eye, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { AddLotModal, LotFormData } from './AddLotModal';
import { TopBar } from './TopBar';

interface InventoryLot {
  lotNumber: string;
  donorName: string;
  volume: number;
  collectionDate: string;
  expiryDate: string;
  stage: 'active' | 'pasteurized' | 'dispensed' | 'expired';
}

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock data
  const inventoryData: InventoryLot[] = [
    {
      lotNumber: 'MB-2026-041',
      donorName: 'Maria Santos',
      volume: 500,
      collectionDate: '2026-04-10',
      expiryDate: '2026-04-15',
      stage: 'pasteurized',
    },
    {
      lotNumber: 'MB-2026-040',
      donorName: 'Ana Reyes',
      volume: 350,
      collectionDate: '2026-04-12',
      expiryDate: '2026-05-20',
      stage: 'active',
    },
    {
      lotNumber: 'MB-2026-039',
      donorName: 'Rosa Cruz',
      volume: 450,
      collectionDate: '2026-04-08',
      expiryDate: '2026-04-14',
      stage: 'pasteurized',
    },
    {
      lotNumber: 'MB-2026-038',
      donorName: 'Carmen dela Cruz',
      volume: 300,
      collectionDate: '2026-04-05',
      expiryDate: '2026-05-10',
      stage: 'dispensed',
    },
    {
      lotNumber: 'MB-2026-037',
      donorName: 'Luz Garcia',
      volume: 400,
      collectionDate: '2026-04-03',
      expiryDate: '2026-03-15',
      stage: 'expired',
    },
    {
      lotNumber: 'MB-2026-036',
      donorName: 'Elena Ramos',
      volume: 550,
      collectionDate: '2026-04-11',
      expiryDate: '2026-05-25',
      stage: 'active',
    },
    {
      lotNumber: 'MB-2026-035',
      donorName: 'Sofia Mendoza',
      volume: 380,
      collectionDate: '2026-04-09',
      expiryDate: '2026-05-18',
      stage: 'pasteurized',
    },
    {
      lotNumber: 'MB-2026-034',
      donorName: 'Isabel Torres',
      volume: 420,
      collectionDate: '2026-04-07',
      expiryDate: '2026-05-15',
      stage: 'dispensed',
    },
  ];

  // Check if expiry is within 48 hours
  const isExpiringSoon = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffInHours = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours > 0 && diffInHours <= 48;
  };

  const totalPages = Math.ceil(inventoryData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = inventoryData.slice(startIndex, endIndex);

  const handleSaveLot = (data: LotFormData) => {
    console.log('New lot data:', data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="space-y-6">
      {/* Add Lot Modal */}
      <AddLotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveLot}
      />

      {/* Top Bar */}
      <div className="-mx-8 -mt-8 mb-6">
        <TopBar title="Inventory" subtitle="Manage milk bank inventory and lots" />
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-[#9CA3B8]" />
          <input
            type="text"
            placeholder="Search by lot number or donor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#1E2130] focus:outline-none focus:ring-2 focus:ring-ring dark:text-white placeholder:text-muted-foreground dark:placeholder:text-[#5C6480]"
          />
        </div>

        {/* Stage Filter Dropdown */}
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-4 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#1E2130] focus:outline-none focus:ring-2 focus:ring-ring dark:text-white"
        >
          <option value="all">All Stages</option>
          <option value="active">Active</option>
          <option value="pasteurized">Pasteurized</option>
          <option value="dispensed">Dispensed</option>
          <option value="expired">Expired</option>
        </select>

        {/* Add New Lot Button */}
        <Button variant="primary" className="ml-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Lot
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-card dark:bg-[#1E2130] border border-border dark:border-[#2A2D3E] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted dark:bg-[#1A1D27] border-b border-border dark:border-[#2A2D3E]">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Lot Number</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Donor Name</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Volume (mL)</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Collection Date</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Expiry Date</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Stage</th>
                <th className="px-6 py-3 text-left font-medium text-foreground dark:text-[#9CA3B8] uppercase tracking-wider" style={{ fontSize: 'var(--text-caption)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((lot, index) => {
                const isExpiring = isExpiringSoon(lot.expiryDate);
                return (
                  <tr
                    key={lot.lotNumber}
                    className={`border-b border-border dark:border-[#2A2D3E] hover:bg-muted/50 dark:hover:bg-[#2A2D3E] transition-colors ${
                      index % 2 === 0
                        ? 'bg-background dark:bg-[#0F1117]'
                        : 'bg-muted/20 dark:bg-[#141720]'
                    } ${isExpiring ? 'dark:bg-[#D85A3015]' : ''}`}
                  >
                    <td className="px-6 py-4 text-foreground dark:text-white font-medium">{lot.lotNumber}</td>
                    <td className="px-6 py-4 text-foreground dark:text-white">{lot.donorName}</td>
                    <td className="px-6 py-4 text-foreground dark:text-white">{lot.volume}</td>
                    <td className="px-6 py-4 text-muted-foreground dark:text-[#9CA3B8]">
                      {new Date(lot.collectionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground dark:text-[#9CA3B8]">
                      <div className="flex items-center gap-2">
                        {isExpiring && (
                          <AlertCircle className="w-4 h-4 text-danger" />
                        )}
                        {new Date(lot.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={lot.stage} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded hover:bg-muted dark:hover:bg-[#2A2D3E] transition-colors text-muted-foreground dark:text-[#9CA3B8] hover:text-primary"
                          aria-label="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-muted dark:hover:bg-[#2A2D3E] transition-colors text-muted-foreground dark:text-[#9CA3B8] hover:text-secondary"
                          aria-label="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, inventoryData.length)} of{' '}
            {inventoryData.length} entries
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
    </div>
  );
}
