'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Building2, 
  Users, 
  Award, 
  Scale, 
  BellRing, 
  MapPin, 
  Download, 
  ArrowRight,
  Filter,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

export default function AicteNationalOverviewPage() {
  const { activeAcademicYear } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/v1/analytics/national');
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const stateBreakdown = data?.stateBreakdown || [];
  const institutions = data?.institutionsSummary || [];
  const recentCases = data?.recentCases || [];

  const filteredInstitutions = institutions.filter((i: any) => {
    if (stateFilter === 'ALL') return true;
    return i.state === stateFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Regulatory Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE Central Console</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Regulation Bureau</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">National Enrolment Intelligence & Capacity Monitor</h1>
          <p className="text-xs text-slate-500">
            Real-time cross-institution telemetry, APAAR identity coverage, and seat compliance analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/aicte/reports"
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>National Summary Report</span>
          </Link>
          <Link
            href="/aicte/alerts"
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>Review Triage Queue ({kpis.openConflicts || 2})</span>
          </Link>
        </div>
      </div>

      {/* 6 National Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Onboarded Institutes"
          value={kpis.totalInstitutions || 5}
          subtitle="AICTE Approved"
          icon={Building2}
          iconColor="text-navy-900"
          iconBg="bg-slate-100"
        />
        <KpiCard
          title="Active Enrolments"
          value={kpis.activeEnrolments || '2,043'}
          subtitle="All States Combined"
          icon={Users}
          iconColor="text-govblue-600"
          iconBg="bg-blue-50"
        />
        <KpiCard
          title="National APAAR Rate"
          value={`${kpis.nationalApaarCoverage || 95}%`}
          subtitle="Verified Registry Links"
          icon={Award}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KpiCard
          title="Open Conflict Cases"
          value={kpis.openConflicts || 2}
          subtitle="Cross-State Overlaps"
          icon={BellRing}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <KpiCard
          title="Legitimate Transfers"
          value={kpis.resolvedTransfers || 1}
          subtitle="TC Documented"
          icon={CheckCircle2}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KpiCard
          title="Published Rules"
          value={kpis.publishedPolicyRulesCount || 4}
          subtitle="APH 2024-27 Active"
          icon={Scale}
          iconColor="text-navy-900"
          iconBg="bg-slate-100"
        />
      </div>

      {/* State-Wise Enrolment Breakdown */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-navy-900">State-Wise Intake & Capacity Breakdown</h2>
            <p className="text-xs text-slate-500">Live monitoring across participating State Directorates of Technical Education</p>
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Academic Year {activeAcademicYear}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stateBreakdown.map((s: any) => (
            <div key={s.state} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-900 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-govblue-600" />
                  <span>{s.state}</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {s.institutions} Inst.
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-500">Enrolled:</span>
                <span className="font-bold text-navy-900">{s.enrolled} / {s.approvedIntake}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-govblue-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, s.utilization)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-right text-slate-400 font-mono">{s.utilization}% Utilization</p>
            </div>
          ))}
        </div>
      </div>

      {/* Participating Institutions Directory */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-navy-900">Approved Institutions Enrolment Status</h2>
            <p className="text-xs text-slate-500">Inspect row-level submissions, intake utilization, and open issues</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700"
            >
              <option value="ALL">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">AICTE ID</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4 text-center">Approved Intake</th>
                <th className="py-3 px-4 text-center">Active Enrolled</th>
                <th className="py-3 px-4 text-center">APAAR Verified %</th>
                <th className="py-3 px-4 text-center">Open Issues</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstitutions.map((i: any) => {
                const isOver = i.enrolled > i.intakeApproved;
                return (
                  <tr key={i.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-navy-900">{i.aicteId}</td>
                    <td className="py-3 px-4 font-semibold text-navy-900">
                      <Link href={`/aicte/institutions/${i.id}`} className="hover:text-govblue-600 hover:underline">
                        {i.name}
                      </Link>
                      <span className="block text-[10px] text-slate-400 font-normal">{i.type}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{i.state}</td>
                    <td className="py-3 px-4 text-center font-mono">{i.intakeApproved}</td>
                    <td className={`py-3 px-4 text-center font-mono font-bold ${isOver ? 'text-red-600' : 'text-navy-900'}`}>
                      {i.enrolled}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-teal-700 font-semibold">
                      {i.apaarVerifiedRate}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      {i.unresolvedIssuesCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-mono font-bold text-[10px]">
                          {i.unresolvedIssuesCount}
                        </span>
                      ) : (
                        <span className="text-teal-600 font-bold">0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/aicte/institutions/${i.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px]"
                      >
                        <span>Drilldown</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

