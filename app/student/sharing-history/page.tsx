'use client';

import React from 'react';
import { History, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function StudentSharingHistoryPage() {
  const history = [
    {
      id: 'DISC-001',
      recipientOrg: 'TechCorp Background Screening Services Pvt Ltd',
      purpose: 'Employment Background Check (Software Engineer Hire)',
      attributes: ['institution_name', 'programme_name', 'admission_date', 'enrolment_status'],
      timestamp: '2026-09-02T11:45:00Z',
      tokenUsed: 'tok_v8f921ab90c34e7',
      status: 'VERIFIED_ACTIVE',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">Enrolment Disclosure & Sharing History</h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete, tamper-evident log of every third-party entity that accessed your verified academic enrolment.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span>Active & Historical Consents (DPDP Act Compliance)</span>
          <span className="text-teal-700 font-mono text-[11px] font-bold">1 Verified Disclosure</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {history.map((h) => (
            <div key={h.id} className="p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-navy-900 text-sm">{h.recipientOrg}</span>
                <span className="text-[11px] font-mono text-slate-400">{new Date(h.timestamp).toLocaleString()}</span>
              </div>

              <p className="text-slate-600">
                Purpose: <strong className="text-navy-900">{h.purpose}</strong>
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-2 text-[11px]">
                <span className="text-slate-400 font-bold uppercase">Shared Attributes:</span>
                {h.attributes.map((a, i) => (
                  <span key={i} className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    {a}
                  </span>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1">
                <span>Opaque Reference Token: {h.tokenUsed}</span>
                <span className="text-teal-600 font-bold">Student Consent Recorded</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

