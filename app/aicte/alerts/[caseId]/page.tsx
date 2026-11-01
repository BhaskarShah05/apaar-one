'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  CopyX, 
  Clock, 
  ShieldCheck, 
  FileCheck2,
  FileText,
  History,
  Send,
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function AicteCaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [caseItem, setCaseItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Reviewer Action Modal
  const [actionType, setActionType] = useState<string | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [evidenceDoc, setEvidenceDoc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCase() {
      try {
        const res = await fetch(`/api/v1/cases/${params.caseId}`);
        const json = await res.json();
        if (json.data) {
          setCaseItem(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCase();
  }, [params.caseId]);

  const handleExecuteAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionType) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/cases/${params.caseId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          reviewer: currentUser.name,
          notes: actionNotes,
          evidenceDoc,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setActionType(null);
        window.location.reload();
      } else {
        alert(json.error?.message || 'Error executing action');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading evidence case...</div>;
  }

  if (!caseItem) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">Case Record Not Found</p>
        <Link href="/aicte/alerts" className="text-xs text-govblue-600 underline">Back to Queue</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/aicte/alerts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Triage Desk</span>
        </Link>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-navy-900">{caseItem.id}</span>
              <StatusBadge status={caseItem.state} size="sm" />
              <span className="font-mono text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold border border-purple-200">
                Match Confidence: {caseItem.confidenceScore}%
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-navy-900">{caseItem.title}</h1>
            {caseItem.studentName && (
              <p className="text-xs text-slate-500">
                Candidate: <strong className="text-navy-900">{caseItem.studentName}</strong> • Masked APAAR: <code className="font-mono">{caseItem.apaarMasked}</code>
              </p>
            )}
          </div>

          {/* Action Buttons for AICTE Reviewer */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActionType('MARK_LEGITIMATE_TRANSFER');
                setActionNotes('Verified institutional transfer certificate (TC). Student formally migrated with NOC.');
                setEvidenceDoc('TC_REF_BITS_2026_8819');
              }}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Legitimate Transfer</span>
            </button>

            <button
              onClick={() => {
                setActionType('REQUEST_CLARIFICATION');
                setActionNotes('Issued formal query to both institutions requesting student attendance register and original migration certificate.');
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Clarification</span>
            </button>

            <button
              onClick={() => {
                setActionType('CONFIRM_DUPLICATE');
                setActionNotes('Confirmed simultaneous dual full-time active admission without permitted NOC. Initiated regulatory enquiry.');
              }}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Confirm Duplicate</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Enrolment Comparison */}
        {caseItem.enrolments?.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Side-by-Side Institution Enrolment Evidence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseItem.enrolments.map((enr: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-navy-900 text-sm flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-govblue-600" />
                      <span>{enr.institutionName}</span>
                    </span>
                    <StatusBadge status={enr.status} size="sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Programme</span>
                      <strong className="text-navy-900">{enr.programmeName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Roll ID</span>
                      <strong className="font-mono text-navy-900">{enr.rollNumber}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Admission Date</span>
                      <strong className="font-mono text-navy-900">{enr.admissionDate}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Academic Year</span>
                      <strong className="text-navy-900">{enr.academicYear}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deterministic Evidence Text */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-navy-900">Deterministic Match Proof & Investigation Findings:</p>
          <p className="leading-relaxed text-slate-600">{caseItem.evidenceText}</p>
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>Date Overlap: <strong>{caseItem.dateOverlap}</strong></span>
            {caseItem.resolutionNotes && (
              <span className="text-teal-700 font-semibold">Resolution Note: {caseItem.resolutionNotes}</span>
            )}
          </div>
        </div>
      </div>

      {/* Case Audit History Timeline (PRD Section 12.3 Screen 12 & 23.4) */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
            <History className="w-4 h-4 text-govblue-600" />
            <span>Case Audit & Decision Log</span>
          </h2>
          <p className="text-xs text-slate-500">Immutable trail of flags, clarifications, and regulator determinations.</p>
        </div>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {caseItem.history?.map((h: any, idx: number) => (
            <div key={idx} className="relative space-y-1 text-xs">
              <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-navy-900 border-2 border-white"></div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-navy-900 text-[11px] px-2 py-0.5 rounded bg-slate-100">
                  {h.action}
                </span>
                <span className="text-slate-400 text-[11px]">{new Date(h.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-slate-700 font-medium">{h.notes || 'Status changed'}</p>
              <p className="text-[11px] text-slate-500">Actor: <strong>{h.actor}</strong></p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Execution Modal */}
      {actionType && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">
                Execute Determination: <span className="text-govblue-600">{actionType}</span>
              </h3>
              <button
                onClick={() => setActionType(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteAction} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Supporting Reference / TC Document ID</label>
                <input
                  type="text"
                  placeholder="e.g. TC_REF_BITS_2026_8819 or AICTE_ORDER_449"
                  value={evidenceDoc}
                  onChange={(e) => setEvidenceDoc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Regulator Finding & Reason</label>
                <textarea
                  rows={4}
                  required
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActionType(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg font-semibold"
                >
                  {isSubmitting ? 'Recording Decision...' : 'Commit Determination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

