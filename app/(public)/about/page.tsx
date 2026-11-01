'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, CheckCircle2, ArrowRight, Building, Award, Database, Layers, Sparkles, Scale, Lock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 font-sans text-white">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ffcd75]" />
          <span>About APAAR ONE Ecosystem</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Bridging the Aggregate Reporting Gap in <span className="bg-gradient-to-r from-white via-white to-[#ffcd75] bg-clip-text text-transparent">Technical Education</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Under AICTE Approval Process regulations, institutions historically reported aggregate admission numbers. APAAR ONE establishes continuous, student-level enrolment integrity anchored on India's 12-digit Automated Permanent Academic Account Registry.
        </p>
      </div>

      {/* The 5 Operational Gaps Solved */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#ffcd75]" />
          5 Critical Operational Gaps Addressed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
            <p className="font-bold text-white text-sm">1. Identity Gap</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Previously identified only by disparate college roll numbers. APAAR ONE unifies records across states via the national 12-digit APAAR identifier.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
            <p className="font-bold text-white text-sm">2. Visibility Gap</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Replaces opaque summary totals with row-level validation and continuous admissions telemetry.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
            <p className="font-bold text-white text-sm">3. Reconciliation Gap</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Detects dual-state concurrent admissions and missing transfer certificates with neutral date-overlap evidence.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
            <p className="font-bold text-white text-sm">4. Compliance Gap</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Encodes AICTE Approval Process Handbook (APH 2024-27) into Policy-as-Code to prevent illegal over-capacity absorption.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2 md:col-span-2">
            <p className="font-bold text-white text-sm">5. Trust Gap</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Empowers employers and credential verifiers with signed, tamper-evident verification outputs and opaque QR tokens without compromising citizen privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Ecosystem Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-xl space-y-3">
          <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            What APAAR ONE Does
          </h3>
          <ul className="text-xs text-zinc-300 space-y-2">
            <li>• Verifies ongoing institutional academic enrolment status.</li>
            <li>• Reconciles student identity via APAAR / ABC Registry.</li>
            <li>• Enforces approved seat ceilings and supernumerary caps.</li>
            <li>• Maintains immutable audit trail of unmasking and verification.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-3">
          <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Clean Architectural Boundaries
          </h3>
          <ul className="text-xs text-zinc-300 space-y-2">
            <li>• Does NOT issue or store degrees (delegated to DigiLocker/NAD).</li>
            <li>• Does NOT administer admission entrance exams (handled by NTA/States).</li>
            <li>• Does NOT make automated accusatory fraud rulings.</li>
            <li>• Does NOT expose raw Aadhaar or unmasked APAAR without audit logs.</li>
          </ul>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-white/10">
        <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
          ← Back to Overview
        </Link>
        <Link 
          href="/how-it-works"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all hover:scale-105"
        >
          Explore How It Works
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
