'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  CopyX, 
  Scale, 
  UploadCloud, 
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  Filter
} from 'lucide-react';

export default function InstitutionOverviewPage() {
  const { currentUser, activeAcademicYear } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProgramme, setSelectedProgramme] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/v1/analytics/institution?institutionId=${currentUser.institutionId || 'inst-dit-del-01'}`);
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
  }, [currentUser.institutionId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const institution = data?.institution || {};
  const programmes = data?.programmeMetrics || [];
  const categoryDist = data?.categoryDistribution || {};
  const recentBatches = data?.recentBatches || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Context Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Institution Workspace</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">AICTE ID: {institution.aicteId}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">{institution.name}</h1>
          <p className="text-xs text-slate-500">
            AISHE: {institution.aisheCode} • Academic Year {activeAcademicYear} • State: {institution.state}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/institution/uploads"
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
          >
            <UploadCloud className="w-4 h-4 text-teal-400" />
            <span>Upload Student Batch</span>
          </Link>
          <Link
            href="/institution/students/new"
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-navy-900 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>+ Individual Student</span>
          </Link>
        </div>
      </div>

      {/* 8 Core PRD KPI Cards (Section 13.1 & Screen 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Approved Regular Intake"
          value={kpis.approvedIntake || 360}
          subtitle="AICTE Sanctioned EoA"
          icon={GraduationCap}
          iconColor="text-navy-900"
          iconBg="bg-slate-100"
        />
        <KpiCard
          title="Permitted Capacity"
          value={kpis.permittedCapacity || 375}
          subtitle="Base Intake + Supernumerary"
          icon={Scale}
          iconColor="text-govblue-600"
          iconBg="bg-blue-50"
        />
        <KpiCard
          title="Actual Active Enrolment"
          value={kpis.actualEnrolment || 351}
          subtitle="Accepted Active Records"
          icon={Users}
          iconColor="text-navy-900"
          iconBg="bg-slate-100"
        />
        <KpiCard
          title="Seat Utilization"
          value={`${kpis.seatUtilization || 94}%`}
          subtitle="Active / Permitted Capacity"
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KpiCard
          title="APAAR Verified Rate"
          value={`${kpis.apaarVerifiedRate || 94}%`}
          subtitle={`${kpis.apaarVerifiedCount || 58} students verified`}
          icon={CheckCircle2}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KpiCard
          title="Pending Verification"
          value={kpis.apaarPendingCount || 3}
          subtitle="30-Day Grace Active"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <KpiCard
          title="Validation Issues"
          value={kpis.validationIssuesTotal || 3}
          subtitle={`${kpis.blockerIssues || 0} Blocker • ${kpis.errorIssues || 1} Error`}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <KpiCard
          title="Potential Duplicate Cases"
          value={kpis.potentialConflictCases || 1}
          subtitle="Cross-Institution Overlap"
          icon={CopyX}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Programme-Wise Enrolment & Seat Utilization Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-navy-900">Programme Enrolment & Capacity Ledger</h2>
            <p className="text-xs text-slate-500">Live comparison of Approved Intake vs Consumed Seats</p>
          </div>
          <Link
            href="/institution/intake"
            className="text-xs font-semibold text-govblue-600 hover:text-govblue-700 flex items-center gap-1"
          >
            <span>View Full Entitlements Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Programme / Degree</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4 text-center">Approved Intake</th>
                <th className="py-3 px-4 text-center">Permitted Capacity</th>
                <th className="py-3 px-4 text-center">Active Enrolled</th>
                <th className="py-3 px-4">Utilization</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programmes.map((p: any) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-navy-900">
                    <Link href={`/institution/intake?programme=${p.id}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{p.level}</td>
                  <td className="py-3 px-4 text-center font-mono font-medium">{p.intake}</td>
                  <td className="py-3 px-4 text-center font-mono font-medium">{p.capacity}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-navy-900">{p.enrolled}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden w-24">
                        <div
                          className={`h-full ${
                            p.status === 'OVER_CAPACITY' ? 'bg-red-500' : 'bg-teal-500'
                          }`}
                          style={{ width: `${Math.min(100, p.utilization)}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[11px]">{p.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <StatusBadge status={p.status === 'OVER_CAPACITY' ? 'OVER_CAPACITY' : 'COMPLIANT'} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout: Recent Batches & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-navy-900">Recent Batch Submissions</h2>
              <p className="text-xs text-slate-500">Row-level acceptance and error outcomes</p>
            </div>
            <Link
              href="/institution/uploads"
              className="text-xs font-semibold text-govblue-600 hover:text-govblue-700 flex items-center gap-1"
            >
              <span>Upload History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBatches.map((b: any) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-900">{b.id}</span>
                    <StatusBadge status={b.status} size="sm" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{b.filename}</p>
                  <p className="text-[11px] text-slate-400">
                    Course: {b.programmeName} • Submitter: {b.submittedBy}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase font-sans">Total</p>
                    <p className="font-bold text-navy-900">{b.totalRows}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-teal-600 text-[10px] uppercase font-sans">Accepted</p>
                    <p className="font-bold text-teal-700">{b.acceptedRows}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-amber-600 text-[10px] uppercase font-sans">Warning</p>
                    <p className="font-bold text-amber-700">{b.warningRows}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-600 text-[10px] uppercase font-sans">Rejected</p>
                    <p className="font-bold text-red-700">{b.rejectedRows}</p>
                  </div>
                  <Link
                    href={`/institution/uploads/${b.id}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-medium text-xs transition-colors"
                  >
                    View Rows
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
            <h2 className="text-base font-bold text-navy-900">Category Distribution</h2>
            <p className="text-xs text-slate-500">Government quota breakdown for 2026-27</p>

            <div className="space-y-3 pt-2">
              {Object.entries(categoryDist).map(([cat, count]: [string, any]) => (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{cat}</span>
                    <span className="font-mono font-bold text-navy-900">{count} students</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-govblue-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (count / (kpis.actualEnrolment || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-xs text-teal-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-800">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>AICTE Compliance Status</span>
            </div>
            <p className="text-[11px] text-teal-700 leading-relaxed">
              Your institution has submitted 351/360 student records for 2026-27. 3 issues are pending correction in the validation inbox.
            </p>
            <div className="pt-2">
              <Link
                href="/institution/issues"
                className="font-semibold text-teal-800 underline hover:text-teal-900"
              >
                Go to Validation Inbox →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

