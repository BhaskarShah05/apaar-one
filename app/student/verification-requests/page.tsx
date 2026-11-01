'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Calendar, 
  Lock,
  ArrowRight
} from 'lucide-react';

export default function StudentVerificationRequestsPage() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingOnId, setActingOnId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [currentUser.studentUuid]);

  async function loadRequests() {
    try {
      const studentUuid = currentUser.studentUuid || 'stu-9011-8842-001';
      const res = await fetch(`/api/v1/verifications?studentUuid=${studentUuid}`);
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

  const handleDecision = async (requestId: string, decision: 'APPROVED' | 'DECLINED') => {
    setActingOnId(requestId);
    try {
      const res = await fetch(`/api/v1/verifications/${requestId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          studentName: currentUser.name,
        }),
      });
      if (res.ok) {
        await loadRequests();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActingOnId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Privacy & DPDP Compliance</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Student Digital Consent</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Authorized Verification Requests</h1>
          <p className="text-xs text-slate-500">
            Control which employers and verification partners can inspect your verified enrolment record.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Zero Unconsented Disclosures</span>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{req.id}</span>
                  <StatusBadge status={req.status} size="sm" />
                </div>
                <h3 className="text-base font-bold text-navy-900 mt-1">{req.requesterOrg}</h3>
                <p className="text-xs text-slate-500">
                  Requester: {req.requesterUser} • Purpose: <strong className="text-navy-900">{req.purpose}</strong>
                </p>
              </div>

              {req.status === 'PENDING_STUDENT_CONSENT' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecision(req.id, 'APPROVED')}
                    disabled={actingOnId === req.id}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Grant Consent</span>
                  </button>

                  <button
                    onClick={() => handleDecision(req.id, 'DECLINED')}
                    disabled={actingOnId === req.id}
                    className="px-3 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <span className="font-bold text-navy-900 text-[11px] uppercase tracking-wider block">
                Requested Attributes Scope:
              </span>
              <div className="flex flex-wrap gap-2">
                {req.requestedAttributes?.map((attr: string, idx: number) => (
                  <span key={idx} className="font-mono text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Token: <code className="font-mono text-slate-600">{req.opaqueToken}</code></span>
              <span>Expires: <strong className="text-slate-600">{new Date(req.expiresAt).toLocaleDateString()}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

