'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Building2, 
  ArrowLeft, 
  GraduationCap, 
  Scale, 
  Users, 
  AlertTriangle, 
  Send,
  Download,
  Calendar,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AicteInstitutionDetailPage() {
  const params = useParams();
  const [inst, setInst] = useState<any>(null);
  const [capacity, setCapacity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clarificationNoticeOpen, setClarificationNoticeOpen] = useState(false);
  const [noticeSubject, setNoticeSubject] = useState('Regulatory Query Regarding Seat Compliance');
  const [noticeBody, setNoticeBody] = useState('Please provide student merit allotment list and state quota justification.');
  const [noticeSent, setNoticeSent] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [instRes, capRes] = await Promise.all([
          fetch(`/api/v1/institutions/${params.id}`),
          fetch(`/api/v1/institutions/${params.id}/capacity`),
        ]);
        const instJson = await instRes.json();
        const capJson = await capRes.json();
        if (instJson.data) setInst(instJson.data);
        if (capJson.data) setCapacity(capJson.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeSent(true);
    setTimeout(() => {
      setClarificationNoticeOpen(false);
      setNoticeSent(false);
      alert('Formal AICTE Regulatory Query served to Principal and Registrar.');
    }, 800);
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading institution audit profile...</div>;
  }

  if (!inst) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">Institution Record Not Found</p>
        <Link href="/aicte/institutions" className="text-xs text-govblue-600 underline">Back to Directory</Link>
      </div>
    );
  }

  const programmes = capacity?.programmes || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      {/* Back button */}
      <div>
        <Link
          href="/aicte/institutions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Institutions Directory</span>
        </Link>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-600">AICTE: {inst.aicteId}</span>
              <StatusBadge status={inst.status} size="sm" />
              <span className="text-xs font-mono text-slate-400">AISHE: {inst.aisheCode}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mt-1">{inst.name}</h1>
            <p className="text-xs text-slate-500">
              {inst.type.replace(/_/g, ' ')} • {inst.district}, {inst.state} • Principal: {inst.principalName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setClarificationNoticeOpen(true)}
              className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
            >
              <Send className="w-3.5 h-3.5 text-teal-400" />
              <span>Issue Regulatory Query</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-sans text-slate-400 uppercase">Sanctioned Intake</span>
            <p className="text-xl font-bold text-navy-900 mt-1">{inst.intakeApprovedTotal}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-[10px] font-sans text-govblue-700 uppercase">Enrolled Students</span>
            <p className="text-xl font-bold text-govblue-900 mt-1">{inst.enrolmentCurrentTotal}</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
            <span className="text-[10px] font-sans text-teal-700 uppercase">APAAR Verified %</span>
            <p className="text-xl font-bold text-teal-800 mt-1">{inst.apaarVerifiedRate}%</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <span className="text-[10px] font-sans text-red-700 uppercase">Unresolved Issues</span>
            <p className="text-xl font-bold text-red-800 mt-1">{inst.unresolvedIssuesCount}</p>
          </div>
        </div>
      </div>

      {/* Programme Intake vs Active Enrolment Comparison */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-900">Course-Level Seat Compliance Ledger</h2>
          <p className="text-xs text-slate-500">Evaluated against AICTE Approval Process Handbook (APH 2024-27)</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4 text-center">Approved Intake</th>
                <th className="py-3 px-4 text-center">Permitted Capacity</th>
                <th className="py-3 px-4 text-center">Enrolled Students</th>
                <th className="py-3 px-4">Compliance Status</th>
                <th className="py-3 px-4">Calculation Arithmetic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programmes.map((p: any) => (
                <tr key={p.programmeId} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-navy-900">{p.programmeName}</td>
                  <td className="py-3 px-4 text-center font-mono">{p.baseApprovedIntake}</td>
                  <td className="py-3 px-4 text-center font-mono font-semibold">{p.permittedCapacity}</td>
                  <td className={`py-3 px-4 text-center font-mono font-bold ${p.status === 'EXCEEDED_CAPACITY' ? 'text-red-600' : 'text-navy-900'}`}>
                    {p.currentActiveEnrolment}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {p.calculationArithmetic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Regulatory Query Notice Modal */}
      {clarificationNoticeOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Serve Official Regulatory Notice</h3>
              <button
                onClick={() => setClarificationNoticeOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Notice Subject</label>
                <input
                  type="text"
                  required
                  value={noticeSubject}
                  onChange={(e) => setNoticeSubject(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Official Directive & Evidence Demanded</label>
                <textarea
                  rows={4}
                  required
                  value={noticeBody}
                  onChange={(e) => setNoticeBody(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setClarificationNoticeOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={noticeSent}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg font-semibold"
                >
                  {noticeSent ? 'Issuing Notice...' : 'Issue Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

