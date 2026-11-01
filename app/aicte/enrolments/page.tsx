'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  Eye, 
  Download,
  AlertTriangle
} from 'lucide-react';

export default function AicteNationalEnrolmentsPage() {
  const { currentUser } = useAuth();
  const [enrolments, setEnrolments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/v1/enrolments');
        const json = await res.json();
        if (json.data) {
          setEnrolments(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = enrolments.filter(e => {
    const term = searchTerm.toLowerCase();
    const matchSearch = e.studentName?.toLowerCase().includes(term) ||
                        e.institutionRollNumber?.toLowerCase().includes(term) ||
                        e.institutionName?.toLowerCase().includes(term) ||
                        e.apaarMasked?.toLowerCase().includes(term);
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE National Repository</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Authorized Regulator Scope</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">National Student Enrolments Register</h1>
          <p className="text-xs text-slate-500">
            Cross-institution student identity search with audit-logged sensitive attribute reveals.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-1.5 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
          <span>Every identifier reveal is logged in Tamper-Evident Audit</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search across all colleges by candidate name, roll number, or masked APAAR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-govblue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
          >
            <option value="ALL">All Enrolment States</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_VALIDATION">Pending Validation</option>
            <option value="QUARANTINED">Quarantined</option>
            <option value="TRANSFERRED_OUT">Transferred Out</option>
          </select>
        </div>
      </div>

      {/* Enrolments Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Displaying <strong className="text-navy-900">{filtered.length}</strong> records across participating institutions</span>
          <span className="text-[11px] font-mono text-slate-400">Total National Records: {enrolments.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">APAAR ID (Masked)</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">Programme Branch</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Category / Quota</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Identity Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-navy-900">
                    {enr.studentName}
                    <span className="block text-[10px] text-slate-400 font-normal">Admitted: {enr.admissionDate}</span>
                  </td>
                  <td className="py-3 px-4">
                    <IdentityMask maskedValue={enr.apaarMasked} studentId={enr.studentUuid} />
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {enr.institutionName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {enr.programmeName}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-navy-900">
                    {enr.institutionRollNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                      {enr.admissionCategory} • {enr.seatBucket}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={enr.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={enr.apaarVerificationState} size="sm" />
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

