'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QRCode from 'qrcode';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Award, 
  Calendar, 
  QrCode, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  Lock,
  ExternalLink
} from 'lucide-react';

export default function VerifierRequestDetailPage() {
  const params = useParams();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    async function loadDetail() {
      try {
        const res = await fetch(`/api/v1/verifications/${params.id}`);
        const json = await res.json();
        if (json.data) {
          setRequest(json.data);
          // Generate authentic QR code for the opaque token
          if (json.data.opaqueToken) {
            const qr = await QRCode.toDataURL(
              `${window.location.origin}/verifier/scan?token=${json.data.opaqueToken}`,
              { margin: 2, width: 220 }
            );
            setQrCodeDataUrl(qr);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading verification claim details...</div>;
  }

  if (!request) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">Verification Record Not Found</p>
        <Link href="/verifier/requests" className="text-xs text-govblue-600 underline">Back to list</Link>
      </div>
    );
  }

  const result = request.verifiedResult;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/verifier/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Query Ledger</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-navy-900">{request.id}</span>
              <StatusBadge status={request.status} size="sm" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mt-1">{request.studentName}</h1>
            <p className="text-xs text-slate-500">
              Purpose: {request.purpose.replace(/_/g, ' ')} • Requester: {request.requesterOrg}
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Opaque Verification Token</span>
            <code className="font-mono text-navy-900 font-bold bg-slate-100 px-2.5 py-1 rounded border border-slate-200 mt-1 inline-block">
              {request.opaqueToken}
            </code>
          </div>
        </div>

        {/* Pending state notice */}
        {request.status === 'PENDING_STUDENT_CONSENT' && (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
            <Clock className="w-8 h-8 text-amber-600 mx-auto" />
            <h3 className="text-base font-bold text-amber-900">Awaiting Student Digital Consent</h3>
            <p className="text-xs text-amber-700 max-w-md mx-auto">
              Under DPDP statutory compliance, candidate <strong>{request.studentName}</strong> must grant digital consent through their student portal before enrolment records can be disclosed.
            </p>
            <div className="pt-2">
              <Link
                href="/student/verification-requests"
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors inline-block"
              >
                Switch to Student Portal to Approve (Demo Quick-Action)
              </Link>
            </div>
          </div>
        )}

        {/* Approved & Cryptographically Signed Result (PRD Screen 11) */}
        {request.status === 'APPROVED' && result && (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl border border-teal-200 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-teal-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">Official AICTE Enrolment Verification Proof</h3>
                    <p className="text-[11px] text-teal-800">Tamper-evident signed record issued by Central Enrolment Repository</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                  VERIFIED_ACTIVE
                </span>
              </div>

              {/* Data attributes revealed under consented scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified Institution</span>
                  <p className="font-bold text-navy-900 text-sm mt-0.5">{result.institutionName}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Technical Degree & Branch</span>
                  <p className="font-bold text-navy-900 text-sm mt-0.5">{result.programmeName}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Academic Year & Admission</span>
                  <p className="font-mono font-bold text-navy-900 text-sm mt-0.5">
                    Year: {result.academicYear} • Admitted: {result.admissionDate}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolment Status</span>
                  <p className="font-bold text-teal-700 text-sm mt-0.5">{result.enrolmentStatus}</p>
                </div>
              </div>

              {/* QR Code and Cryptographic Provenance */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 gap-6">
                <div className="space-y-2 text-xs text-slate-600 flex-1">
                  <p className="font-bold text-navy-900">Cryptographic Signature & Provenance:</p>
                  <p className="font-mono text-[10px] text-slate-500 break-all bg-slate-50 p-2 rounded border border-slate-100">
                    {result.cryptographicSignature}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Issuer: <strong>{result.issuerProvenance}</strong>
                  </p>
                </div>

                {qrCodeDataUrl && (
                  <div className="text-center flex-shrink-0">
                    <img src={qrCodeDataUrl} alt="Opaque QR Code" className="w-28 h-28 rounded-lg border border-slate-200 shadow-sm mx-auto" />
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">Opaque QR Proof</span>
                  </div>
                )}
              </div>

              {/* Statutory Disclaimer (FR-031) */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold">Statutory Notice: </span>
                {result.limitationsDisclaimer}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

