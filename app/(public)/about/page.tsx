'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, CheckCircle2, XCircle, ArrowRight, Building, Award, Database, Layers } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-govblue-50 text-govblue-700 text-xs font-semibold">
          <Info className="w-3.5 h-3.5" />
          <span>About APAAR ONE Ecosystem</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Bridging the Aggregate Reporting Gap in Technical Education
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Under the AICTE Approval Process, participating institutions historically reported aggregate enrolment statistics during annual approval cycles. APAAR ONE introduces a unified, continuous, student-level enrolment integrity and verification framework anchored on India's Automated Permanent Academic Account Registry (APAAR).
        </p>
      </div>

      {/* The 5 Operational Gaps Solved */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-borderLine shadow-subtle space-y-6">
        <h2 className="text-xl font-bold text-navy-900">The 5 Operational Gaps Addressed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-bold text-navy-900 text-sm">1. Identity Gap</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Student records across state boundaries were previously identified only by internal college roll numbers. APAAR ONE anchors records on the national 12-digit APAAR reference.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-bold text-navy-900 text-sm">2. Visibility Gap</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aggregate figures prevented regulators from inspecting the underlying cohort distribution. APAAR ONE provides row-level validation with real-time intake telemetry.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-bold text-navy-900 text-sm">3. Reconciliation Gap</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students appearing in multiple institutes simultaneously or hopping admissions without transfer certificates are caught deterministically across institutions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-bold text-navy-900 text-sm">4. Compliance Gap</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Special category quotas (TFW, NRI, Lateral Entry) cannot be checked by simple headcounts. APAAR ONE encodes category-aware policy ledgers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 md:col-span-2">
            <p className="font-bold text-navy-900 text-sm">5. Trust Gap</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              External verifiers (employers, visa authorities) lacked a privacy-preserving, consent-driven method to verify student enrolment provenance. APAAR ONE provides opaque QR tokens and signed proofs.
            </p>
          </div>
        </div>
      </div>

      {/* Ecosystem Boundaries (Non-Goals) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-borderLine shadow-subtle space-y-6">
        <h2 className="text-xl font-bold text-navy-900">Ecosystem Boundaries & What APAAR ONE Does Not Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-900">
            <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">What It Does:</span> Connects institutional admissions to APAAR, verifies capacity compliance, identifies duplicate enrolments, and provides verifiable enrolment proofs.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-900">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Does NOT Replace APAAR/ABC:</span> APAAR ONE does not generate APAAR IDs or manage credit banking; it integrates with authorized APIs.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-900">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Does NOT Replace DigiLocker/NAD:</span> APAAR ONE does not store or issue digital degrees; award verification redirects to DigiLocker/NAD.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-900">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">No Black-Box Fraud Decisions:</span> Anomaly alerts and duplicates are triage leads requiring human regulatory review, not automatic sanctions.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Link
          href="/how-it-works"
          className="px-6 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-2"
        >
          <span>Continue to How It Works</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

