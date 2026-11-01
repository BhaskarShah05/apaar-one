'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, UploadCloud, ShieldAlert, Scale, QrCode, Database, Eye } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Authoritative Institution & Programme Scoping',
      desc: 'Institutions log into their isolated workspace. Approved intake quotas and supernumerary category entitlements (TFW, Lateral, NRI) are imported directly from AICTE approval records. Institutions cannot unilaterally alter approved seats.',
      icon: Database,
    },
    {
      num: '02',
      title: 'Bulk Ingestion & Column Mapping',
      desc: 'Operators upload student admission datasets via standard CSV/XLSX or ERP webhook. The schema mapper automatically aligns uploaded headers to canonical fields (institution_student_id, apaar_id, admission_date, category).',
      icon: UploadCloud,
    },
    {
      num: '03',
      title: 'Gateway Identity Normalization & Fault Handling',
      desc: 'The Identity Gateway queries the mock/authorized APAAR provider. It distinguishes format validity from registry verification, handling PENDING, UNAVAILABLE (504 timeout), MISMATCH, and NOT_FOUND states without silent failure.',
      icon: ShieldAlert,
    },
    {
      num: '04',
      title: 'Cross-Institution Conflict & Duplicate Detection',
      desc: 'The reconciliation engine compares the student HMAC against national active enrolments. If a candidate appears actively admitted across two institutions with overlapping dates, an evidence-first review case is generated.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Policy-as-Code Capacity Calculation',
      desc: 'Each admitted student is classified into their respective intake bucket. The policy engine evaluates whether admissions stay within base intake or approved supernumerary limits, preventing unapproved admissions.',
      icon: Scale,
    },
    {
      num: '06',
      title: 'Student-Consented Opaque Verification',
      desc: 'Authorized employers or background verification agencies request enrolment proof. Students grant consent via their portal, producing an opaque, signed verification token and QR code without exposing raw APAAR or Aadhaar data.',
      icon: QrCode,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-12">
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          Architecture & Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          How Data Moves Across APAAR ONE
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From institutional data entry to national regulatory monitoring and student-consented third-party verification, every event is auditable, explainable, and privacy-preserving.
        </p>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle flex flex-col md:flex-row items-start gap-6 hover:border-slate-300 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-teal-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-base shadow-sm">
                {s.num}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Try Demo CTAs */}
      <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-navy-900">Ready to test the workflow interactively?</p>
          <p className="text-xs text-slate-500">Jump right into the institution upload wizard or AICTE alert triage.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/institution/uploads"
            className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800 transition-colors"
          >
            Upload Wizard Demo
          </Link>
          <Link
            href="/aicte/alerts"
            className="px-4 py-2 bg-white text-navy-900 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Review Conflict Cases
          </Link>
        </div>
      </div>
    </div>
  );
}

