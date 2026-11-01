'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  ArrowLeft, 
  History, 
  AlertCircle, 
  FileCheck2, 
  Award, 
  Clock, 
  CheckCircle2, 
  Building2, 
  User, 
  Calendar,
  Send,
  ShieldCheck,
  AlertOctagon,
  RefreshCw
} from 'lucide-react';

export default function StudentDetailPage() {
  const params = useParams();
  const { currentUser } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lifecycleModalOpen, setLifecycleModalOpen] = useState(false);
  const [eventType, setEventType] = useState<'TRANSFER_OUT' | 'WITHDRAWAL' | 'COMPLETION' | 'CORRECTION'>('TRANSFER_OUT');
  const [evidenceRef, setEvidenceRef] = useState('');
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      try {
        const res = await fetch(`/api/v1/enrolments/${params.id}`);
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
    loadDetail();
  }, [params.id]);

  const handleRecordLifecycle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/v1/enrolments/${params.id}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          actor: currentUser.name,
          evidenceReference: evidenceRef || `ORDER_REF_${Date.now().toString(36).toUpperCase()}`,
          notes,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setLifecycleModalOpen(false);
        // Reload
        window.location.reload();
      } else {
        alert(json.error?.message || 'Failed to record event');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading student enrolment record...</div>;
  }

  if (!data) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">Student Enrolment Record Not Found</p>
        <Link href="/institution/students" className="text-xs text-govblue-600 underline">
          Return to roster
        </Link>
      </div>
    );
  }

  const student = data.student || {};
  const events = data.events || [];
  const issues = data.issues || [];

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/institution/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Student Roster</span>
        </Link>
      </div>

      {/* Main Student Header Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500">{data.institutionRollNumber}</span>
              <StatusBadge status={data.status} size="sm" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy-900">{student.name || 'Candidate'}</h1>
            <p className="text-xs text-slate-500">{data.programmeName} • Academic Year {data.academicYear}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setLifecycleModalOpen(true)}
              className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
              <span>Record Lifecycle Event</span>
            </button>
          </div>
        </div>

        {/* Identity & Enrolment Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">APAAR Reference</span>
            <div className="mt-1">
              <IdentityMask maskedValue={student.apaarMasked} studentId={student.uuid} />
            </div>
            <div className="mt-1">
              <StatusBadge status={student.verificationState} size="sm" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Admission Date</span>
            <span className="font-mono font-bold text-navy-900 text-sm mt-1 block">{data.admissionDate}</span>
            <span className="text-[10px] text-slate-400">Admitted under {data.admissionCategory}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Seat Bucket</span>
            <span className="font-mono font-bold text-govblue-600 text-sm mt-1 block">{data.seatBucket}</span>
            <span className="text-[10px] text-slate-400">
              {data.seatBucket === 'TFW' ? '5% Supernumerary Waiver' : 'Within Intake Approved'}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Enrolment ID</span>
            <span className="font-mono font-bold text-navy-900 text-xs mt-1 block">{data.id}</span>
            <span className="text-[10px] text-slate-400 font-mono">UUID: {student.uuid?.substring(0, 14)}...</span>
          </div>
        </div>

        {/* Identity Provider Provenance Evidence (if verified) */}
        {student.providerMetadata && (
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-teal-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Authoritative Identity Gateway Verification Provenance</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div>Provider: <strong className="font-mono">{student.providerMetadata.source}</strong></div>
              <div>Tx Reference: <strong className="font-mono">{student.providerMetadata.txRef}</strong></div>
              <div>Response: <strong className="font-mono">{student.providerMetadata.providerResponseCode}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* Issues linked to student (if any) */}
      {issues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Open Validation Issues ({issues.length})</span>
          </div>
          <div className="space-y-2">
            {issues.map((iss: any) => (
              <div key={iss.id} className="p-3 bg-white rounded-xl border border-red-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-800">{iss.ruleCode}</span>
                  <StatusBadge status={iss.severity} size="sm" />
                </div>
                <p className="text-slate-700">{iss.message}</p>
                <p className="text-[11px] text-slate-500"><strong>Next Action: </strong>{iss.nextAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Append-Only Enrolment Event Timeline (PRD Section 6.3 & 23.3) */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
            <History className="w-4 h-4 text-govblue-600" />
            <span>Append-Only Enrolment Event Timeline</span>
          </h2>
          <p className="text-xs text-slate-500">Immutable ledger of admission, transfers, corrections, and completions.</p>
        </div>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {events.length === 0 ? (
            <p className="text-xs text-slate-400">No lifecycle events recorded yet.</p>
          ) : (
            events.map((evt: any) => (
              <div key={evt.id} className="relative space-y-1 text-xs">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-navy-900 border-2 border-white"></div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-navy-900 text-[11px] px-2 py-0.5 rounded bg-slate-100">
                    {evt.eventType}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {new Date(evt.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-700 font-medium">{evt.notes}</p>
                <div className="text-[11px] text-slate-500">
                  <span>Actor: <strong>{evt.actor}</strong></span> • <span>Evidence Ref: <code className="font-mono bg-slate-50 px-1 py-0.5 rounded">{evt.evidenceReference}</code></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lifecycle Modal */}
      {lifecycleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-elevated border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Record Lifecycle Transition</h3>
              <button
                type="button"
                onClick={() => setLifecycleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordLifecycle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Transition Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white focus:outline-none focus:border-govblue-600"
                >
                  <option value="TRANSFER_OUT">TRANSFER_OUT (Inter-Institutional Migration)</option>
                  <option value="WITHDRAWAL">WITHDRAWAL (Candidate Formal Resignation)</option>
                  <option value="COMPLETION">COMPLETION (Graduated / Programme Complete)</option>
                  <option value="CORRECTION">CORRECTION (Attribute / Data Amendment)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Official Evidence Reference</label>
                <input
                  type="text"
                  placeholder="e.g. TC_ISSUANCE_REF_2026_9011 or AFFIDAVIT_01"
                  value={evidenceRef}
                  onChange={(e) => setEvidenceRef(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono focus:outline-none focus:border-govblue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Administrative Notes / Justification</label>
                <textarea
                  rows={3}
                  placeholder="State the reason and approval authority for this transition..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-govblue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLifecycleModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold"
                >
                  {isUpdating ? 'Saving Event...' : 'Commit Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

