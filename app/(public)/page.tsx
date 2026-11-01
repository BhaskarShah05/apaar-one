'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  Scale,
  Users,
  Search,
  Lock,
  Layers,
  FileCheck,
  Sparkles,
  ChevronRight,
  Database,
  QrCode,
  FileText,
  AlertTriangle,
  Play
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { switchUser } = useAuth();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      step: '01',
      title: 'Student Data Submission',
      actor: 'AICTE Institution',
      desc: 'Institutions submit student-level enrolment records via secure CSV bulk upload or ERP REST API with institutional roll numbers and APAAR references.',
      detail: 'Supports column mapping, header autodetection, and instant pre-upload validation preview.',
    },
    {
      step: '02',
      title: 'APAAR Identity Validation',
      actor: 'Identity Gateway',
      desc: 'Normalizes responses from authorized APAAR/ABC adapters, distinguishing structural format validation from authoritative registry verification.',
      detail: 'Handles VERIFIED, FORMAT_VALID, NOT_FOUND, MISMATCH, and UNAVAILABLE states gracefully without false negatives.',
    },
    {
      step: '03',
      title: 'Reconciliation & Duplicate Engine',
      actor: 'AICTE Central Registry',
      desc: 'Runs deterministic cross-institution checks to identify potential concurrent active enrolments, within-batch duplicates, and roll-number collisions.',
      detail: 'Flags review cases with match confidence and date overlap rather than automatic punitive accusations.',
    },
    {
      step: '04',
      title: 'Policy-as-Code Seat Compliance',
      actor: 'Regulation Bureau Engine',
      desc: 'Evaluates admissions against approved capacity using versioned AICTE Approval Process Handbook (APH 2024-27) rules across Regular, TFW, and NRI buckets.',
      detail: 'Computes exact arithmetic ledger showing whether seats sit within intake or are supernumerary.',
    },
    {
      step: '05',
      title: 'Controlled Academic Verification',
      actor: 'Students & Verifiers',
      desc: 'External verifiers request scoped proof with student consent. Generates signed, tamper-evident verification outputs and opaque QR codes.',
      detail: 'Strictly distinguishes enrolment verification from issuer-backed degree award verification (DigiLocker/NAD).',
    },
  ];

  const stakeholders = [
    {
      title: 'AICTE Regulation Bureau',
      role: 'Regulatory Oversight & Policy Engine',
      desc: 'Gain real-time national visibility over student admissions, cross-state duplicate enrolments, and institute seat quota compliance.',
      actionText: 'Open AICTE Console',
      href: '/aicte/overview',
      roleKey: 'AICTE_REVIEWER',
      icon: Building2,
      color: 'border-blue-200 bg-blue-50/50 text-blue-700',
    },
    {
      title: 'Approved Institutions',
      role: 'Admissions & Compliance Workspace',
      desc: 'Streamline annual enrolment returns, bulk upload student batches, reconcile APAAR identities, and resolve validation issues transparently.',
      actionText: 'Open Institution Workspace',
      href: '/institution/overview',
      roleKey: 'INSTITUTION_ADMIN',
      icon: Layers,
      color: 'border-teal-200 bg-teal-50/50 text-teal-700',
    },
    {
      title: 'Students & Alumni',
      role: 'Self-Sovereign Academic Identity',
      desc: 'Inspect your active institutional enrolments linked to your APAAR ID, grant or decline verification requests, and track disclosure logs.',
      actionText: 'Open Student Portal',
      href: '/student/overview',
      roleKey: 'STUDENT',
      icon: Users,
      color: 'border-purple-200 bg-purple-50/50 text-purple-700',
    },
    {
      title: 'Authorized Verifiers',
      role: 'Secure Background Screening',
      desc: 'Perform legitimate, student-consented background checks with cryptographic proof of institutional enrolment without raw PII exposure.',
      actionText: 'Open Verifier Portal',
      href: '/verifier/overview',
      roleKey: 'EXTERNAL_VERIFIER',
      icon: Search,
      color: 'border-amber-200 bg-amber-50/50 text-amber-700',
    },
  ];

  const quickLaunch = (roleKey: string, path: string) => {
    switchUser(roleKey);
    router.push(path);
  };

  return (
    <div className="space-y-16 py-4 max-w-7xl mx-auto">
      {/* Proposed Solution Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-subtle">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Proposed SIH Solution Specification:</span> APAAR ONE is a prototype solution developed for the Smart India Hackathon under the AICTE Regulation Bureau. It demonstrates end-to-end student data management, APAAR-linked enrolment intelligence, and verification workflows using synthetic datasets. It does not imply official government endorsement or live production API access.
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 pb-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-govblue-50 border border-govblue-100 text-govblue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AICTE SIH 2026 Regulation Bureau Project</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
          One Academic Identity.<br />
          <span className="text-govblue-600">Every Enrolment Verified.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          APAAR ONE establishes a national-scale student enrolment management, duplicate detection, and academic verification ecosystem for AICTE-approved institutions—bridging the gap between aggregate intake reporting and continuous student-level truth.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => quickLaunch('INSTITUTION_ADMIN', '/institution/overview')}
            className="px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl text-sm shadow-subtle flex items-center gap-2 transition-all hover:gap-3"
          >
            <span>Launch Institution Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => quickLaunch('AICTE_REVIEWER', '/aicte/overview')}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-navy-900 font-semibold rounded-xl text-sm border border-slate-300 shadow-subtle flex items-center gap-2 transition-all"
          >
            <span>Open AICTE Intelligence Console</span>
            <Building2 className="w-4 h-4 text-govblue-600" />
          </button>

          <Link
            href="/how-it-works"
            className="px-5 py-3 text-slate-600 hover:text-navy-900 font-medium text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Architecture</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Core Highlights & Numbers */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-borderLine shadow-subtle">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Target Reach</p>
          <p className="text-2xl font-extrabold text-navy-900 mt-1">10,000+</p>
          <p className="text-[11px] text-slate-500 mt-1">AICTE Approved Institutes</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-borderLine shadow-subtle">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Identity Backbone</p>
          <p className="text-2xl font-extrabold text-govblue-600 mt-1">12-Digit</p>
          <p className="text-[11px] text-slate-500 mt-1">APAAR / ABC Academic ID</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-borderLine shadow-subtle">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Reconciliation</p>
          <p className="text-2xl font-extrabold text-govteal-600 mt-1">Cross-State</p>
          <p className="text-[11px] text-slate-500 mt-1">Duplicate & Transfer Tracking</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-borderLine shadow-subtle">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Seat Governance</p>
          <p className="text-2xl font-extrabold text-navy-900 mt-1">Policy-as-Code</p>
          <p className="text-[11px] text-slate-500 mt-1">AICTE APH 2024-27 Engine</p>
        </div>
      </section>

      {/* Interactive Workflow Visualizer */}
      <section className="bg-white border border-borderLine rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-govblue-600 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>End-to-End Governance Pipeline</span>
            </div>
            <h2 className="text-2xl font-bold text-navy-900">How APAAR ONE Solves the Reporting Gap</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Click each stage to inspect data inputs, automated checks, and regulatory outputs.
          </p>
        </div>

        {/* Step buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {workflowSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveWorkflowStep(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                activeWorkflowStep === idx
                  ? 'bg-navy-900 text-white border-navy-900 shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block mb-1 ${activeWorkflowStep === idx ? 'text-teal-400' : 'text-slate-400'}`}>
                STAGE {s.step}
              </span>
              <p className="text-xs font-bold leading-tight line-clamp-1">{s.title}</p>
              <p className={`text-[10px] mt-1 truncate ${activeWorkflowStep === idx ? 'text-slate-300' : 'text-slate-500'}`}>
                {s.actor}
              </p>
            </button>
          ))}
        </div>

        {/* Active Step Detail Card */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-govblue-600 text-white flex items-center justify-center font-bold text-sm">
                {workflowSteps[activeWorkflowStep].step}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{workflowSteps[activeWorkflowStep].title}</h3>
                <p className="text-xs text-slate-500">Primary Actor: <span className="font-semibold text-navy-900">{workflowSteps[activeWorkflowStep].actor}</span></p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {workflowSteps[activeWorkflowStep].desc}
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-govteal-600 flex-shrink-0 mt-0.5" />
              <span>{workflowSteps[activeWorkflowStep].detail}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-borderLine w-full md:w-80 shadow-subtle flex flex-col justify-between">
            <p className="text-xs font-bold text-navy-900 mb-2">Simulate this stage in Demo:</p>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => quickLaunch('INSTITUTION_OPERATOR', '/institution/uploads')}
                className="w-full text-left p-2 rounded bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-navy-900 font-medium border border-slate-200"
              >
                <span>Upload CSV Batch & Preview</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => quickLaunch('AICTE_REVIEWER', '/aicte/alerts')}
                className="w-full text-left p-2 rounded bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-navy-900 font-medium border border-slate-200"
              >
                <span>Review Duplicate Case (Kabir S.)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => quickLaunch('EXTERNAL_VERIFIER', '/verifier/scan')}
                className="w-full text-left p-2 rounded bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-navy-900 font-medium border border-slate-200"
              >
                <span>Test Opaque QR Verification</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stakeholder Portals Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Four Interconnected Portals</h2>
          <p className="text-sm text-slate-600 mt-1">
            Built on a single governed data layer with role-scoped access control (RBAC).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stakeholders.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white border border-borderLine rounded-2xl p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${s.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Role Scoped
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                    <p className="text-xs font-medium text-govblue-600">{s.role}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => quickLaunch(s.roleKey, s.href)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-navy-900 hover:text-white text-navy-900 font-semibold text-xs border border-slate-200 hover:border-navy-900 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{s.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Three Differentiators (PRD 19.1 / 19.8) */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 sm:p-10 shadow-elevated">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
            Product Innovation
          </span>
          <h2 className="text-3xl font-extrabold mt-1">Why APAAR ONE is Not Just a Database</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            The repository is the foundation; cross-institution reconciliation, dynamic policy-as-code, and explainable risk intelligence are the product value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-800/80 border border-navy-700 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">1. National Academic Identity Graph</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Decouples immutable student identity from time-bounded enrolment records. Tracks transfers, migrations, and concurrent enrolments using privacy-preserving HMAC matching without storing raw PII on external networks.
            </p>
          </div>

          <div className="bg-navy-800/80 border border-navy-700 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">2. Dynamic Policy-as-Code Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eliminates brittle hardcoded seat formulas. Evaluates admissions against versioned AICTE Approval Process Handbook (APH) rules across Regular, TFW (5%), NRI (15%), and Lateral Entry (10%) with transparent mathematical proofs.
            </p>
          </div>

          <div className="bg-navy-800/80 border border-navy-700 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">3. Explainable Risk Intelligence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Flagged conflicts provide deterministic evidence, matching reason codes, date overlaps, and human-in-the-loop resolution workflows—never black-box automated fraud accusations.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-borderLine text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-navy-900">APAAR ONE — SIH 2026 Solution Blueprint</p>
          <p className="text-[11px]">Designed for the AICTE Regulation Bureau • Reference Version 2.0</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-navy-900 transition-colors">About</Link>
          <Link href="/how-it-works" className="hover:text-navy-900 transition-colors">How It Works</Link>
          <Link href="/features" className="hover:text-navy-900 transition-colors">Platform Features</Link>
          <Link href="/security-privacy" className="hover:text-navy-900 transition-colors">Security & Privacy</Link>
          <Link href="/help" className="hover:text-navy-900 transition-colors">Help Centre</Link>
        </div>
      </footer>
    </div>
  );
}

