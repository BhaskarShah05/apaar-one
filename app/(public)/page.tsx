'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  QrCode,
  Building2,
  Layers,
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
  RefreshCw,
  Copy,
  ExternalLink,
  Shield,
  Check,
  Code2
} from 'lucide-react';

// Brand Partners for Once UI Marquee
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

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-extrabold text-zinc-900 sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold sm:text-xs">{label}</span>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const { switchUser } = useAuth();

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
      label: 'Over-Capacity (MNCE Pune)',
      apaar: '8192-3049-7102',
      data: {
        name: 'Rohan Deshmukh',
        apaar: '8192-3049-7102',
        institution: 'Maharashtra National College of Eng (MNCE)',
        programme: 'B.Tech Mechanical Engineering',
        status: 'OVER_CAPACITY',
        quota: 'Exceeded Approved Intake (134/120)',
        academicYear: '2026-27',
        riskLevel: 'HIGH_NON_COMPLIANT',
        token: 'TOK-REV-81920-F3'
      }
    },
    {
      label: 'TC Transfer Hand-off',
      apaar: '7102-9934-1182',
      data: {
        name: 'Sneha Patel',
        apaar: '7102-9934-1182',
        institution: 'BITS Bengaluru (Transferred from DIT)',
        programme: 'B.Tech Electronics & Comm',
        status: 'LEGITIMATE_TRANSFER',
        quota: 'Transfer with Valid TC & AICTE Hand-off',
        academicYear: '2026-27',
        riskLevel: 'RESOLVED',
        token: 'TOK-TRF-71029-C2'
      }
    }
  ];

  // Mathematical Seat Calculations
  const maxTfw = Math.floor(approvedIntake * 0.05);
  const maxLe = Math.floor(approvedIntake * 0.10);
  const totalCapacityPermitted = approvedIntake + maxTfw + maxLe;
  const totalStudentsEnrolled = regularEnrolled + tfwEnrolled + leEnrolled;
  const isRegularExceeded = regularEnrolled > approvedIntake;
  const isTfwExceeded = tfwEnrolled > maxTfw;
  const isLeExceeded = leEnrolled > maxLe;
  const isOverallViolated = isRegularExceeded || isTfwExceeded || isLeExceeded;

  const handleSelectScenario = (sc: typeof sampleScenarios[0]) => {
    setTestApaar(sc.apaar);
    setSimulatedResult(sc.data);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(simulatedResult.token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const workflowSteps = [
    {
      title: '01. Batch Submission',
      actor: 'Institution Workspace',
      codeSnippet: `POST /api/v1/enrolment-batches\n{\n  "institutionId": "inst-001",\n  "academicYear": "2026-27",\n  "fileFormat": "CSV",\n  "rows": 450,\n  "headersAutoMapped": true\n}`,
      summary: 'Colleges upload student admissions via CSV or campus ERP webhook with instant column-mapping syntax validation.'
    },
    {
      title: '02. APAAR Registry Sync',
      actor: 'MoE Identity Gateway',
      codeSnippet: `POST /api/v1/validation/apaar\n{\n  "apaarId": "9823-4412-4819",\n  "digiLockerMatch": "100%",\n  "registryStatus": "ACTIVE_VERIFIED",\n  "provenanceHash": "sha256:7f83b165..."\n}`,
      summary: 'Validates 12-digit APAAR against national registry, distinguishing format validity from authoritative registry state.'
    },
    {
      title: '03. Duplicate Reconciler',
      actor: 'AICTE Central Registry',
      codeSnippet: `GET /api/v1/cases/detect-overlap\n{\n  "detectedCollisions": 1,\n  "primaryInst": "DIT Delhi (B.Tech CSE)",\n  "secondaryInst": "MNCE Pune (B.Tech Mech)",\n  "adjudicationAction": "FLAG_DUAL_STATE_OVERLAP"\n}`,
      summary: 'Flags concurrent active enrolments as neutral review cases with date-overlap proofs rather than punitive accusations.'
    },
    {
      title: '04. Policy-as-Code Engine',
      actor: 'Regulation Bureau Engine',
      codeSnippet: `EVALUATE APH_2024_CLAUSE_4_2:\n  Approved_Intake = 120\n  Regular_Enrolled = 116 (<= 120, PASS)\n  TFW_Quota_5pct = 6 (<= 6, PASS)\n  Lateral_Entry_10pct = 12 (<= 12, PASS)\nRESULT: COMPLIANT_WITHIN_SANCTION`,
      summary: 'Executes mathematical verification of approved seats vs 5% TFW and 10% Lateral Entry supernumeraries.'
    },
    {
      title: '05. Controlled Verification',
      actor: 'Students & Verifiers',
      codeSnippet: `GET /api/v1/verifications/TOK-VER-98234-A7\n{\n  "studentConsent": "GRANTED_BY_STUDENT",\n  "enrolmentStatus": "CONFIRMED",\n  "maskedApaar": "XXXX-XXXX-4819",\n  "signature": "ECDSA-P256-SHA256"\n}`,
      summary: 'Generates tamper-evident certificates with signed opaque QR tokens without ever exposing raw citizen PII.'
    }
  ];

  return (
    <div className="w-full space-y-16 py-6 font-sans text-zinc-900">
      
      {/* --- HERO SECTION (ONCE UI WHITE THEME) --- */}
      <section className="relative overflow-hidden rounded-3xl once-card p-8 sm:p-14 lg:p-16 border border-zinc-200/90 shadow-sm">
        
        {/* Subtle Atmospheric Glow Orbs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Once UI Featured Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 once-dock text-xs font-medium text-zinc-700">
              <span className="font-bold text-zinc-950">AICTE Bureau</span>
              <div className="w-px h-3.5 bg-zinc-300" />
              <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-current text-amber-500" />
                One Academic Identity
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]">
              One Academic Identity.<br />
              <span className="bg-gradient-to-r from-zinc-950 via-zinc-800 to-amber-700 bg-clip-text text-transparent">
                Every Enrolment Verified.
              </span>
            </h1>

            {/* Subline */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Unified student enrolment management, APAAR registry reconciliation, and policy-as-code seat compliance for AICTE-approved institutions across India.
            </p>

            {/* Action Buttons in Once UI style */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#interactive-sandbox"
                className="px-7 py-3.5 rounded-full bg-zinc-950 text-white font-semibold text-xs sm:text-sm hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
              >
                Launch Verification Sandbox
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/sign-in"
                className="px-7 py-3.5 rounded-full once-dock text-zinc-800 font-semibold text-xs sm:text-sm hover:border-zinc-400 transition-all flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current text-amber-600" />
                Explore 7 Personas
              </Link>
            </div>
          </div>

          {/* Right Column: Bento Stats & Marquee */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Stats Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <Target className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-zinc-950">12,840+</div>
                    <div className="text-xs text-zinc-500 font-medium">Approved Institutions</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE TELEMETRY
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">National Verification Rate</span>
                  <span className="text-zinc-950 font-bold">99.4%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/60">
                  <div className="h-full w-[99.4%] rounded-full bg-gradient-to-r from-blue-600 to-amber-500" />
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-zinc-100">
                <StatItem value="1.42M+" label="Students" />
                <div className="w-px h-full bg-zinc-200 mx-auto" />
                <StatItem value="0.02%" label="Duplicates" />
                <div className="w-px h-full bg-zinc-200 mx-auto" />
                <StatItem value="100%" label="Audited" />
              </div>
            </div>

            {/* Marquee Card */}
            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-sm overflow-hidden">
              <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-3">
                Connected Accredited Institutions & Identity Networks
              </div>

              <div 
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-8 whitespace-nowrap px-2">
                  {[...INSTITUTION_PARTNERS, ...INSTITUTION_PARTNERS, ...INSTITUTION_PARTNERS].map((inst, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-zinc-700 transition-all hover:text-zinc-950 hover:scale-105 cursor-default font-semibold text-xs"
                    >
                      <inst.icon className="h-4 w-4 text-amber-600" />
                      <span>{inst.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 2: LIVE INTERACTIVE APAAR VERIFICATION SANDBOX --- */}
      <section id="interactive-sandbox" className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8 border border-zinc-200/90 shadow-sm">
        
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Verification Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            Instant Academic Reference Verification
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
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
                  ? 'bg-zinc-950 text-white shadow-md scale-105'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Interactive Result Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50/80 border border-zinc-200/90 rounded-2xl p-6 sm:p-8">
          
          {/* Left: Validation Details */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Candidate Name</span>
                <div className="text-xl font-extrabold text-zinc-950 flex items-center gap-2">
                  {simulatedResult.name}
                  {simulatedResult.status === 'ACTIVE_VERIFIED' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">APAAR ID</span>
                <div className="text-sm font-mono text-zinc-900 font-bold bg-white px-2.5 py-1 rounded-full border border-zinc-200">
                  {simulatedResult.apaar}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Validation Status</span>
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
                <span className="text-zinc-500 font-medium">Institution:</span>
                <p className="font-semibold text-zinc-900 mt-0.5">{simulatedResult.institution}</p>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">Academic Programme:</span>
                <p className="font-semibold text-zinc-900 mt-0.5">{simulatedResult.programme}</p>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">AICTE Regulatory Quota:</span>
                <p className="font-semibold text-amber-800 mt-0.5">{simulatedResult.quota}</p>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">Risk Assessment:</span>
                <p className="font-semibold text-zinc-900 mt-0.5">{simulatedResult.riskLevel}</p>
              </div>
            </div>

            {/* Cryptographic Token */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
              <div className="truncate">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Opaque Verification Token:</span>
                <div className="font-mono text-xs text-zinc-700 truncate">{simulatedResult.token}</div>
              </div>

              <button
                onClick={handleCopyToken}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-100 text-xs font-semibold text-zinc-900 border border-zinc-200 flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-sm"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
              </button>
            </div>
          </div>

          {/* Right: QR Token Scanner */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-zinc-200 text-center shadow-sm">
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 mb-3">
              <QrCode className="w-24 h-24 text-zinc-950" />
            </div>
            <span className="text-[11px] font-bold text-zinc-900">Signed QR Reference</span>
            <span className="text-[10px] text-zinc-500 mt-0.5">Tamper-evident • Zero PII</span>
            <Link
              href={`/verifier/scan?token=${simulatedResult.token}`}
              className="mt-4 px-4 py-1.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-semibold transition-all hover:scale-105 shadow-sm"
            >
              Inspect in Verifier Portal →
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: POLICY-AS-CODE SEAT CAPACITY SIMULATOR --- */}
      <section className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8 border border-zinc-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-bold text-zinc-800 mb-3">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Rule-as-Code Engine (APH 2024-27)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                Live Seat Capacity & Supernumerary Simulator
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm mt-1">
                Drag the sliders to see how AICTE Clause 4.2 dynamically verifies regular intake separately from 5% TFW and 10% Lateral Entry supernumerary quotas.
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-zinc-600">Approved Regular Intake:</span>
                  <span className="text-zinc-950 font-extrabold">{approvedIntake} seats</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="240"
                  step="30"
                  value={approvedIntake}
                  onChange={(e) => setApprovedIntake(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-zinc-600">Actual Regular Enrolment:</span>
                  <span className={`font-extrabold ${isRegularExceeded ? 'text-rose-600' : 'text-zinc-950'}`}>
                    {regularEnrolled} seats {isRegularExceeded && '(BREACH)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={approvedIntake + 30}
                  value={regularEnrolled}
                  onChange={(e) => setRegularEnrolled(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-zinc-600">5% TFW Quota:</span>
                    <span className={isTfwExceeded ? 'text-rose-600' : 'text-emerald-700'}>
                      {tfwEnrolled} / {maxTfw}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxTfw + 5}
                    value={tfwEnrolled}
                    onChange={(e) => setTfwEnrolled(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-zinc-600">10% Lateral Entry:</span>
                    <span className={isLeExceeded ? 'text-rose-600' : 'text-purple-700'}>
                      {leEnrolled} / {maxLe}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxLe + 8}
                    value={leEnrolled}
                    onChange={(e) => setLeEnrolled(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Card */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Mathematical Verification Ledger
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                isOverallViolated 
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {isOverallViolated ? 'REGULATORY NON-COMPLIANCE' : 'COMPLIANT WITH APH 2024'}
              </span>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 font-medium">Regular Sanction Utilization:</span>
                <span className="font-mono font-bold text-zinc-950">
                  {regularEnrolled} / {approvedIntake} ({( (regularEnrolled / approvedIntake) * 100 ).toFixed(1)}%)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 font-medium">Total Sanction + Supernumerary Cap:</span>
                <span className="font-mono font-bold text-zinc-950">
                  {totalStudentsEnrolled} / {totalCapacityPermitted} seats
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${isOverallViolated ? 'bg-rose-600' : 'bg-gradient-to-r from-emerald-500 to-amber-500'}`}
                  style={{ width: `${Math.min(100, (totalStudentsEnrolled / totalCapacityPermitted) * 100)}%` }}
                />
              </div>

              {/* Dynamic Warning Notice */}
              {isOverallViolated ? (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <span className="font-bold block">Regulatory Breach Detected</span>
                    <span>Institutions exceeding sanctioned intake cannot absorb extra students into supernumerary quotas.</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-bold block">Arithmetic Proof Validated</span>
                    <span>All enrolments cleanly segregated under AICTE Approval Process Handbook Clauses 4.2 & 4.4.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex justify-end">
              <Link
                href="/institution/intake"
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 transition-colors"
              >
                Inspect Institution Seat Matrix →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: 5-STAGE WORKFLOW ENGINE (INTERACTIVE INSPECTOR) --- */}
      <section className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8 border border-zinc-200/90 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-bold text-zinc-700">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            Continuous Verification Lifecycle
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            How APAAR ONE Works
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            Click through the five stages of the regulatory pipeline to inspect real live system payloads.
          </p>
        </div>

        {/* Workflow Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {workflowSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflowTab(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeWorkflowTab === idx
                  ? 'bg-zinc-950 text-white shadow-md scale-105'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        {/* Workflow Active Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700">
              System Actor: {workflowSteps[activeWorkflowTab].actor}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950">
              {workflowSteps[activeWorkflowTab].title}
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
              {workflowSteps[activeWorkflowTab].summary}
            </p>

            <div className="pt-2">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors"
              >
                Read Architectural Specification
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 font-mono text-xs overflow-x-auto shadow-xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 text-zinc-500 text-[10px]">
                <span>PAYLOAD INSPECTOR • REST API v1</span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <pre className="text-zinc-300 leading-relaxed font-mono">
                {workflowSteps[activeWorkflowTab].codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: 4 INTERCONNECTED PORTALS LAUNCHPAD --- */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            Unified Multi-Stakeholder Ecosystem
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            One platform sharing the same database, policy engine, and design system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Institution */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between border border-zinc-200/90 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-4">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-950">Institutions</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Admissions workspace, batch CSV uploads, quota compliance, and validation issue reconciliation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <Link
                href="/institution/overview"
                onClick={() => switchUser('INSTITUTION_ADMIN')}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Launch Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: AICTE Bureau */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between border border-zinc-200/90 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-4">
                <Scale className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-950">AICTE Bureau</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                National enrolment intelligence, cross-state duplicate triage, policy-as-code authoring, and audit logs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <Link
                href="/aicte/overview"
                onClick={() => switchUser('AICTE_REVIEWER')}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Launch Console
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Student Portal */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between border border-zinc-200/90 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-4">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-950">Student Portal</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Digital APAAR identity card, verified enrolment timeline, 1-click consent gate, and data sharing logs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <Link
                href="/student/overview"
                onClick={() => switchUser('STUDENT')}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Launch Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: External Verifier */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between border border-zinc-200/90 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-4">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base font-extrabold text-zinc-950">External Verifier</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                Background verification engine, bulk student queries, and instant signed QR token scanner.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <Link
                href="/verifier/overview"
                onClick={() => switchUser('EXTERNAL_VERIFIER')}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Launch Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER IN ONCE UI LIGHT STYLE --- */}
      <footer className="pt-12 pb-6 border-t border-zinc-200 text-xs text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-900 font-bold">All Systems Operational</span>
            <div className="w-px h-3 bg-zinc-300 mx-1" />
            <span>AICTE Regulation Bureau • SIH Prototype</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-zinc-950 transition-colors font-medium">About</Link>
            <Link href="/how-it-works" className="hover:text-zinc-950 transition-colors font-medium">How It Works</Link>
            <Link href="/features" className="hover:text-zinc-950 transition-colors font-medium">Features</Link>
            <Link href="/security-privacy" className="hover:text-zinc-950 transition-colors font-medium">Security & DPDP</Link>
            <Link href="/help" className="hover:text-zinc-950 transition-colors font-medium">Help Centre</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
