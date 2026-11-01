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
  Code2,
  Fingerprint
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
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
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
    <div className="w-full space-y-16 py-6 font-sans">
      
      {/* --- HERO SECTION (ONCE UI MAGIC PORTFOLIO STYLE) --- */}
      <section className="relative overflow-hidden rounded-3xl once-card p-8 sm:p-14 lg:p-16">
        
        {/* Atmospheric Ambient Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Once UI Typography & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Once UI Featured Pill Badge with Hairline Divider */}
            <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 once-dock text-xs font-medium text-zinc-300">
              <span className="font-semibold text-white">AICTE Bureau</span>
              <div className="w-px h-3.5 bg-white/20" />
              <span className="text-[#ffcd75] flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-current" />
                One Academic Identity
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              One Academic Identity.<br />
              <span className="bg-gradient-to-r from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                Every Enrolment Verified.
              </span>
            </h1>

            {/* Subline */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
              Unified student enrolment management, APAAR registry reconciliation, and policy-as-code seat compliance for AICTE-approved institutions across India.
            </p>

            {/* Action Buttons in Once UI style */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#interactive-sandbox"
                className="px-7 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl"
              >
                Launch Verification Sandbox
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/sign-in"
                className="px-7 py-3.5 rounded-full once-dock text-white font-medium text-xs sm:text-sm hover:border-white/25 transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#ffcd75]" />
                Explore 7 Personas
              </Link>
            </div>
          </div>

          {/* Right Column: Once UI Bento Stats & Marquee */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Stats Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Target className="w-5 h-5 text-[#ffcd75]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">12,840+</div>
                    <div className="text-xs text-zinc-400">Approved Institutions</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TELEMETRY
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">National Verification Rate</span>
                  <span className="text-white font-medium">99.4%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full w-[99.4%] rounded-full bg-gradient-to-r from-cyan-400 to-[#ffcd75]" />
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10">
                <StatItem value="1.42M+" label="Students" />
                <div className="w-px h-full bg-white/10 mx-auto" />
                <StatItem value="0.02%" label="Duplicates" />
                <div className="w-px h-full bg-white/10 mx-auto" />
                <StatItem value="100%" label="Audited" />
              </div>
            </div>

            {/* Marquee Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden backdrop-blur-xl">
              <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider mb-3">
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
                      className="flex items-center gap-2 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                    >
                      <inst.icon className="h-4 w-4 text-[#ffcd75]" />
                      <span className="text-xs font-semibold text-white tracking-tight">
                        {inst.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 2: LIVE INTERACTIVE APAAR VERIFICATION SANDBOX --- */}
      <section id="interactive-sandbox" className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8">
        
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-[#ffcd75]" />
            <span>Interactive Verification Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Instant Academic Reference Verification
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Select one of the pre-seeded PRD test cases to observe real-time cryptographic validation, quota classification, and tamper-evident token issuance.
          </p>
        </div>

        {/* Quick Scenario Selector Chips */}
        <div className="flex flex-wrap gap-2.5">
          {sampleScenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectScenario(sc)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                testApaar === sc.apaar
                  ? 'bg-white text-zinc-950 font-semibold shadow-md scale-105'
                  : 'once-dock text-zinc-300 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Interactive Result Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          
          {/* Left: Validation Details */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Candidate Name</span>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  {simulatedResult.name}
                  {simulatedResult.status === 'ACTIVE_VERIFIED' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">APAAR ID</span>
                <div className="text-sm font-mono text-[#ffcd75] font-semibold">
                  {simulatedResult.apaar}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Validation Status</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    simulatedResult.status === 'ACTIVE_VERIFIED' 
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : simulatedResult.status === 'OVER_CAPACITY'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
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
                <span className="text-zinc-500">Institution:</span>
                <p className="font-medium text-zinc-200 mt-0.5">{simulatedResult.institution}</p>
              </div>
              <div>
                <span className="text-zinc-500">Academic Programme:</span>
                <p className="font-medium text-zinc-200 mt-0.5">{simulatedResult.programme}</p>
              </div>
              <div>
                <span className="text-zinc-500">AICTE Regulatory Quota:</span>
                <p className="font-medium text-amber-300 mt-0.5">{simulatedResult.quota}</p>
              </div>
              <div>
                <span className="text-zinc-500">Risk Assessment:</span>
                <p className="font-medium text-zinc-200 mt-0.5">{simulatedResult.riskLevel}</p>
              </div>
            </div>

            {/* Cryptographic Token */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="truncate">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Opaque Verification Token:</span>
                <div className="font-mono text-xs text-zinc-400 truncate">{simulatedResult.token}</div>
              </div>

              <button
                onClick={handleCopyToken}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
              </button>
            </div>
          </div>

          {/* Right: QR Token Scanner */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="p-3 bg-white rounded-2xl shadow-xl mb-3">
              <QrCode className="w-24 h-24 text-zinc-950" />
            </div>
            <span className="text-[11px] font-semibold text-white">Signed QR Reference</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Tamper-evident • Zero PII</span>
            <Link
              href={`/verifier/scan?token=${simulatedResult.token}`}
              className="mt-4 px-4 py-1.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-all hover:scale-105"
            >
              Inspect in Verifier Portal →
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: POLICY-AS-CODE SEAT CAPACITY SIMULATOR --- */}
      <section className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-semibold text-zinc-300 mb-3">
                <Scale className="w-3.5 h-3.5 text-[#ffcd75]" />
                Rule-as-Code Engine (APH 2024-27)
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Live Seat Capacity & Supernumerary Simulator
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Drag the sliders to see how AICTE Clause 4.2 dynamically verifies regular intake separately from 5% TFW and 10% Lateral Entry supernumerary quotas.
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-400">Approved Regular Intake:</span>
                  <span className="text-white font-bold">{approvedIntake} seats</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="240"
                  step="30"
                  value={approvedIntake}
                  onChange={(e) => setApprovedIntake(Number(e.target.value))}
                  className="w-full accent-[#ffcd75] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-400">Actual Regular Enrolment:</span>
                  <span className={`font-bold ${isRegularExceeded ? 'text-rose-400' : 'text-white'}`}>
                    {regularEnrolled} seats {isRegularExceeded && '(BREACH)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={approvedIntake + 30}
                  value={regularEnrolled}
                  onChange={(e) => setRegularEnrolled(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-zinc-400">5% TFW Quota:</span>
                    <span className={`font-semibold ${isTfwExceeded ? 'text-rose-400' : 'text-emerald-300'}`}>
                      {tfwEnrolled} / {maxTfw}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxTfw + 5}
                    value={tfwEnrolled}
                    onChange={(e) => setTfwEnrolled(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-zinc-400">10% Lateral Entry:</span>
                    <span className={`font-semibold ${isLeExceeded ? 'text-rose-400' : 'text-purple-300'}`}>
                      {leEnrolled} / {maxLe}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxLe + 8}
                    value={leEnrolled}
                    onChange={(e) => setLeEnrolled(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Card */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Mathematical Verification Ledger
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                isOverallViolated 
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {isOverallViolated ? 'REGULATORY NON-COMPLIANCE' : 'COMPLIANT WITH APH 2024'}
              </span>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Regular Sanction Utilization:</span>
                <span className="font-mono font-bold text-white">
                  {regularEnrolled} / {approvedIntake} ({( (regularEnrolled / approvedIntake) * 100 ).toFixed(1)}%)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Total Sanction + Supernumerary Cap:</span>
                <span className="font-mono font-bold text-white">
                  {totalStudentsEnrolled} / {totalCapacityPermitted} seats
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${isOverallViolated ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-[#ffcd75]'}`}
                  style={{ width: `${Math.min(100, (totalStudentsEnrolled / totalCapacityPermitted) * 100)}%` }}
                />
              </div>

              {/* Dynamic Warning Notice */}
              {isOverallViolated ? (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Regulatory Breach Detected</span>
                    <span>Institutions exceeding sanctioned intake cannot absorb extra students into supernumerary quotas.</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Arithmetic Proof Validated</span>
                    <span>All enrolments cleanly segregated under AICTE Approval Process Handbook Clauses 4.2 & 4.4.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Link
                href="/institution/intake"
                className="text-xs text-[#ffcd75] hover:text-white font-medium flex items-center gap-1 transition-colors"
              >
                Inspect Institution Seat Matrix →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: 5-STAGE WORKFLOW ENGINE (INTERACTIVE INSPECTOR) --- */}
      <section className="rounded-3xl once-card p-6 sm:p-10 lg:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 once-dock text-xs font-semibold text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-[#ffcd75]" />
            Continuous Verification Lifecycle
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How APAAR ONE Works
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Click through the five stages of the regulatory pipeline to inspect real live system payloads.
          </p>
        </div>

        {/* Workflow Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {workflowSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflowTab(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeWorkflowTab === idx
                  ? 'bg-white text-zinc-950 shadow-xl scale-105'
                  : 'once-dock text-zinc-400 hover:text-white'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        {/* Workflow Active Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              System Actor: {workflowSteps[activeWorkflowTab].actor}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {workflowSteps[activeWorkflowTab].title}
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {workflowSteps[activeWorkflowTab].summary}
            </p>

            <div className="pt-2">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#ffcd75] transition-colors"
              >
                Read Architectural Specification
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-950 border border-white/10 p-5 font-mono text-xs overflow-x-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-zinc-500 text-[10px]">
                <span>PAYLOAD INSPECTOR • REST API v1</span>
                <span className="text-emerald-400">200 OK</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Unified Multi-Stakeholder Ecosystem
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            One platform sharing the same database, policy engine, and design system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Institution */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Building2 className="w-5 h-5 text-[#ffcd75]" />
              </div>
              <h3 className="text-base font-bold text-white">Institutions</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Admissions workspace, batch CSV uploads, quota compliance, and validation issue reconciliation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/institution/overview"
                onClick={() => switchUser('INSTITUTION_ADMIN')}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                Launch Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: AICTE Bureau */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Scale className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">AICTE Bureau</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                National enrolment intelligence, cross-state duplicate triage, policy-as-code authoring, and audit logs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/aicte/overview"
                onClick={() => switchUser('AICTE_REVIEWER')}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                Launch Console
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Student Portal */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Student Portal</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Digital APAAR identity card, verified enrolment timeline, 1-click consent gate, and data sharing logs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/student/overview"
                onClick={() => switchUser('STUDENT')}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                Launch Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: External Verifier */}
          <div className="rounded-3xl once-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                <Search className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white">External Verifier</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Background verification engine, bulk student queries, and instant signed QR token scanner.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/verifier/overview"
                onClick={() => switchUser('EXTERNAL_VERIFIER')}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                Launch Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER IN ONCE UI STYLE --- */}
      <footer className="pt-12 pb-6 border-t border-white/10 text-xs text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-semibold">All Systems Operational</span>
            <div className="w-px h-3 bg-white/20 mx-1" />
            <span>AICTE Regulation Bureau • SIH Prototype</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/security-privacy" className="hover:text-white transition-colors">Security & DPDP</Link>
            <Link href="/help" className="hover:text-white transition-colors">Help Centre</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
