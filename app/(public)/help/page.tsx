'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, FileSpreadsheet, ShieldAlert, Download } from 'lucide-react';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is APAAR and how does APAAR ONE use it?',
      a: 'APAAR (Automated Permanent Academic Account Registry) is a unique 12-digit academic identifier assigned to students across India. APAAR ONE uses this identifier as a cross-institution reference to link student enrolment events without confusing institutional roll numbers.',
    },
    {
      q: 'Can an institution admit a student whose APAAR is not yet created?',
      a: 'Yes. Under the APAAR Pending Workflow (FR-010), an institution can admit a student using a provisional internal UUID. The system marks the identity state as NOT_SUBMITTED with a 30-day grace period for APAAR creation.',
    },
    {
      q: 'How does the system distinguish format validity from registry verification?',
      a: 'A valid 12-digit format check merely confirms syntax (FORMAT_VALID). Only a normalized affirmative response from an authorized ABC/APAAR gateway transitions the student to VERIFIED status.',
    },
    {
      q: 'What happens when a cross-institution duplicate is detected?',
      a: 'A conflict case is opened in the AICTE Review queue with date overlaps and match confidence. The reviewer evaluates whether it is a legitimate transfer with an approved Transfer Certificate (TC) or an unresolved simultaneous admission.',
    },
    {
      q: 'How are Tuition Fee Waiver (TFW) and supernumerary seats governed?',
      a: 'TFW seats are calculated at up to 5% supernumerary of the approved intake as per Clause 4.2 of the AICTE Approval Process Handbook. They are recorded in a separate seat ledger so they do not falsely trigger over-enrolment flags.',
    },
    {
      q: 'Can employers search the entire national student database?',
      a: 'No. External verifiers have zero search access to the national repository. They can only query a specific, authorized claim with explicit student digital consent.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl font-extrabold text-navy-900">
          Help Centre & Institutional Guidance
        </h1>
        <p className="text-sm text-slate-600">
          Find answers to common institutional onboarding questions, bulk upload file standards, and validation reason codes.
        </p>
      </div>

      {/* CSV Template Quick Download Card */}
      <div className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-navy-900">Official CSV Enrolment Submission Template</h3>
            <p className="text-xs text-slate-500">Includes canonical headers: institution_student_id, apaar_id, admission_date, category</p>
          </div>
        </div>
        <a
          href="/institution/uploads"
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Open Upload Wizard</span>
        </a>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-3">
        <h2 className="text-lg font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <span className="text-xs font-bold text-navy-900">{faq.q}</span>
                {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

