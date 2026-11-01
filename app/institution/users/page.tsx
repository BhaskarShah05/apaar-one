'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, UserPlus, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function InstitutionUsersPage() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Dr. Rajeshwar Sharma',
      email: 'principal@dit.edu.in',
      role: 'INSTITUTION_ADMIN',
      status: 'ACTIVE',
      mfa: 'ENFORCED_ENABLED',
      lastLogin: 'Today, 08:30 AM',
    },
    {
      id: 'usr-2',
      name: 'Priya Verma',
      email: 'admissions@dit.edu.in',
      role: 'INSTITUTION_OPERATOR',
      status: 'ACTIVE',
      mfa: 'OPTIONAL',
      lastLogin: 'Today, 09:12 AM',
    },
    {
      id: 'usr-3',
      name: 'Dr. K. N. Rao',
      email: 'dean.academic@dit.edu.in',
      role: 'INSTITUTION_OPERATOR',
      status: 'ACTIVE',
      mfa: 'ENFORCED_ENABLED',
      lastLogin: 'Yesterday, 04:45 PM',
    },
  ]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('INSTITUTION_OPERATOR');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: `usr-${Date.now()}`,
        name: newName,
        email: newEmail,
        role: newRole,
        status: 'ACTIVE',
        mfa: 'OPTIONAL',
        lastLogin: 'Invitation Sent',
      },
    ]);
    setInviteModalOpen(false);
    setNewEmail('');
    setNewName('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Institution Users & Least-Privilege Roles</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage authorized staff accounts for admissions submission and compliance returns.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
        >
          <UserPlus className="w-3.5 h-3.5 text-teal-400" />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4">MFA State</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Last Session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-navy-900">
                  {u.name}
                  <span className="block text-[11px] text-slate-400 font-normal">{u.email}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{u.mfa}</span>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={u.status} size="sm" />
                </td>
                <td className="py-3 px-4 text-right text-slate-500 font-mono text-[11px]">
                  {u.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Invite Authorized Operator</h3>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Official Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@dit.edu.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Assigned Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                >
                  <option value="INSTITUTION_OPERATOR">Institution Operator (Upload & Ingestion only)</option>
                  <option value="INSTITUTION_ADMIN">Institution Admin (Full management & approvals)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg font-semibold"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

