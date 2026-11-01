'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, HelpCircle, ChevronDown, ChevronUp, Search, Mail, Phone, MessageSquare } from 'lucide-react';

export default function HelpCentrePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'What is APAAR ID and why is it mandatory for AICTE enrolments?',
      a: 'The Automated Permanent Academic Account Registry (APAAR / EduLocker) is a 12-digit lifelong academic identifier issued under the Ministry of Education. It unifies student records across primary, secondary, and higher education under NEP 2020.',
    },
    {
      q: 'How does APAAR ONE differentiate regular intake from supernumerary seats?',
      a: 'Per AICTE Approval Process Handbook (APH 2024-27) Clauses 4.2 & 4.4, Tuition Fee Waiver (TFW 5%) and Lateral Entry (10%) are governed supernumeraries that sit above approved intake. APAAR ONE evaluates arithmetic proofs preventing institutes from over-admitting into regular seats and misclassifying them.',
    },
    {
      q: 'What happens when a student is found enrolled in two institutions concurrently?',
      a: 'APAAR ONE flags concurrent active enrolments in the same academic year as a neutral review case (not an automatic fraud charge). Both institutions and the regional AICTE bureau receive notification to verify Transfer Certificates and admission cancellations.',
    },
    {
      q: 'Can employers view a student’s degree or grades through this platform?',
      a: 'No. APAAR ONE is strictly an enrolment and academic identity verification platform. Degree certificates, marksheets, and official awards remain exclusively governed and issued by DigiLocker and the National Academic Depository (NAD).',
    },
    {
      q: 'How does an external verifier scan the student QR code?',
      a: 'Verifiers use the External Verifier Portal camera scanner or manual token entry. The QR code contains a cryptographically signed opaque token (e.g. TOK-VER-98234-A7) that resolves to an official tamper-evident Enrolment Verification Certificate.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 font-sans text-zinc-900">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Support & Grievance Desk</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          Help <span className="text-zinc-900 underline decoration-amber-400 decoration-wavy underline-offset-8">Centre</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-600">
          Frequently asked questions, regulatory guidelines, and support desk for institutions, students, and verifiers.
        </p>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-5" />
          <input
            type="text"
            placeholder="Search FAQs, regulations, or error codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-zinc-900 hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-center space-y-2">
          <Mail className="w-5 h-5 text-amber-600 mx-auto" />
          <span className="font-bold text-xs text-zinc-950 block">Email Support</span>
          <span className="text-[11px] text-zinc-500 font-mono">helpdesk@aicte-india.org</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-center space-y-2">
          <Phone className="w-5 h-5 text-emerald-600 mx-auto" />
          <span className="font-bold text-xs text-zinc-950 block">Toll-Free Helpline</span>
          <span className="text-[11px] text-zinc-500 font-mono">1800-11-2024 (9AM - 6PM)</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-center space-y-2">
          <MessageSquare className="w-5 h-5 text-purple-600 mx-auto" />
          <span className="font-bold text-xs text-zinc-950 block">Grievance Portal</span>
          <span className="text-[11px] text-zinc-500">Central Redressal Desk</span>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
        <Link href="/security-privacy" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
          ← Security & DPDP
        </Link>
        <Link 
          href="/sign-in"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-all hover:scale-105 shadow-sm"
        >
          Sign In to Portals
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
