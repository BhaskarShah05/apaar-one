'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Building2, Search, Filter, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

export default function AicteInstitutionsDirectoryPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/v1/institutions');
        const json = await res.json();
        if (json.data) {
          setInstitutions(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = institutions.filter(i => {
    const term = searchTerm.toLowerCase();
    const matchSearch = i.name.toLowerCase().includes(term) || i.aicteId.toLowerCase().includes(term) || i.aisheCode.toLowerCase().includes(term);
    const matchState = stateFilter === 'ALL' || i.state === stateFilter;
    const matchType = typeFilter === 'ALL' || i.type === typeFilter;
    return matchSearch && matchState && matchType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">AICTE Approved Institutions Directory</h1>
        <p className="text-xs text-slate-500 mt-1">
          Master registry of technical universities and affiliated colleges participating in APAAR ONE.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by college name, AICTE ID, or AISHE code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-govblue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
          >
            <option value="ALL">All States</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
          >
            <option value="ALL">All Types</option>
            <option value="GOVERNMENT">Government</option>
            <option value="GOVT_AIDED">Govt Aided</option>
            <option value="PRIVATE_SELF_FINANCED">Private Self-Financed</option>
            <option value="UNIVERSITY_DEPT">University Dept</option>
          </select>
        </div>
      </div>

      {/* Grid of Institution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    AICTE: {inst.aicteId}
                  </span>
                  <h3 className="text-base font-bold text-navy-900 mt-1">{inst.name}</h3>
                  <p className="text-xs text-slate-500">{inst.district}, {inst.state} • {inst.type.replace(/_/g, ' ')}</p>
                </div>
                <StatusBadge status={inst.status} size="sm" />
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Intake</span>
                  <span className="font-bold text-navy-900">{inst.intakeApprovedTotal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">Enrolled</span>
                  <span className="font-bold text-govblue-600">{inst.enrolmentCurrentTotal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block uppercase">APAAR %</span>
                  <span className="font-bold text-teal-700">{inst.apaarVerifiedRate}%</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 space-y-0.5">
                <p>Principal: <strong>{inst.principalName}</strong></p>
                <p>AISHE Code: <code className="font-mono">{inst.aisheCode}</code></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Last Sync: {new Date(inst.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <Link
                href={`/aicte/institutions/${inst.id}`}
                className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Full Audit Drilldown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

