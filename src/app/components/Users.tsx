import React, { useState } from 'react';
import { Search, Plus, Edit2, Key } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export function Users() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const usersData: User[] = [
    {
      id: 'U-001',
      fullName: 'Jane Doe',
      email: 'admin@makatimilkbank.org',
      role: 'Administrator',
      lastLogin: '2026-04-14T10:30:00',
      status: 'active',
    },
    {
      id: 'U-002',
      fullName: 'Dr. Maria Santos',
      email: 'maria.santos@makatimilkbank.org',
      role: 'Medical Staff',
      lastLogin: '2026-04-14T09:15:00',
      status: 'active',
    },
    {
      id: 'U-003',
      fullName: 'Nurse Ana Cruz',
      email: 'ana.cruz@makatimilkbank.org',
      role: 'Nurse',
      lastLogin: '2026-04-13T16:45:00',
      status: 'active',
    },
    {
      id: 'U-004',
      fullName: 'John Reyes',
      email: 'john.reyes@makatimilkbank.org',
      role: 'Data Entry Clerk',
      lastLogin: '2026-04-10T14:20:00',
      status: 'inactive',
    },
  ];

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Users</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or email..."
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
                <th className="px-6 py-3 text-left font-medium text-foreground">Email</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Role</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Last Login</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <td className="px-6 py-4 text-foreground font-medium">{user.fullName}</td>
                  <td className="px-6 py-4 text-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.role}</td>
                  <td className="px-6 py-4 text-muted-foreground">{formatDateTime(user.lastLogin)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'active' ? 'active' : 'expired'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-warning/10 transition-colors text-warning hover:text-warning"
                        aria-label="Reset Password"
                      >
                        <Key className="w-4 h-4" />
                        <span>Reset</span>
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
