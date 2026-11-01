'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Database, ShieldCheck, Scale, QrCode, FileText, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const lifecycleSteps = [
    {
      num: '01',
      title: 'Batch Submission & ERP Telemetry',
      actor: 'Participating Institution',
      desc: 'Colleges upload student admissions via CSV batch files or automated campus ERP API webhooks. The intake parser validates schema, column definitions, and duplicate roll numbers before staging.',
      badge: 'Institution Gateway',
    },
    {
      num: '02',
      title: 'APAAR Identity Adapter Normalization',
      actor: 'MoE Registry Interface',
      desc: 'The pipeline queries the national APAAR/ABC registry adapter. It maps responses cleanly into VERIFIED, FORMAT_VALID, NOT_FOUND, or MISMATCH states with full idempotency.',
      badge: 'Identity Verification',
    },
    {
      num: '03',
      title: 'Cross-Institution Reconciler',
      actor: 'AICTE Central Rules Engine',
      desc: 'Deterministic queries scan across all 12,000+ AICTE institutions for concurrent active enrolments in the same academic year. Overlaps are routed to a neutral adjudication desk.',
      badge: 'Duplicate Prevention',
    },
    {
      num: '04',
      title: 'Policy-as-Code Seat Compliance',
      actor: 'Regulation Bureau Evaluator',
      desc: 'Admissions are verified mathematically against AICTE Approval Process Handbook (APH 2024-27) limits. Regular intake is strictly separated from 5% TFW and 10% Lateral Entry supernumeraries.',
      badge: 'Sanction Enforcement',
    },
    {
      num: '05',
      title: 'Consent-Gated Verification Desk',
      actor: 'Authorized Verifiers & Citizens',
      desc: 'Employers submit background checks. Verification decisions require citizen consent or authorized mandate. Tamper-evident proofs and signed QR tokens are issued with zero raw PII.',
      badge: 'Zero-Trust Verification',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 font-sans text-white">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ffcd75]" />
          <span>System Architecture & Lifecycle</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          How <span className="bg-gradient-to-r from-white via-white to-[#ffcd75] bg-clip-text text-transparent">APAAR ONE</span> Works
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          From institutional admission filing to cryptographic employer verification, every transaction is audited, privacy-preserved, and mathematically validated.
        </p>
      </div>

      {/* 5-Step Process */}
      <div className="space-y-4">
        {lifecycleSteps.map((s, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start gap-6 hover:border-white/20 transition-all"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white font-mono font-bold text-xl flex-shrink-0 border border-white/10">
              {s.num}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <span className="text-[10px] font-semibold text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded-full bg-white/5 uppercase tracking-wider">
                  {s.badge}
                </span>
              </div>
              <p className="text-xs text-amber-300 font-medium">Actor: {s.actor}</p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-white/10">
        <Link href="/about" className="text-xs text-zinc-400 hover:text-white transition-colors">
          ← About APAAR ONE
        </Link>
        <Link 
          href="/features"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all hover:scale-105"
        >
          View Feature Capabilities
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
