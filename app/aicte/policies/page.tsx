'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Scale, 
  Sliders, 
  Plus, 
  Search, 
  BookOpen, 
  History, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AictePoliciesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPolicies() {
      try {
        const res = await fetch('/api/v1/policies');
        const json = await res.json();
        if (json.data) {
          setRules(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPolicies();
  }, []);

  const filtered = rules.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.seatBucket.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE Policy Bureau</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Policy-as-Code Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Regulatory Seat Entitlement Rules</h1>
          <p className="text-xs text-slate-500">
            Versioned, auditable mathematical rules encoding the AICTE Approval Process Handbook (APH 2024-27).
          </p>
        </div>

        <Link
          href="/aicte/policies/new"
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-teal-400" />
          <span>Draft New Policy Rule</span>
        </Link>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{r.code}</span>
                  <StatusBadge status={r.status} size="sm" />
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    Version {r.version}
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-900">{r.title}</h3>
                <p className="text-xs text-slate-500">
                  Authority: <span className="font-semibold text-slate-700">{r.sourceAuthority}</span>
                </p>
              </div>

              <div className="text-right text-xs">
                <span className={`px-2.5 py-1 rounded font-mono font-semibold ${
                  r.capacityBasis === 'SUPERNUMERARY' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700'
                }`}>
                  {r.capacityBasis}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Scope: {r.programmeLevel}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-navy-900 space-y-1">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Mathematical Formula & Constraint</span>
              <p className="font-medium text-slate-800 leading-relaxed">{r.ruleFormula}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-100">
              <div>
                Effective: <strong>{r.effectiveFrom}</strong> to <strong>{r.effectiveTo}</strong>
              </div>
              <div>
                Published By: <strong>{r.publishedBy}</strong> ({new Date(r.publishedAt).toLocaleDateString()})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

