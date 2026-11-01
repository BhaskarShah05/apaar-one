'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Search, 
  Plus, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  Building2, 
  History, 
  ArrowRight,
  FileCheck2,
  Lock
} from 'lucide-react';

export default function VerifierOverviewPage() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
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
    loadRequests();
  }, []);

  const approved = requests.filter(r => r.status === 'APPROVED');
  const pending = requests.filter(r => r.status === 'PENDING_STUDENT_CONSENT');

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Authorized Screening Agency</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Regulated Verifier</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">{currentUser.verifierOrg || 'TechCorp Background Screening Services'}</h1>
          <p className="text-xs text-slate-500">
            Submit scoped enrolment queries, track student consent grants, and verify cryptographically signed proofs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/verifier/scan"
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-600" />
            <span>Scan QR / Token</span>
          </Link>
          <Link
            href="/verifier/new-request"
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>New Verification Request</span>
          </Link>
        </div>
      </div>

      {/* 4 Verifier Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Verification Queries"
          value={requests.length}
          subtitle="All Active Queries"
          icon={Search}
          iconColor="text-navy-900"
          iconBg="bg-slate-100"
        />
        <KpiCard
          title="Consented & Verified"
          value={approved.length}
          subtitle="Signed Proof Issued"
          icon={ShieldCheck}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KpiCard
          title="Pending Student Consent"
          value={pending.length}
          subtitle="Awaiting Approval"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <KpiCard
          title="Monthly Query Quota"
          value="482 / 500"
          subtitle="Tier-1 Enterprise Tier"
          icon={Building2}
          iconColor="text-govblue-600"
          iconBg="bg-blue-50"
        />
      </div>

      {/* Critical PRD Separation Banner (FR-031) */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-govblue-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Distinction: Enrolment Status vs. Degree Verification (FR-031)</span>
        </p>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          APAAR ONE verifies authentic institutional admissions and active enrolment events. Verification of issued degrees, diplomas, or grade transcripts is governed by DigiLocker / NAD and must be requested through that service.
        </p>
      </div>

      {/* Recent Queries Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h2 className="text-base font-bold text-navy-900">Recent Verification Queries</h2>
            <p className="text-xs text-slate-500">Track consent progression and inspect signed credentials</p>
          </div>
          <Link
            href="/verifier/requests"
            className="text-xs font-semibold text-govblue-600 hover:text-govblue-700 flex items-center gap-1"
          >
            <span>View All Queries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Claim Scope</th>
                <th className="py-3 px-4">Consent Status</th>
                <th className="py-3 px-4">Expiry</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-navy-900">{r.id}</td>
                  <td className="py-3 px-4 font-semibold text-navy-900">
                    {r.studentName}
                    <span className="block text-[10px] text-slate-400 font-normal">{r.studentApaarMasked}</span>
                  </td>
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
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px]"
                    >
                      Inspect Result
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

