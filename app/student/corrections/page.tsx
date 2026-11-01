'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AlertCircle, Plus, Send, CheckCircle2, History } from 'lucide-react';

interface CorrectionItem {
  id: string;
  recordField: string;
  reason: string;
  status: string;
  submittedAt: string;
  resolvedAt?: string;
  institutionResponse: string;
}

export default function StudentCorrectionsPage() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<CorrectionItem[]>([
    {
      id: 'CORR-2026-001',
      recordField: 'Father / Guardian Name Spelling',
      reason: 'Matriculation marksheet spells name as "M. K. Sharma", but provisional slip omitted middle initial.',
      status: 'RESOLVED',
      submittedAt: '2026-08-12T10:00:00Z',
      resolvedAt: '2026-08-13T14:30:00Z',
      institutionResponse: 'Corrected in master enrolment record after inspecting 10th CBSE certificate.',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [field, setField] = useState('Identity Attribute (Name / DOB)');
  const [reason, setReason] = useState('');
  const [docRef, setDocRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests([
      ...requests,
      {
        id: `CORR-2026-${Math.floor(100 + Math.random() * 899)}`,
        recordField: field,
        reason,
        status: 'OPEN',
        submittedAt: new Date().toISOString(),
        institutionResponse: 'Pending review by Delhi Institute of Technology Academic Registrar.',
      },
    ]);
    setModalOpen(false);
    setReason('');
    setDocRef('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Correction & Dispute Requests</h1>
          <p className="text-xs text-slate-500 mt-1">
            Exercise your statutory right to rectify erroneous institutional enrolment records under DPDP Act 2023.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-teal-400" />
          <span>Raise Correction Request</span>
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-navy-900">{r.id}</span>
                <StatusBadge status={r.status} size="sm" />
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{new Date(r.submittedAt).toLocaleDateString()}</span>
            </div>

            <h3 className="text-sm font-bold text-navy-900">Disputed Field: {r.recordField}</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{r.reason}</p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-navy-900">Institutional Action: </span>
              <span>{r.institutionResponse}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Raise Dispute / Record Rectification</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Affected Record Field</label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white"
                >
                  <option value="Student Legal Name">Student Legal Name</option>
                  <option value="Date of Birth">Date of Birth</option>
                  <option value="Admission Category (Quota)">Admission Category (Quota)</option>
                  <option value="APAAR ID Mapping">APAAR ID Mapping</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Supporting Document Reference</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBSE_CLASS_X_ROLL_481920 or AADHAAR_REF"
                  value={docRef}
                  onChange={(e) => setDocRef(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Detailed Explanation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why the current record is incorrect..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
