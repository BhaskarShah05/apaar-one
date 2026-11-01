'use client';

import React from 'react';
import { HelpCircle, Shield, FileText, Mail, Phone } from 'lucide-react';

export default function StudentHelpPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">Student Help & Grievance Redressal</h1>
        <p className="text-xs text-slate-500 mt-1">
          Support guidance regarding your APAAR ID, enrolment records, and statutory data principal rights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-govblue-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-navy-900">How do I create or verify my APAAR ID?</h2>
          <p className="text-slate-600 leading-relaxed">
            Students can generate their APAAR ID through the DigiLocker mobile application or via your institutional student portal using Aadhaar e-KYC. APAAR ONE automatically verifies your ID once linked by your college.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-navy-900">Data Principal Rights under DPDP Act 2023</h2>
          <p className="text-slate-600 leading-relaxed">
            As a student (Data Principal), you have the right to access your enrolment records, request correction of inaccurate data, and withdraw digital consent for third-party background verification at any time.
          </p>
        </div>
      </div>

      {/* Official Redressal Contacts */}
      <div className="bg-white p-6 rounded-2xl border border-borderLine shadow-subtle space-y-4">
        <h2 className="text-sm font-bold text-navy-900">Institutional Data Protection Officer (DPO)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">Campus Grievance Officer</p>
            <p>Prof. Anirudh Sen, Dean of Academic Welfare</p>
            <p className="text-[11px] text-slate-500">Email: grievance@dit.edu.in • Phone: +91 11 2659 7199</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy-900">AICTE National Bureau Redressal</p>
            <p>Student Academic Redressal Cell, AICTE New Delhi</p>
            <p className="text-[11px] text-slate-500">Email: helpdesk-apaar@aicte.gov.in • Toll Free: 1800-11-2244</p>
          </div>
        </div>
      </div>
    </div>
  );
}

