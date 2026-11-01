'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import {
  ArrowRight,
  Target,
  Star,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Building2,
  Users,
  Search,
  Sparkles,
  Sliders,
  Scale,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu,
  Copy,
  Check,
  Code2
} from 'lucide-react';

// Institutional and identity partners
const INSTITUTION_PARTNERS = [
  { name: 'IIT Delhi', icon: Hexagon },
  { name: 'BITS Pilani', icon: Triangle },
  { name: 'Anna University', icon: Command },
  { name: 'Delhi Tech Univ', icon: Cpu },
  { name: 'DigiLocker NAD', icon: Gem },
  { name: 'UIDAI Aadhaar', icon: Ghost },
  { name: 'AICTE Bureau', icon: ShieldCheck },
  { name: 'TCS Verification', icon: Target },
];

export default function HomePage() {
  const router = useRouter();
  const { switchUser } = useAuth();
  const [expanded, setExpanded] = useState(false);

  // Interactive Live APAAR Simulator State
  const [testApaar, setTestApaar] = useState('9823-4412-4819');
  const [simulatedResult, setSimulatedResult] = useState({
    name: 'Kabir Singhania',
    apaar: '9823-4412-4819',
    institution: 'Delhi Institute of Technology (DIT)',
    programme: 'B.Tech Computer Science & Engineering',
    status: 'ACTIVE_VERIFIED',
    quota: 'Regular Sanctioned Seat (APH Clause 4.2)',
    academicYear: '2026-27',
    riskLevel: 'LOW',
    token: 'TOK-VER-98234-A7'
  });
  const [copiedToken, setCopiedToken] = useState(false);

  // Interactive Seat Capacity Simulator State
  const [approvedIntake, setApprovedIntake] = useState(120);
  const [regularEnrolled, setRegularEnrolled] = useState(116);
  const [tfwEnrolled, setTfwEnrolled] = useState(6);
  const [leEnrolled, setLeEnrolled] = useState(12);

  // Workflow tab state
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(0);

  const sampleScenarios = [
    {
      label: 'Clean Admission (DIT)',
      apaar: '9823-4412-4819',
      data: {
        name: 'Kabir Singhania',
        apaar: '9823-4412-4819',
        institution: 'Delhi Institute of Technology (DIT)',
        programme: 'B.Tech Computer Science & Engineering',
        status: 'ACTIVE_VERIFIED',
        quota: 'Regular Sanctioned Seat (APH Clause 4.2)',
        academicYear: '2026-27',
        riskLevel: 'LOW',
        token: 'TOK-VER-98234-A7'
      }
    },
    {
      label: 'Concurrent Dual Enrolment',
      apaar: '9823-4412-8901',
      data: {
        name: 'Aarav Mehta',
        apaar: '9823-4412-8901',
        institution: 'Delhi Tech & Mumbai Poly (Concurrent)',
        programme: 'B.Tech Mechanical Engineering',
        status: 'DUPLICATE_FLAGGED',
        quota: 'Concurrent Admitted Seat (Review Required)',
        academicYear: '2026-27',
        riskLevel: 'HIGH_ADJUDICATION',
        token: 'TOK-VER-DUAL-89B2'
      }
    },
    {
      label: 'Supernumerary TFW (5%)',
      apaar: '9823-7721-3310',
      data: {
        name: 'Priya Sundaram',
        apaar: '9823-7721-3310',
        institution: 'Delhi Institute of Technology (DIT)',
        programme: 'B.Tech Information Technology',
        status: 'ACTIVE_VERIFIED',
        quota: 'Tuition Fee Waiver (APH Clause 4.2)',
        academicYear: '2026-27',
        riskLevel: 'LOW',
        token: 'TOK-VER-TFW-3310'
      }
    },
    {
      label: 'Registry Name Mismatch',
      apaar: '9823-5519-0012',
      data: {
        name: 'Rohan Sharma vs R. K. Sharma',
        apaar: '9823-5519-0012',
        institution: 'Pune Institute of Advanced Engineering',
        programme: 'B.Tech Electronics & Comm.',
        status: 'NAME_MISMATCH',
        quota: 'Regular Seat (Pending Registry Match)',
        academicYear: '2026-27',
        riskLevel: 'MEDIUM_RECONCILE',
        token: 'TOK-VER-MISMATCH-99'
      }
    },
    {
      label: 'Over-Capacity Intake Breach',
      apaar: '9823-9999-1234',
      data: {
        name: 'Unsanctioned Admission #121',
        apaar: '9823-9999-1234',
        institution: 'Delhi Institute of Technology (DIT)',
        programme: 'B.Tech Computer Science & Engineering',
        status: 'OVER_CAPACITY',
        quota: 'Excess Regular Seat (> 120 Approved)',
        academicYear: '2026-27',
        riskLevel: 'CRITICAL_SANCTION',
        token: 'TOK-VER-BREACH-403'
      }
    }
  ];

  const handleSelectScenario = (sc: typeof sampleScenarios[0]) => {
    setTestApaar(sc.apaar);
    setSimulatedResult(sc.data);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(simulatedResult.token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // Seat compliance calculations
  const maxTfw = Math.round(approvedIntake * 0.05);
  const maxLe = Math.round(approvedIntake * 0.10);
  const totalApprovedWithSupernumerary = approvedIntake + maxTfw + maxLe;
  const currentTotal = regularEnrolled + tfwEnrolled + leEnrolled;
  const isRegularExceeded = regularEnrolled > approvedIntake;
  const isTfwExceeded = tfwEnrolled > maxTfw;
  const isLeExceeded = leEnrolled > maxLe;
  const isOverCapacity = isRegularExceeded || isTfwExceeded || isLeExceeded;

  const lifecycleStages = [
    {
      title: '01. Batch Submission',
      actor: 'Institutions',
      codeSnippet: `POST /api/v1/enrolment-batches\n{\n  "institutionId": "DIT-DEL-01",\n  "academicYear": "2026-27",\n  "totalRecords": 180,\n  "checksum": "sha256:7f83b165..."\n}`,
      summary: 'Campus ERP webhooks or drag-and-drop CSV uploads ingest raw student lists into an immutable staging pipeline.'
    },
    {
      title: '02. APAAR Registry Lookup',
      actor: 'MoE Registry Adapter',
      codeSnippet: `POST /api/v1/validation/apaar-lookup\n{\n  "apaarId": "9823-4412-4819",\n  "candidateName": "Kabir Singhania",\n  "dob": "2004-05-14"\n}\n--> 200 OK: STATUS: "VERIFIED_EXACT_MATCH"`,
      summary: 'Validates 12-digit APAAR against the central registry adapter. Maps exact match, name variance, or invalid format.'
    },
    {
      title: '03. Cross-Institution Reconciler',
      actor: 'AICTE Rules Engine',
      codeSnippet: `SELECT student_id, COUNT(institution_id)\nFROM enrolments \nWHERE academic_year = '2026-27' AND status = 'ACTIVE'\nGROUP BY student_id HAVING COUNT > 1;`,
      summary: 'Deterministic cross-state scans isolate concurrent active admissions across 12,000+ AICTE institutions without false accusations.'
    },
    {
      title: '04. Policy-as-Code Intake Guard',
      actor: 'Regulation Bureau Evaluator',
      codeSnippet: `rule "SanctionedIntakeCap" {\n  when: regular_enrolled > approved_intake\n  then: emit_violation("APH Clause 4.2 Breach", severity="HIGH")\n}`,
      summary: 'Validates arithmetic limits separating regular sanctioned seats from 5% TFW and 10% Lateral Entry supernumeraries.'
    },
    {
      title: '05. Controlled Verification',
      actor: 'Students & Verifiers',
      codeSnippet: `GET /api/v1/verifications/TOK-VER-98234-A7\n{\n  "studentConsent": "GRANTED_BY_STUDENT",\n  "enrolmentStatus": "CONFIRMED",\n  "maskedApaar": "XXXX-XXXX-4819",\n  "signature": "ECDSA-P256-SHA256"\n}`,
      summary: 'Generates tamper-evident certificates with signed opaque QR tokens without ever exposing raw citizen PII.'
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="py-4 md:py-6 bg-white border-b border-gray-100">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5 rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                <img className="w-auto h-8" src="https://cdn.21st.dev/assets/mirror/73/7302b383d96fffb1e28617722caa6775f89acbf71ab6f1abf6e02404c73fe683.svg" alt="Brand logo" />
                <span className="text-xl font-extrabold tracking-tight text-gray-900">APAAR ONE</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  AICTE Bureau
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-900 p-2 focus:outline-none"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:ml-12 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-10">
              <Link href="/" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Overview
              </Link>
              <Link href="/how-it-works" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                How It Works
              </Link>
              <Link href="/features" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Features
              </Link>
              <Link href="/aicte/policies" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Policy Rules
              </Link>
              <Link href="/security-privacy" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Security & DPDP
              </Link>
              <Link href="/help" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Help
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-6">
              <Link href="/sign-in" className="text-base font-medium text-gray-900 hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Sign In
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-sm"
              >
                Access Platform
              </Link>
            </div>
          </div>

          {/* Mobile Drawer */}
          {expanded && (
            <nav className="mt-4 pt-4 pb-6 border-t border-gray-100">
              <div className="grid gap-y-3">
                <Link href="/" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Overview
                </Link>
                <Link href="/how-it-works" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  How It Works
                </Link>
                <Link href="/features" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Features
                </Link>
                <Link href="/aicte/policies" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Policy Rules
                </Link>
                <Link href="/security-privacy" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Security & DPDP
                </Link>
                <Link href="/help" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Help Desk
                </Link>
                <div className="h-px bg-gray-200 my-1" />
                <Link href="/sign-in" onClick={() => setExpanded(false)} className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl">
                  Sign In
                </Link>
                <Link
                  href="/sign-in"
                  onClick={() => setExpanded(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 text-center"
                >
                  Access Platform
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Kicker */}
            <h1 className="px-6 text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider">
              An AICTE & Ministry of Education Initiative • Regulation Bureau
            </h1>

            {/* Main Headline with Glowing Blur Gradient */}
            <p className="mt-5 text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              One Academic Identity. Every Enrolment{" "}
              <span className="relative inline-flex">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 absolute inset-0"></span>
                <span className="relative">Verified.</span>
              </span>
            </p>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A unified student enrolment management, APAAR registry reconciliation, and policy-as-code seat compliance platform for 12,000+ AICTE-approved institutions across India.
            </p>

            {/* CTA Buttons */}
            <div className="px-8 mt-9 sm:flex sm:justify-center sm:space-x-5 sm:px-0">
              <a
                href="#interactive-sandbox"
                className="inline-flex items-center justify-center w-full px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-gray-900 rounded-xl sm:w-auto hover:bg-gray-700 transition-all shadow-md"
              >
                Start Free Trial / Sandbox
              </a>

              <a
                href="#architecture-preview"
                className="inline-flex items-center justify-center w-full px-6 py-3.5 mt-4 text-base sm:text-lg font-bold text-gray-900 border-2 border-gray-400 rounded-xl sm:w-auto sm:mt-0 hover:bg-gray-900 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 18 18">
                  <path
                    d="M8.18 13.4261C6.86 14.39 5 13.45 5 11.81V5.44C5 3.8 6.86 2.86 8.18 3.82L12.54 7.01C13.63 7.81 13.63 9.44 12.54 10.24L8.18 13.43Z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Watch Preview
              </a>
            </div>

            {/* Helper Tagline */}
            <p className="mt-8 text-sm sm:text-base text-gray-500 font-medium">
              Try all features free for 60 days. No card required. • DPDP Act 2023 Compliant
            </p>
          </div>
        </div>

        {/* Dashboard Showcase Image with Overlapping Background */}
        <div className="pb-16 bg-white mt-12 sm:mt-16">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto px-4 sm:px-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <img
                    className="w-full transform scale-100 object-cover"
                    src="https://cdn.21st.dev/assets/mirror/1c/1ce273490b8181abe6ea7fca26791794f0f989c362405b6d4065a9f37ee2e6f0.png"
                    alt="Marketing Illustration"
                  />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">AICTE Central Repository Live Telemetry</div>
                        <div className="text-[11px] sm:text-xs text-gray-500">12,840+ Approved Institutions • 1.42M+ Active Verified Enrolments</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        99.4% Verified
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        APH 2024-27 Clause 4.2 Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT WORKSPACE CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* --- SECTION 2: LIVE INTERACTIVE APAAR VERIFICATION SANDBOX --- */}
        <section id="interactive-sandbox" className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 space-y-8 border border-gray-200 shadow-sm">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interactive Verification Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Instant Academic Reference Verification
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Select one of the pre-seeded PRD test cases to observe real-time cryptographic validation, quota classification, and tamper-evident token issuance.
            </p>
          </div>

          {/* Quick Scenario Selector Chips */}
          <div className="flex flex-wrap gap-2.5">
            {sampleScenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectScenario(sc)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  testApaar === sc.apaar
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:text-gray-950 hover:bg-gray-50'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Interactive Result Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
            
            {/* Left: Validation Details */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Candidate Name</span>
                  <div className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                    {simulatedResult.name}
                    {simulatedResult.status === 'ACTIVE_VERIFIED' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">APAAR ID</span>
                  <div className="text-sm font-mono text-gray-900 font-bold bg-white px-2.5 py-1 rounded-full border border-gray-200">
                    {simulatedResult.apaar}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Validation Status</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      simulatedResult.status === 'ACTIVE_VERIFIED' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : simulatedResult.status === 'OVER_CAPACITY'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {simulatedResult.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 font-medium">Institution:</span>
                  <p className="font-semibold text-gray-900 mt-0.5">{simulatedResult.institution}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Academic Programme:</span>
                  <p className="font-semibold text-gray-900 mt-0.5">{simulatedResult.programme}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">AICTE Regulatory Quota:</span>
                  <p className="font-semibold text-amber-800 mt-0.5">{simulatedResult.quota}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Risk Assessment:</span>
                  <p className="font-semibold text-gray-900 mt-0.5">{simulatedResult.riskLevel}</p>
                </div>
              </div>

              {/* Cryptographic Token */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4">
                <div className="truncate">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Opaque Verification Token:</span>
                  <div className="font-mono text-xs text-gray-700 truncate">{simulatedResult.token}</div>
                </div>

                <button
                  onClick={handleCopyToken}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-gray-100 text-xs font-semibold text-gray-900 border border-gray-200 flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-sm"
                >
                  {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
                </button>
              </div>
            </div>

            {/* Right: QR Token Scanner */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 mb-3">
                <QrCode className="w-24 h-24 text-gray-900" />
              </div>
              <span className="text-[11px] font-bold text-gray-900">Signed QR Reference</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Tamper-evident • Zero PII</span>
              <Link
                href={`/verifier/scan?token=${simulatedResult.token}`}
                className="mt-4 px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 text-xs font-semibold transition-all hover:scale-105 shadow-sm"
              >
                Inspect in Verifier Portal →
              </Link>
            </div>

          </div>
        </section>

        {/* --- SECTION 3: POLICY-AS-CODE SEAT CAPACITY SIMULATOR --- */}
        <section className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 space-y-8 border border-gray-200 shadow-sm">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Sanction Governance Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Policy-as-Code Seat Compliance Engine
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              AICTE Approval Process Handbook (APH 2024–27 Clause 4.2 & 4.4). Test live supernumerary quotas (5% TFW & 10% Lateral Entry) dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
              
              {/* Approved Intake Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>Approved Sanctioned Intake:</span>
                  <span className="font-mono text-sm font-bold text-blue-700">{approvedIntake} Seats</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="30"
                  value={approvedIntake}
                  onChange={(e) => setApprovedIntake(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Min: 30</span>
                  <span>Max: 300</span>
                </div>
              </div>

              {/* Regular Admitted Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>Regular Enrolled Students:</span>
                  <span className={`font-mono text-sm font-bold ${isRegularExceeded ? 'text-rose-600' : 'text-gray-900'}`}>
                    {regularEnrolled} / {approvedIntake}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="320"
                  value={regularEnrolled}
                  onChange={(e) => setRegularEnrolled(Number(e.target.value))}
                  className="w-full accent-gray-900 cursor-pointer"
                />
                {isRegularExceeded && (
                  <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Regular intake exceeded by {regularEnrolled - approvedIntake} seats!
                  </p>
                )}
              </div>

              {/* TFW Supernumerary Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>Tuition Fee Waiver (TFW 5% Supernumerary):</span>
                  <span className={`font-mono text-sm font-bold ${isTfwExceeded ? 'text-rose-600' : 'text-gray-900'}`}>
                    {tfwEnrolled} / {maxTfw} max
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={tfwEnrolled}
                  onChange={(e) => setTfwEnrolled(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Lateral Entry Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-900">
                  <span>Lateral Entry (10% Supernumerary):</span>
                  <span className={`font-mono text-sm font-bold ${isLeExceeded ? 'text-rose-600' : 'text-gray-900'}`}>
                    {leEnrolled} / {maxLe} max
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={leEnrolled}
                  onChange={(e) => setLeEnrolled(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Real-Time Policy Evaluation */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className={`p-6 rounded-2xl border transition-all ${
                isOverCapacity
                  ? 'bg-rose-50 border-rose-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {isOverCapacity ? (
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  )}
                  <div>
                    <h3 className={`font-bold text-sm ${isOverCapacity ? 'text-rose-900' : 'text-emerald-900'}`}>
                      {isOverCapacity ? 'NON-COMPLIANT: REGULATORY BREACH DETECTED' : 'SANCTION COMPLIANT: WITHIN PERMITTED LIMITS'}
                    </h3>
                    <p className={`text-xs ${isOverCapacity ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {isOverCapacity
                        ? 'Enrolment exceeds permissible caps under AICTE Approval Process Handbook (APH 2024-27 Clause 4.2).'
                        : 'All admissions strictly segregated into regular and supernumerary quotas.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-gray-200/50 text-center">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">Total Permitted</span>
                    <span className="text-base font-extrabold text-gray-900">{totalApprovedWithSupernumerary}</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">Total Enrolled</span>
                    <span className={`text-base font-extrabold ${isOverCapacity ? 'text-rose-600' : 'text-gray-900'}`}>
                      {currentTotal}
                    </span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">Regular Gap</span>
                    <span className="text-base font-extrabold text-gray-900">{approvedIntake - regularEnrolled}</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">Utilization</span>
                    <span className="text-base font-extrabold text-gray-900">
                      {Math.round((currentTotal / totalApprovedWithSupernumerary) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy-as-Code Rule Snippet */}
              <div className="p-5 rounded-2xl bg-gray-900 text-gray-100 font-mono text-xs space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 border-b border-gray-800">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    aph-clause-4.2-evaluator.rego
                  </span>
                  <span className="text-emerald-400">Policy-as-Code Active</span>
                </div>
                <pre className="text-[11px] text-gray-300 overflow-x-auto py-2 leading-relaxed">
{`package aicte.seat_compliance

default allow = false

allow {
    input.regular_enrolled <= input.approved_intake
    input.tfw_enrolled <= round(input.approved_intake * 0.05)
    input.lateral_entry <= round(input.approved_intake * 0.10)
}`}
                </pre>
              </div>

            </div>

          </div>
        </section>

        {/* --- SECTION 4: 5-STAGE REGULATORY LIFECYCLE & API INSPECTOR --- */}
        <section id="architecture-preview" className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 space-y-8 border border-gray-200 shadow-sm">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Lifecycle Traceability</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              5-Stage Regulatory Enrolment Lifecycle
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Inspect the exact machine-to-machine REST contracts and event pipeline executing from admission intake to zero-trust background check.
            </p>
          </div>

          {/* Lifecycle Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
            {lifecycleStages.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeWorkflowTab === idx
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {stage.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
                Primary Actor: {lifecycleStages[activeWorkflowTab].actor}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {lifecycleStages[activeWorkflowTab].title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {lifecycleStages[activeWorkflowTab].summary}
              </p>
              <div className="pt-2">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  View Complete PRD Architecture →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-gray-900 border border-gray-800 p-5 font-mono text-xs overflow-x-auto shadow-xl text-white">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-3 text-gray-400 text-[10px]">
                  <span>Telemetry Payload Contract</span>
                  <span className="text-emerald-400">JSON REST Schema</span>
                </div>
                <pre className="text-emerald-400 leading-relaxed">
                  {lifecycleStages[activeWorkflowTab].codeSnippet}
                </pre>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 5: 4 INTERCONNECTED PORTALS BENTO LAUNCHPAD --- */}
        <section className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 space-y-8 border border-gray-200 shadow-sm">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Unified System Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Four Interconnected Workspaces
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              All four portals share the same backend, database, DPDP security controls, and policy-as-code sanction engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Institution Workspace */}
            <div className="rounded-3xl bg-gray-50 p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 transition-all shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">Institutions</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Admissions workspace, batch CSV uploads, quota compliance, and validation issue reconciliation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/institution/overview"
                  onClick={() => switchUser('INSTITUTION_ADMIN')}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Launch Workspace
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: AICTE Bureau */}
            <div className="rounded-3xl bg-gray-50 p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 transition-all shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">AICTE Bureau</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  National enrolment intelligence, cross-state duplicate triage, policy-as-code authoring, and audit logs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/aicte/overview"
                  onClick={() => switchUser('AICTE_REVIEWER')}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Launch Console
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Student Portal */}
            <div className="rounded-3xl bg-gray-50 p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 transition-all shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">Student Portal</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Digital APAAR identity card, verified enrolment timeline, 1-click consent gate, and data sharing logs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/student/overview"
                  onClick={() => switchUser('STUDENT')}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Launch Portal
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: External Verifier */}
            <div className="rounded-3xl bg-gray-50 p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 transition-all shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">External Verifier</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Background verification engine, bulk student queries, and instant signed QR token scanner.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/verifier/overview"
                  onClick={() => switchUser('EXTERNAL_VERIFIER')}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  Launch Workspace
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 6: INSTITUTIONS MARQUEE --- */}
        <section className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-4 text-center">
            Connected Accredited Institutions & Identity Networks
          </div>

          <div 
            className="relative flex overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
          >
            <div className="animate-marquee flex gap-10 whitespace-nowrap px-2">
              {[...INSTITUTION_PARTNERS, ...INSTITUTION_PARTNERS, ...INSTITUTION_PARTNERS].map((inst, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all cursor-default font-semibold text-xs"
                >
                  <inst.icon className="h-4 w-4 text-amber-600" />
                  <span>{inst.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 7: FOOTER --- */}
        <footer className="pt-8 pb-4 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-gray-900 font-bold">All Systems Operational</span>
              <div className="w-px h-3 bg-gray-300 mx-1" />
              <span>AICTE Regulation Bureau • SIH Prototype</span>
            </div>

            <div className="flex items-center gap-5">
              <Link href="/about" className="hover:text-gray-900 transition-colors font-medium">About</Link>
              <Link href="/how-it-works" className="hover:text-gray-900 transition-colors font-medium">How It Works</Link>
              <Link href="/features" className="hover:text-gray-900 transition-colors font-medium">Features</Link>
              <Link href="/security-privacy" className="hover:text-gray-900 transition-colors font-medium">Security & DPDP</Link>
              <Link href="/help" className="hover:text-gray-900 transition-colors font-medium">Help Centre</Link>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
