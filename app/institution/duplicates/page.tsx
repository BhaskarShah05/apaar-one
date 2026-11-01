'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  CopyX, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  Calendar,
  Send,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export default function InstitutionDuplicatesPage() {
  const { currentUser } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [clarificationModalCase, setClarificationModalCase] = useState<any>(null);
  const [clarificationText, setClarificationText] = useState('');
  const [docRef, setDocRef] = useState('');

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await fetch('/api/v1/cases');
        const json = await res.json();
        if (json.data) {
          // Filter to cases involving this institution
          const instId = currentUser.institutionId || 'inst-dit-del-01';
          const relevant = json.data.filter((c: any) =>
            c.enrolments.some((e: any) => e.institutionId === instId)
          );
          setCases(relevant);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCases();
  }, [currentUser.institutionId]);

  const handleSubmitClarification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationModalCase) return;

    try {
      const res = await fetch(`/api/v1/cases/${clarificationModalCase.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REQUEST_CLARIFICATION',
          reviewer: currentUser.name,
          notes: clarificationText,
          evidenceDoc: docRef,
        }),
      });
      if (res.ok) {
        alert('Clarification response submitted to AICTE Regulator Review Queue.');
        setClarificationModalCase(null);
        window.location.reload();
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Institution Workspace</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Cross-Institution Reconciliation</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Potential Duplicate Cases</h1>
          <p className="text-xs text-slate-500">
            Cases involving students enrolled at this institution flagged for concurrent active status or migration verification.
          </p>
        </div>
      </div>

      {/* Critical PRD Human-in-the-Loop Principle Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Investigation Leads, Not Automatic Accusations (PRD Section 4.3 & 8.1)</span>
        </p>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          Cross-institution duplicates are treated as review cases requiring human evidence inspection. Legitimate transfers and historical records can be cleared by providing the respective Transfer Certificate (TC) or migration order.
        </p>
      </div>

      {/* Cases List */}
      <div className="space-y-6">
        {cases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-borderLine p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
            <h3 className="text-base font-bold text-navy-900">No Conflict Cases</h3>
            <p className="text-xs text-slate-500">No overlapping or duplicate active records for your institution.</p>
          </div>
        ) : (
          cases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-6 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-900">{c.id}</span>
                    <StatusBadge status={c.state} size="sm" />
                    <span className="font-mono text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold border border-purple-200">
                      Match Confidence: {c.confidenceScore}%
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{c.title}</h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-navy-900">{c.studentName || 'Student'}</strong> (APAAR: {c.apaarMasked})
                  </p>
                </div>

                {c.state !== 'LEGITIMATE_TRANSFER' && c.state !== 'CONFIRMED_DUPLICATE' && (
                  <button
                    onClick={() => {
                      setClarificationModalCase(c);
                      setClarificationText('Student submitted verified transfer certificate from previous institution.');
                      setDocRef('TC_REF_' + Date.now().toString(36).toUpperCase());
                    }}
                    className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
                  >
                    <Send className="w-3.5 h-3.5 text-teal-400" />
                    <span>Submit Clarification / TC Reference</span>
                  </button>
                )}
              </div>

              {/* Side by side comparison of both institutions */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Side-by-Side Enrolment Comparison
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {c.enrolments.map((enr: any, idx: number) => {
                    const isOwnInstitution = enr.institutionId === (currentUser.institutionId || 'inst-dit-del-01');
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border space-y-2 text-xs ${
                          isOwnInstitution ? 'bg-blue-50/40 border-blue-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-navy-900 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>{enr.institutionName}</span>
                          </span>
                          {isOwnInstitution && (
                            <span className="text-[10px] bg-govblue-600 text-white px-2 py-0.5 rounded font-semibold">
                              Your Institution
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-slate-600">
                          <div>Course: <strong className="text-navy-900">{enr.programmeName}</strong></div>
                          <div>Roll Number: <code className="font-mono text-navy-900 font-bold">{enr.rollNumber}</code></div>
                          <div>Admission Date: <span className="font-mono">{enr.admissionDate}</span></div>
                          <div className="pt-1 flex items-center gap-2">
                            <span>Status:</span>
                            <StatusBadge status={enr.status} size="sm" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Provenance Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-navy-900">Deterministic Match Evidence:</p>
                <p className="text-slate-600 leading-relaxed">{c.evidenceText}</p>
                <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-4">
                  <span>Overlap: <strong>{c.dateOverlap}</strong></span>
                  {c.resolutionNotes && (
                    <span className="text-teal-700">Resolution: <strong>{c.resolutionNotes}</strong></span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clarification Modal */}
      {clarificationModalCase && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Submit Institution Clarification</h3>
              <button
                onClick={() => setClarificationModalCase(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Provide formal evidence reference for case <strong className="text-navy-900 font-mono">{clarificationModalCase.id}</strong> (Candidate: {clarificationModalCase.studentName}).
            </p>

            <form onSubmit={handleSubmitClarification} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Transfer Certificate / Migration Order Ref</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TC-BITS-2026-8819 or STATE-MIGRATION-ORDER-44"
                  value={docRef}
                  onChange={(e) => setDocRef(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Explanation & Institutional Statement</label>
                <textarea
                  rows={3}
                  required
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setClarificationModalCase(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-semibold"
                >
                  Submit Clarification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

