'use client';

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck, UserPlus, Lock, Key, Users } from 'lucide-react';

export default function AicteUsersRolesPage() {
  const [users, setUsers] = useState([
    {
      id: 'usr-aicte-1',
      name: 'Vikram Nair',
      email: 'v.nair@aicte.gov.in',
      role: 'AICTE_REVIEWER',
      division: 'Northern Regional Office',
      mfa: 'ENFORCED_ENABLED',
      status: 'ACTIVE',
      lastLogin: 'Today, 09:30 AM',
    },
    {
      id: 'usr-aicte-2',
      name: 'Dr. S. K. Gupta',
      email: 'policy.director@aicte.gov.in',
      role: 'AICTE_POLICY_ADMIN',
      division: 'Regulation & Policy Bureau',
      mfa: 'ENFORCED_ENABLED',
      status: 'ACTIVE',
      lastLogin: 'Today, 08:15 AM',
    },
    {
      id: 'usr-aicte-3',
      name: 'Anita Deshmukh',
      email: 'system.admin@aicte.gov.in',
      role: 'AICTE_SYSTEM_ADMIN',
      division: 'Technology & Cloud Operations',
      mfa: 'ENFORCED_ENABLED',
      status: 'ACTIVE',
      lastLogin: 'Today, 07:45 AM',
    },
    {
      id: 'usr-aicte-4',
      name: 'Prof. R. C. Meena',
      email: 'rc.meena@aicte.gov.in',
      role: 'AICTE_REVIEWER',
      division: 'Western Regional Office',
      mfa: 'ENFORCED_ENABLED',
      status: 'ACTIVE',
      lastLogin: 'Yesterday, 05:20 PM',
    },
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE Access Control</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Privileged Roles</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">AICTE Bureau Users & MFA Governance</h1>
          <p className="text-xs text-slate-500">
            Enforces multi-factor authentication (MFA) and strict separation of duties between policy publishing and case review.
          </p>
        </div>

        <button
          onClick={() => alert('Invitation workflow requires Digital Certificate sign-off in accordance with SEC-001.')}
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
        >
          <UserPlus className="w-3.5 h-3.5 text-teal-400" />
          <span>Provision Bureau Officer</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Officer Name</th>
              <th className="py-3 px-4">Division / Bureau</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4">MFA State</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-navy-900">
                  {u.name}
                  <span className="block text-[11px] text-slate-400 font-normal">{u.email}</span>
                </td>
                <td className="py-3 px-4 text-slate-700">{u.division}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700 font-bold">
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
                <td className="py-3 px-4 text-right font-mono text-slate-500 text-[11px]">
                  {u.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

