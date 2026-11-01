'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  BellRing, 
  Filter, 
  CopyX, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function AicteAlertsQueuePage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await fetch('/api/v1/cases');
        const json = await res.json();
        if (json.data) {
          setCases(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCases();
  }, []);

  const filtered = cases.filter(c => {
    const matchState = stateFilter === 'ALL' || c.state === stateFilter;
    const matchType = typeFilter === 'ALL' || c.conflictType === typeFilter;
    return matchState && matchType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE Reviewer Console</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Triage & Decision Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Central Conflict & Risk Triage Queue</h1>
          <p className="text-xs text-slate-500">
            Cross-institution duplicate enrolments, migration verifications, and regulatory capacity breaches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-purple-50 text-purple-800 px-3 py-1.5 rounded-lg border border-purple-200 font-semibold">
            {cases.filter(c => c.state === 'OPEN' || c.state === 'UNDER_REVIEW').length} Pending Regulatory Action
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Filter Status:</span>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All States ({cases.length})</option>
            <option value="OPEN">Open</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="LEGITIMATE_TRANSFER">Legitimate Transfer</option>
            <option value="CONFIRMED_DUPLICATE">Confirmed Duplicate</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Conflict Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="CROSS_INSTITUTION_OVERLAP">Cross-Institution Overlap</option>
            <option value="CAPACITY_EXCEEDED">Capacity Exceeded</option>
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{c.id}</span>
                  <StatusBadge status={c.state} size="sm" />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    Confidence: {c.confidenceScore}%
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{c.title}</h3>
                {c.studentName && (
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-navy-900">{c.studentName}</strong> • APAAR: <code className="font-mono">{c.apaarMasked}</code>
                  </p>
                )}
              </div>

              <Link
                href={`/aicte/alerts/${c.id}`}
                className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors self-start md:self-auto"
              >
                <span>Evidence-First Case Review</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </Link>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{c.evidenceText}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span>Overlap: <strong className="text-slate-600">{c.dateOverlap}</strong></span>
                {c.assignedReviewer && (
                  <span>Reviewer: <strong className="text-slate-600">{c.assignedReviewer}</strong></span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {c.reasonCodes?.map((code: string, idx: number) => (
                  <span key={idx} className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

