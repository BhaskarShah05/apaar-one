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
    <div className="max-w-4xl mx-auto py-12 space-y-12 font-sans text-white">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#ffcd75]" />
          <span>Support & Grievance Desk</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Help <span className="bg-gradient-to-r from-white via-white to-[#ffcd75] bg-clip-text text-transparent">Centre</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
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
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 backdrop-blur-xl"
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
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-[#ffcd75] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#ffcd75]" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
          <Mail className="w-5 h-5 text-[#ffcd75] mx-auto" />
          <span className="font-bold text-xs text-white block">Email Support</span>
          <span className="text-[11px] text-zinc-400">helpdesk@aicte-india.org</span>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
          <Phone className="w-5 h-5 text-emerald-400 mx-auto" />
          <span className="font-bold text-xs text-white block">Toll-Free Helpline</span>
          <span className="text-[11px] text-zinc-400">1800-11-2024 (9AM - 6PM)</span>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
          <MessageSquare className="w-5 h-5 text-purple-400 mx-auto" />
          <span className="font-bold text-xs text-white block">Grievance Portal</span>
          <span className="text-[11px] text-zinc-400">Central Redressal Desk</span>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between items-center pt-6 border-t border-white/10">
        <Link href="/security-privacy" className="text-xs text-zinc-400 hover:text-white transition-colors">
          ← Security & DPDP
        </Link>
        <Link 
          href="/sign-in"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all hover:scale-105"
        >
          Sign In to Portals
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
