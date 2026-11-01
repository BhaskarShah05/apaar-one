'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  Calendar, 
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function InstitutionStudentsPage() {
  const { currentUser, activeAcademicYear } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [programmeFilter, setProgrammeFilter] = useState('ALL');

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch(`/api/v1/enrolments?institutionId=${currentUser.institutionId || 'inst-dit-del-01'}`);
        const json = await res.json();
        if (json.data) {
          setStudents(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, [currentUser.institutionId]);

  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.studentName.toLowerCase().includes(term) ||
      s.institutionRollNumber.toLowerCase().includes(term) ||
      s.apaarMasked.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    const matchesProg = programmeFilter === 'ALL' || s.programmeId === programmeFilter;

    return matchesSearch && matchesStatus && matchesProg;
  });

  const handleExportCSV = () => {
    const headers = ['Roll Number', 'Student Name', 'Masked APAAR', 'Programme', 'Category', 'Seat Bucket', 'Status', 'Admission Date'];
    const rows = filtered.map(s => [
      s.institutionRollNumber,
      `"${s.studentName}"`,
      s.apaarMasked,
      `"${s.programmeName}"`,
      s.admissionCategory,
      s.seatBucket,
      s.status,
      s.admissionDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DIT_Student_Enrolment_Register_${activeAcademicYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Institution Register</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Academic Year {activeAcademicYear}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Student Enrolment Records</h1>
          <p className="text-xs text-slate-500">
            Authoritative institutional roster with APAAR verification status & category allocation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Roster (CSV)</span>
          </button>
          <Link
            href="/institution/students/new"
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-teal-400" />
            <span>Admit Single Student</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or masked APAAR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-govblue-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-govblue-600"
          >
            <option value="ALL">All Enrolment States</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_VALIDATION">Pending Validation</option>
            <option value="QUARANTINED">Quarantined / Flagged</option>
            <option value="TRANSFERRED_OUT">Transferred Out</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>

          <select
            value={programmeFilter}
            onChange={(e) => setProgrammeFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-govblue-600"
          >
            <option value="ALL">All Programmes</option>
            <option value="PRG-DIT-CSE-UG">B.Tech CSE</option>
            <option value="PRG-DIT-ECE-UG">B.Tech ECE</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-navy-900">{filtered.length}</strong> student enrolments</span>
          <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
            Server Scoped to {currentUser.institutionName || 'DIT Delhi'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">APAAR Academic ID</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Seat Bucket</th>
                <th className="py-3 px-4">Enrolment State</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-navy-900">
                    <Link href={`/institution/students/${s.id}`} className="hover:text-govblue-600 hover:underline">
                      {s.institutionRollNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-semibold text-navy-900">
                    {s.studentName}
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Admitted: {s.admissionDate}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <IdentityMask maskedValue={s.apaarMasked} studentId={s.studentUuid} />
                      <div>
                        <StatusBadge status={s.apaarVerificationState} size="sm" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {s.programmeName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700">
                      {s.admissionCategory}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-medium ${
                      s.seatBucket === 'TFW' ? 'bg-teal-50 text-teal-800 border border-teal-200' :
                      s.seatBucket === 'LATERAL_ENTRY' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {s.seatBucket}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/institution/students/${s.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors text-[11px]"
                    >
                      <span>Detail</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
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

