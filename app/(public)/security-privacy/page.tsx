'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, History, AlertTriangle } from 'lucide-react';

export default function SecurityPrivacyPage() {
  const safeguards = [
    {
      title: 'Masked APAAR Identifier by Default',
      desc: 'All user interfaces render APAAR as XXXX-XXXX-4819. Only authorized administrators with explicit business necessity can unmask references.',
      badge: 'DPDP Minimization',
    },
    {
      title: 'Audited Unmasking Provenance',
      desc: 'Clicking unmask triggers an immediate immutable event (SECURITY_APPAR_UNMASKED) recording actor identity, IP, timestamp, and justification.',
      badge: 'Accountability',
    },
    {
      title: 'Opaque Verification Tokens (Zero Raw PII in QR)',
      desc: 'QR codes and verification hyperlinks contain short-lived cryptographically signed opaque tokens (e.g. TOK-VER-98234-A7). They never embed raw student names, Aadhaar, or phone numbers.',
      badge: 'Zero Trust QR',
    },
    {
      title: 'Student Consent Governance Desk',
      desc: 'External verifier requests trigger notification to the student. Records are inaccessible until the student approves or legal regulatory mandate applies.',
      badge: 'Consent Architecture',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 font-sans text-zinc-900">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Security, Encryption & DPDP Act 2023</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          Privacy-by-Design <span className="text-zinc-900 underline decoration-amber-400 decoration-wavy underline-offset-8">Safeguards</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          How APAAR ONE protects citizen privacy, enforces data minimization, and guarantees cryptographic integrity across every transaction.
        </p>
      </div>

      {/* Safeguards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeguards.map((sg, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm space-y-3 hover:border-zinc-300 transition-all hover:shadow hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-zinc-600 border border-zinc-200 px-2.5 py-0.5 rounded-full bg-zinc-50 uppercase tracking-wider">
                {sg.badge}
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950">{sg.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{sg.desc}</p>
          </div>
        ))}
      </div>

      {/* DPDP Compliance Card */}
      <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
          <Lock className="w-5 h-5 text-amber-600" />
          Digital Personal Data Protection Act (DPDP 2023) Alignment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-600 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
            <span className="font-bold text-zinc-950 block mb-1">Purpose Limitation</span>
            Data collected solely for academic enrolment validation and capacity compliance.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
            <span className="font-bold text-zinc-950 block mb-1">Storage Minimization</span>
            No permanent caching of biometrics, Aadhaar numbers, or financial information.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
            <span className="font-bold text-zinc-950 block mb-1">Right to Correction</span>
            Students track and request correction of demographic registry mismatches directly.
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
        <Link href="/features" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
          ← Platform Features
        </Link>
        <Link 
          href="/help"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-all hover:scale-105 shadow-sm"
        >
          Help & Support Desk
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
