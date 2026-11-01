'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { Building2, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function VerifierOrganizationPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">Verifier Organization Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered screening agency credentials, background investigation license, and compliance tier.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6 text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-navy-900">{currentUser.verifierOrg || 'TechCorp Background Screening Services Pvt Ltd'}</h2>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                  AICTE Regulated Verifier
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">Corporate ID: U72900DL2018PTC339182 • License Ref: AICTE/VERIF/2026/089</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Authorized Lead Officer</span>
            <p className="font-bold text-navy-900 mt-0.5">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400">{currentUser.email}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Verification Quota</span>
            <p className="font-bold text-navy-900 mt-0.5">500 Queries / Month</p>
            <p className="text-[10px] text-teal-600 font-semibold">Tier-1 Enterprise SLA</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">DPDP Compliance Officer</span>
            <p className="font-bold text-navy-900 mt-0.5">Sunita Raghavan</p>
            <p className="text-[10px] text-slate-400">dpo@techcorp-verif.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

