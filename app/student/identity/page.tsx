'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { Award, ShieldCheck, CheckCircle2, Lock, Eye, Download, QrCode } from 'lucide-react';

export default function StudentIdentityPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">My Academic Identity (APAAR / ABC)</h1>
        <p className="text-xs text-slate-500 mt-1">
          Self-sovereign view of your registered academic identifier and authoritative registry verification status.
        </p>
      </div>

      {/* Identity Card Details */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-900 text-teal-300 flex items-center justify-center font-serif text-2xl font-black">
              अ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-navy-900">{currentUser.name}</h2>
                <StatusBadge status="VERIFIED" size="sm" />
              </div>
              <p className="text-xs text-slate-500">Academic Bank of Credits Account Linked</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">APAAR Reference</span>
            <div className="mt-1">
              <IdentityMask maskedValue={currentUser.studentApaarId || 'XXXX-XXXX-4819'} fullValue="9021-3847-1092" allowReveal={true} />
            </div>
          </div>
        </div>

        {/* Minimal permitted profile attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Legal Name</span>
            <p className="font-bold text-navy-900 mt-0.5">{currentUser.name}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Date of Birth (Masked)</span>
            <p className="font-mono font-bold text-navy-900 mt-0.5">15-XX-2004</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Gender</span>
            <p className="font-bold text-navy-900 mt-0.5">Male</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Father / Guardian</span>
            <p className="font-bold text-navy-900 mt-0.5">M. K. Sharma</p>
          </div>
        </div>

        {/* Registry verification evidence */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-teal-800">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Identity Provenance Information (FR-009)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div>Provider: <strong className="font-mono">APISetu / ABC Sandbox</strong></div>
            <div>Transaction Ref: <strong className="font-mono">TXN-ABC-2026-9921</strong></div>
            <div>Verified At: <strong className="font-mono">2026-08-11 11:20 UTC</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

