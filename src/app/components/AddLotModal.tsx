import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

export interface AddLotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: LotFormData) => void;
}

export interface LotFormData {
  lotNumber: string;
  donorName: string;
  volume: string;
  collectionDate: string;
  expiryDate: string;
  stage: string;
}

export function AddLotModal({ isOpen, onClose, onSave }: AddLotModalProps) {
  const [formData, setFormData] = useState<LotFormData>({
    lotNumber: '',
    donorName: '',
    volume: '',
    collectionDate: '',
    expiryDate: '',
    stage: 'donated',
  });

  const donors = [
    'Maria Santos',
    'Ana Reyes',
    'Rosa Cruz',
    'Carmen dela Cruz',
    'Luz Garcia',
    'Elena Ramos',
    'Sofia Mendoza',
    'Isabel Torres',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      lotNumber: '',
      donorName: '',
      volume: '',
      collectionDate: '',
      expiryDate: '',
      stage: 'donated',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Milk Lot">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Lot Number */}
        <div>
          <label htmlFor="lotNumber" className="block mb-2 dark:text-[#9CA3B8]">
            Lot Number
          </label>
          <input
            type="text"
            id="lotNumber"
            name="lotNumber"
            value={formData.lotNumber}
            onChange={handleChange}
            required
            placeholder="e.g., MB-2026-042"
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white placeholder:text-muted-foreground dark:placeholder:text-[#5C6480]"
          />
        </div>

        {/* Donor Name */}
        <div>
          <label htmlFor="donorName" className="block mb-2 dark:text-[#9CA3B8]">
            Donor Name
          </label>
          <select
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
          >
            <option value="">Select a donor</option>
            {donors.map((donor) => (
              <option key={donor} value={donor}>
                {donor}
              </option>
            ))}
          </select>
        </div>

        {/* Volume */}
        <div>
          <label htmlFor="volume" className="block mb-2 dark:text-[#9CA3B8]">
            Volume in mL
          </label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            required
            min="1"
            placeholder="e.g., 500"
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white placeholder:text-muted-foreground dark:placeholder:text-[#5C6480]"
          />
        </div>

        {/* Collection Date */}
        <div>
          <label htmlFor="collectionDate" className="block mb-2 dark:text-[#9CA3B8]">
            Collection Date
          </label>
          <input
            type="date"
            id="collectionDate"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label htmlFor="expiryDate" className="block mb-2 dark:text-[#9CA3B8]">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
          />
        </div>

        {/* Stage */}
        <div>
          <label htmlFor="stage" className="block mb-2 dark:text-[#9CA3B8]">
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input dark:border-[#2A2D3E] rounded-md bg-input-background dark:bg-[#13151F] focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
          >
            <option value="donated">Donated</option>
            <option value="pasteurized">Pasteurized</option>
            <option value="dispensed">Dispensed</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Lot
          </Button>
        </div>
      </form>
    </Modal>
  );
}
