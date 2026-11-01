'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  QrCode, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Printer, 
  Lock,
  Building2,
  Calendar
} from 'lucide-react';

function ScanContent() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [inputToken, setInputToken] = useState(tokenParam || 'tok_v8f921ab90c34e7');
  const [resolvedResult, setResolvedResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (tokenParam) {
      resolveToken(tokenParam);
    }
  }, [tokenParam]);

  const resolveToken = async (tok: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/v1/verifications/${tok.trim()}`);
      const json = await res.json();
      if (res.ok && json.data) {
        if (json.data.status !== 'APPROVED') {
          setErrorMsg(`Token ${tok} is in status: ${json.data.status}. Candidate digital consent has not been granted.`);
          setResolvedResult(null);
        } else {
          setResolvedResult(json.data);
        }
      } else {
        setErrorMsg(`Invalid or expired verification token: "${tok}".`);
        setResolvedResult(null);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      resolveToken(inputToken.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      {/* Title */}
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">QR & Opaque Token Verification Desk</h1>
        <p className="text-xs text-slate-500 mt-1">
          Resolve short-lived opaque verification references without exposing raw APAAR or sensitive student PII.
        </p>
      </div>

      {/* Token Input Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-4">
        <label className="block text-xs font-bold text-navy-900">
          Enter Opaque Verification Reference Token or Scan QR
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="e.g. tok_v8f921ab90c34e7"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="w-full text-xs font-mono pl-9 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-govblue-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-all"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span>{loading ? 'Resolving...' : 'Verify Token'}</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-400">
          Try demo token: <code className="font-mono text-navy-900 font-bold cursor-pointer" onClick={() => setInputToken('tok_v8f921ab90c34e7')}>tok_v8f921ab90c34e7</code>
        </p>
      </form>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Resolved Verification Result (PRD Screen 11) */}
      {resolvedResult && resolvedResult.verifiedResult && (
        <div className="bg-white rounded-2xl border border-teal-200 shadow-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                <span>Enrolment Claim Authenticated</span>
              </span>
              <h2 className="text-xl font-bold text-navy-900 mt-2">{resolvedResult.studentName}</h2>
              <p className="text-xs text-slate-500">
                Verified Subject Reference: <code className="font-mono text-slate-700">{resolvedResult.studentApaarMasked}</code>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>

          {/* Scoped Result Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Educational Institution</span>
              <p className="font-bold text-navy-900 text-sm mt-0.5">{resolvedResult.verifiedResult.institutionName}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Technical Programme</span>
              <p className="font-bold text-navy-900 text-sm mt-0.5">{resolvedResult.verifiedResult.programmeName}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Admission Cycle</span>
              <p className="font-mono font-bold text-navy-900 text-sm mt-0.5">
                {resolvedResult.verifiedResult.academicYear} (Admitted: {resolvedResult.verifiedResult.admissionDate})
              </p>
            </div>

            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200">
              <span className="text-[10px] text-teal-700 font-bold uppercase block">Current Lifecycle Status</span>
              <p className="font-bold text-teal-800 text-sm mt-0.5">{resolvedResult.verifiedResult.enrolmentStatus}</p>
            </div>
          </div>

          {/* Cryptographic Signature Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
            <span className="font-bold font-sans text-navy-900 block">Cryptographic RSA Signature & Source:</span>
            <p className="text-[10px] text-slate-600 break-all">{resolvedResult.verifiedResult.cryptographicSignature}</p>
            <p className="text-[11px] font-sans text-slate-500 pt-1">
              Issued by: <strong>{resolvedResult.verifiedResult.issuerProvenance}</strong>
            </p>
          </div>

          {/* Statutory Disclaimer */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <span className="font-bold">Statutory Limitations Disclaimer: </span>
            {resolvedResult.verifiedResult.limitationsDisclaimer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifierScanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading scanner...</div>}>
      <ScanContent />
    </Suspense>
  );
}

