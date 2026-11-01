'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building2, Scale, Users, Search, ShieldCheck, CheckCircle2, Lock, Cpu, QrCode } from 'lucide-react';

export default function FeaturesPage() {
  const portalFeatures = [
    {
      title: 'AICTE Regulation Bureau Console',
      icon: Scale,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
      features: [
        'National Enrolment Intelligence & Regional Heatmap',
        'Cross-State Concurrent Enrolment Triage Desk',
        'Automated Seat Capacity & Over-Intake Violation Flags',
        'Policy-as-Code Rule Sandbox for APH 2024-27 Clauses',
        'Immutable SHA-256 Chained Cryptographic Audit Trail',
      ],
    },
    {
      title: 'Institution Administration Workspace',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
      features: [
        'Drag-and-Drop CSV Batch Uploads with Live Preview',
        'Instant APAAR Format & Registry Mismatch Resolver',
        'Policy-Compliant Supernumerary Quota Calculator',
        'Adjudication Portal for Transfer Certificate Hand-offs',
        'Campus ERP Webhook Integrations & Role-Based Access Control',
      ],
    },
    {
      title: 'Citizen Student Portal',
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
      features: [
        'Digital Masked APAAR Card (XXXX-XXXX-4819)',
        'Audited Unmasking for Authorized Identity Reviews',
        '1-Click Consent Gate for Third-Party Background Checks',
        'Self-Service Demographic Data Correction Tracking',
        'DPDP-Compliant Disclosure & Sharing Ledger',
      ],
    },
    {
      title: 'External Verifier Portal',
      icon: Search,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200',
      features: [
        'Single & Bulk Candidate Academic Enrolment Queries',
        'Instant Signed QR Code Scanner (Camera & Manual Token)',
        'Tamper-Evident Enrolment Verification Certificates',
        'Cryptographic Token Integrity Checking (ECDSA-P256)',
        'Developer REST API Keys & ATS Integration Sandbox',
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 font-sans text-zinc-900">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Platform Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          Enterprise Features for <span className="text-zinc-900 underline decoration-amber-400 decoration-wavy underline-offset-8">Every Stakeholder</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
          Four purpose-built portals sharing the same unified data architecture, zero-trust security model, and regulatory policy engine.
        </p>
      </div>

      {/* 4 Feature Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portalFeatures.map((pf, idx) => {
          const IconC = pf.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all hover:shadow hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl border ${pf.bg}`}>
                    <IconC className={`w-6 h-6 ${pf.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">{pf.title}</h3>
                </div>

                <div className="h-px w-full bg-zinc-100 my-4" />

                <ul className="space-y-3">
                  {pf.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 hover:text-blue-600 transition-colors"
                >
                  Test in Sandbox Environment →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
        <Link href="/how-it-works" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
          ← How It Works
        </Link>
        <Link 
          href="/security-privacy"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-all hover:scale-105 shadow-sm"
        >
          Security & DPDP Safeguards
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
