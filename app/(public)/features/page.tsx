'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Database, 
  Scale, 
  ShieldCheck, 
  QrCode, 
  History, 
  Cpu, 
  Sliders, 
  FileCheck2,
  CheckCircle2,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: 'Decoupled Identity & Enrolment Model',
      desc: 'One immutable student identity reference maps to multiple time-bounded enrolment records over time. Enables complete tracking of transfers, diploma migrations, and multi-year lifecycle events without duplicate entity creation.',
      icon: Database,
      badge: 'Core Architecture',
    },
    {
      title: 'Dynamic Policy-as-Code Seat Engine',
      desc: 'Formulates AICTE Approval Process Handbook (APH) regulations into versioned, testable logic. Models Regular approved intake, supernumerary TFW (5%), NRI/FN (15%), and Lateral Entry (10%) with mathematical transparency.',
      icon: Scale,
      badge: 'Regulatory Engine',
    },
    {
      title: 'Deterministic & Anomaly Reconciliation',
      desc: 'Cross-institution conflict identification flags overlapping active admission dates and duplicate APAAR submissions with evidence provenance, reason codes, and human review states.',
      icon: ShieldCheck,
      badge: 'Reconciliation',
    },
    {
      title: 'Opaque Privacy-Preserving Verification',
      desc: 'Issues short-lived opaque verification references. Verifiers verify valid enrolment without accessing raw personal data or unmasked 12-digit identifiers, fully respecting DPDP Act 2023 principles.',
      icon: QrCode,
      badge: 'Verification',
    },
    {
      title: 'Append-Only Audit Trail',
      desc: 'Every sensitive operation—including batch submissions, identity reveals, case resolutions, and policy publications—is recorded in an immutable audit ledger with correlation IDs and timestamps.',
      icon: History,
      badge: 'Governance',
    },
    {
      title: 'Institutional ERP API Integration',
      desc: 'Provides secure REST endpoints for university ERPs and student management systems with idempotency keys, column mapping templates, and live connection health diagnostics.',
      icon: Cpu,
      badge: 'Interoperability',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-govblue-700 text-xs font-semibold border border-blue-200">
          Platform Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Enterprise Features for National Academic Governance
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Engineered for accuracy, privacy, explainability, and regulatory compliance across thousands of institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900">
                  <Icon className="w-5 h-5 text-govblue-600" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-900">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-navy-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
        <div>
          <h3 className="text-xl font-bold">Experience the Platform Live</h3>
          <p className="text-xs text-slate-300 mt-1">Switch between all 5 workspaces seamlessly in our SIH prototype environment.</p>
        </div>
        <Link
          href="/institution/overview"
          className="px-5 py-2.5 bg-govteal-600 hover:bg-govteal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <span>Open Institution Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

