'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Search, Filter, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export default function VerifierRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/v1/verifications');
        const json = await res.json();
        if (json.data) {
          setRequests(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = requests.filter(r => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Verification Query Ledger</h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical log of all student academic verification queries and digital consent statuses.
          </p>
        </div>

        <Link
          href="/verifier/new-request"
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
        >
          <span>+ New Query</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-bold text-slate-700">Filter Status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
        >
          <option value="ALL">All Queries ({requests.length})</option>
          <option value="APPROVED">Approved & Verified ({requests.filter(r => r.status === 'APPROVED').length})</option>
          <option value="PENDING_STUDENT_CONSENT">Pending Consent ({requests.filter(r => r.status === 'PENDING_STUDENT_CONSENT').length})</option>
          <option value="DECLINED">Declined ({requests.filter(r => r.status === 'DECLINED').length})</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Request ID</th>
              <th className="py-3 px-4">Candidate Name</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">Claim Scope</th>
              <th className="py-3 px-4">Consent Status</th>
              <th className="py-3 px-4">Expires</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono font-bold text-navy-900">{r.id}</td>
                <td className="py-3 px-4 font-semibold text-navy-900">{r.studentName}</td>
                <td className="py-3 px-4 text-slate-700">{r.purpose.replace(/_/g, ' ')}</td>
                <td className="py-3 px-4 font-mono text-[10px] text-govblue-700">{r.claimType}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={r.status} size="sm" />
                </td>
                <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                  {new Date(r.expiresAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/verifier/requests/${r.id}`}
                    className="inline-flex items-center gap-1 text-[11px] text-govblue-600 font-semibold hover:underline"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

