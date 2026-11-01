'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { Programme } from '@/types';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Scale, 
  ExternalLink, 
  FileText, 
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function InstitutionProgrammesPage() {
  const { currentUser, activeAcademicYear } = useAuth();
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  useEffect(() => {
    async function fetchProgrammes() {
      try {
        const res = await fetch(`/api/v1/institutions/${currentUser.institutionId || 'inst-dit-del-01'}/programmes`);
        const json = await res.json();
        if (json.data) {
          setProgrammes(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProgrammes();
  }, [currentUser.institutionId]);

  const filtered = programmes.filter((p) => {
    const matchesSearch = p.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'ALL' || p.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Approved Programmes & Intake Catalogue</h1>
          <p className="text-xs text-slate-500 mt-1">
            Official AICTE Sanctioned Courses for Academic Cycle {activeAcademicYear}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-xs">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Intake Locked by AICTE EoA</span>
          </span>
          <Link
            href="/institution/intake"
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-teal-400" />
            <span>Seat Compliance Ledger</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by programme branch, degree (e.g. CSE, MCA)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-govblue-600"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:border-govblue-600"
          >
            <option value="ALL">All Levels</option>
            <option value="UNDERGRADUATE">Undergraduate</option>
            <option value="POSTGRADUATE">Postgraduate</option>
            <option value="DIPLOMA">Diploma</option>
          </select>
        </div>
      </div>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {prog.id}
                  </span>
                  <h3 className="text-lg font-bold text-navy-900 mt-1">
                    {prog.degree} in {prog.branch}
                  </h3>
                  <p className="text-xs text-slate-500">{prog.level} • {prog.mode.replace(/_/g, ' ')}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-navy-900 font-mono">
                    {prog.currentActiveEnrolment}
                  </span>
                  <span className="text-xs text-slate-400 font-mono"> / {prog.effectiveCapacity}</span>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Capacity Used</p>
                </div>
              </div>

              {/* Approval metadata badge */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold text-slate-700">AICTE Approval Order:</span>
                  <span className="font-mono text-[11px] text-govblue-700 truncate max-w-[220px]">
                    {prog.approvalReference}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Last AICTE Sync:</span>
                  <span>{new Date(prog.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Quota Entitlements breakdown */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Sanctioned Quota Entitlements
                </p>
                <div className="space-y-1.5">
                  {prog.entitlements.map((ent, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2 rounded bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">{ent.bucketLabel}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-200 text-slate-700">
                          {ent.basis}
                        </span>
                      </div>
                      <div className="font-mono text-xs font-semibold text-navy-900">
                        {ent.consumedQuantity} / {ent.approvedQuantity} seats
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/institution/students?programmeId=${prog.id}`}
                className="text-xs font-semibold text-govblue-600 hover:text-govblue-700 flex items-center gap-1"
              >
                <span>View Enrolled Students ({prog.currentActiveEnrolment})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/institution/intake?programmeId=${prog.id}`}
                className="text-xs font-medium text-slate-600 hover:text-navy-900"
              >
                Inspect Compliance Rules
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

