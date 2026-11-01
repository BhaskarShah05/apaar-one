'use client';

import React from 'react';
import { Lock, ShieldCheck, EyeOff, Key, Database, FileText, CheckCircle2 } from 'lucide-react';

export default function SecurityPrivacyPage() {
  const securityControls = [
    {
      title: 'Digital Personal Data Protection (DPDP) Act 2023 Alignment',
      desc: 'The architecture adheres strictly to India’s DPDP Act, 2023 and DPDP Rules, 2025. Clearly separates regulatory reporting authority from student-consented third-party disclosures.',
      icon: ShieldCheck,
    },
    {
      title: 'Strict Data Minimization & No Aadhaar Ingestion',
      desc: 'APAAR ONE never requests, collects, or stores Aadhaar numbers. APAAR references are 12-digit academic identifiers, eliminating high-risk biometric or sensitive personal identifier exposure.',
      icon: EyeOff,
    },
    {
      title: 'Keyed HMAC Pseudonymization for Duplicate Matching',
      desc: 'Internal equality checks and cross-institution deduplication operate on keyed SHA-256 HMAC tokens. The raw 12-digit APAAR is kept within an encrypted, isolated boundary.',
      icon: Key,
    },
    {
      title: 'Opaque QR Payloads & Zero PII on Public Networks',
      desc: 'QR codes contain short-lived, opaque random references (e.g., tok_v8f921ab). Scanning a QR resolves server-side to verified claims only after authentication. No raw PII is embedded in QR images or public URLs.',
      icon: Lock,
    },
    {
      title: 'Tenant Row-Scoping & Server-Side RBAC',
      desc: 'Institution users can strictly access only records belonging to their authenticated institution context. College A cannot read, query, or mutate College B records via UI or API.',
      icon: Database,
    },
    {
      title: 'Tamper-Evident Immutable Audit Logging',
      desc: 'Every sensitive operation—including APAAR reveals, case triage decisions, and report downloads—is logged with actor, role, correlation ID, timestamp, and IP provenance.',
      icon: FileText,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          Trust & Compliance Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Security, Privacy & Consent Architecture
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          National educational records require defense-in-depth engineering. APAAR ONE incorporates privacy-by-design from inception.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityControls.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-navy-900">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-navy-900 text-sm">Regulatory Notice Regarding SIH Demonstration</p>
        <p>
          All student names, APAAR-like strings, and institutional records demonstrated in this prototype are synthetic fixtures created solely for testing system mechanics. Live production deployments will interface exclusively through authorized government gateways (e.g. APISetu, ABC Registry) following official onboarding and data protection audits.
        </p>
      </div>
    </div>
  );
}

