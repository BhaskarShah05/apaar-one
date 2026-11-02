'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Sliders,
  Scale,
  Copy,
  Check,
  Lock,
  Layers,
  GraduationCap
} from 'lucide-react';

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

  // Policy-as-Code calculations
  const maxTfw = Math.round(approvedIntake * 0.05);
  const maxLe = Math.round(approvedIntake * 0.10);
  const totalApprovedWithSupernumerary = approvedIntake + maxTfw + maxLe;
  const currentTotal = regularEnrolled + tfwEnrolled + leEnrolled;
  const isRegularExceeded = regularEnrolled > approvedIntake;
  const isTfwExceeded = tfwEnrolled > maxTfw;
  const isLeExceeded = leEnrolled > maxLe;
  const isOverCapacity = isRegularExceeded || isTfwExceeded || isLeExceeded;

  return (
    <div className="w-full space-y-24 py-8 font-sans text-zinc-900">
      
      {/* --- HERO SECTION (EXACT ONCE UI MAGIC PORTFOLIO DESIGN) --- */}
      <section className="pt-8 pb-12 text-center space-y-6 max-w-4xl mx-auto px-4">
        
        {/* Once UI Dual Pill Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] text-xs font-medium">
            <span className="font-semibold">AICTE Bureau</span>
            <span className="text-[#7dd3fc]">|</span>
            <span>Academic Identity Ecosystem</span>
          </div>
        </div>

        {/* Display Heading - Clean Solid Black Typography (No AI Gradients) */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-zinc-950 leading-[1.08]">
          One academic identity.<br />
          Every enrolment verified.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed">
          A unified student enrolment intelligence and academic verification ecosystem for 12,000+ AICTE-approved institutions across India.
        </p>

        {/* Hero Action Pill (Exact Once UI Pill with circular emblem) */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-zinc-200/90 shadow-sm hover:border-zinc-300 hover:shadow transition-all text-xs sm:text-sm font-medium text-zinc-900 group"
          >
            <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
              अ
            </div>
            <span>Access Platform — AICTE & Institutions</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </section>

      {/* --- FOUR STAKEHOLDER PORTALS BENTO --- */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Four Interconnected Workspaces
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            A single unified data backbone connecting regulators, colleges, students, and employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card 1: Institution Workspace */}
          <div className="once-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                  Colleges & Universities
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950">Institution Administration</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Direct CSV batch uploads, automated column mapping, APAAR registry sync, and duplicate admission resolution before final statutory returns.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100">
              <button
                onClick={() => {
                  switchUser('INSTITUTION_ADMIN');
                  router.push('/institution/overview');
                }}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Enter Institution Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: AICTE Regulation Bureau */}
          <div className="once-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                  Central Bureau
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950">AICTE Intelligence Console</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                National enrolment telemetry, cross-state duplicate adjudication, APH 2024-27 seat capacity policy guard, and cryptographic audit log.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100">
              <button
                onClick={() => {
                  switchUser('AICTE_ADMIN');
                  router.push('/aicte/overview');
                }}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Enter AICTE Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Student Portal */}
          <div className="once-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                  Citizen Student
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950">Student Citizen Portal</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Digital masked APAAR card (XXXX-XXXX-4819), consent governance for third-party background checks, and self-service demographic verification.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100">
              <button
                onClick={() => {
                  switchUser('STUDENT');
                  router.push('/student/overview');
                }}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Enter Student Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: External Verifier Portal */}
          <div className="once-card p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                  Employers & Background Checks
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-950">External Verifier Portal</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Single and bulk candidate enrolment verification, camera and token QR scanner, and tamper-evident PDF certificates without raw citizen PII.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100">
              <button
                onClick={() => {
                  switchUser('EXTERNAL_VERIFIER');
                  router.push('/verifier/overview');
                }}
                className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Enter Verifier Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- LIVE INTERACTIVE APAAR VERIFICATION SANDBOX --- */}
      <section id="interactive-sandbox" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Interactive APAAR Verification Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Test real-world enrolment scenarios across AICTE institutions with zero mock latency.
          </p>
        </div>

        {/* Quick Scenario Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sampleScenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                testApaar === sc.apaar
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Sandbox Output Bento Card */}
        <div className="once-card p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Input controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  12-Digit APAAR Identifier
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={testApaar}
                    onChange={(e) => setTestApaar(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-950"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono text-zinc-400">
                    DIGILOCKER SYNC
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Candidate Name:</span>
                  <span className="font-semibold text-zinc-900">{simulatedResult.name}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Institution:</span>
                  <span className="font-semibold text-zinc-900 truncate max-w-[200px]">
                    {simulatedResult.institution}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Programme:</span>
                  <span className="font-semibold text-zinc-900 truncate max-w-[200px]">
                    {simulatedResult.programme}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Admitted Quota:</span>
                  <span className="font-semibold text-zinc-900">
                    {simulatedResult.quota}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Verification Status Card */}
            <div className="lg:col-span-7 rounded-2xl bg-zinc-50 border border-zinc-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Verification Outcome
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  simulatedResult.status === 'ACTIVE_VERIFIED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : simulatedResult.status === 'DUPLICATE_FLAGGED'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : simulatedResult.status === 'NAME_MISMATCH'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-zinc-200 text-zinc-800 border border-zinc-300'
                }`}>
                  {simulatedResult.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-zinc-900">
                  {simulatedResult.status === 'ACTIVE_VERIFIED' && 'Verified Academic Enrolment Proof'}
                  {simulatedResult.status === 'DUPLICATE_FLAGGED' && 'Concurrent Admission Collision Detected'}
                  {simulatedResult.status === 'NAME_MISMATCH' && 'Demographic Variance in Central Registry'}
                  {simulatedResult.status === 'OVER_CAPACITY' && 'Approved Intake Exceeded (APH Clause 4.2)'}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {simulatedResult.status === 'ACTIVE_VERIFIED' && 'Record matches institutional roll returns and the central APAAR registry. Tamper-evident verification token issued.'}
                  {simulatedResult.status === 'DUPLICATE_FLAGGED' && 'Student holds concurrent admissions across two states. Case routed to AICTE Neutral Adjudication Desk.'}
                  {simulatedResult.status === 'NAME_MISMATCH' && 'College admission roster spelling differs from government APAAR registry. Nodal officer correction task created.'}
                  {simulatedResult.status === 'OVER_CAPACITY' && 'Regular admissions exceed approved sanction. Supernumerary TFW 5% and Lateral Entry 10% quotas must be segregated.'}
                </p>
              </div>

              {/* Cryptographic Signed Token */}
              <div className="pt-3 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Signed Opaque QR Token
                  </span>
                  <span className="font-mono text-xs text-zinc-900 font-semibold">
                    {simulatedResult.token}
                  </span>
                </div>
                <button
                  onClick={handleCopyToken}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-800 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedToken ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Copy Token</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- POLICY-AS-CODE SEAT CAPACITY SIMULATOR --- */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Policy-as-Code Intake Guard
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            AICTE Approval Process Handbook (APH 2024–27) Clauses 4.2 & 4.4 mathematical verification.
          </p>
        </div>

        <div className="once-card p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                  <span>Approved Sanctioned Intake</span>
                  <span className="font-mono text-zinc-950">{approvedIntake} Seats</span>
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
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                  <span>Regular Enrolled Students</span>
                  <span className={`font-mono ${isRegularExceeded ? 'text-rose-600 font-bold' : 'text-zinc-950'}`}>
                    {regularEnrolled} / {approvedIntake}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="260"
                  value={regularEnrolled}
                  onChange={(e) => setRegularEnrolled(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                  <span>Tuition Fee Waiver (TFW 5% Supernumerary)</span>
                  <span className={`font-mono ${isTfwExceeded ? 'text-rose-600 font-bold' : 'text-zinc-950'}`}>
                    {tfwEnrolled} / {maxTfw} max
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={tfwEnrolled}
                  onChange={(e) => setTfwEnrolled(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1">
                  <span>Lateral Entry (10% Supernumerary)</span>
                  <span className={`font-mono ${isLeExceeded ? 'text-rose-600 font-bold' : 'text-zinc-950'}`}>
                    {leEnrolled} / {maxLe} max
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={leEnrolled}
                  onChange={(e) => setLeEnrolled(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
              </div>
            </div>

            {/* Compliance Calculation Result */}
            <div className={`lg:col-span-6 p-6 sm:p-7 rounded-2xl border transition-all ${
              isOverCapacity
                ? 'bg-rose-50/70 border-rose-200'
                : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Compliance Status
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isOverCapacity
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {isOverCapacity ? 'NON-COMPLIANT' : 'COMPLIANT'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-lg font-bold text-zinc-950">
                  {isOverCapacity
                    ? 'Approved Capacity Exceeded'
                    : 'Within AICTE Sanctioned Limits'}
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {isOverCapacity
                    ? 'Total admitted headcount violates the approved intake ceilings or supernumerary quota allocations. Over-admitted regular seats cannot be masked as TFW or Lateral Entry.'
                    : 'Admissions conform to the APH 2024-27 formulas. Regular intake is safely isolated from the 5% TFW and 10% Lateral Entry supernumeraries.'}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-zinc-200/80">
                    <span className="text-[10px] uppercase text-zinc-400 block">Total Enrolled</span>
                    <span className="font-mono font-bold text-sm text-zinc-950">{currentTotal} Students</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-zinc-200/80">
                    <span className="text-[10px] uppercase text-zinc-400 block">Permitted Ceiling</span>
                    <span className="font-mono font-bold text-sm text-zinc-950">{totalApprovedWithSupernumerary} Max</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CLEAN OPERATIONAL FOOTER --- */}
      <footer className="pt-12 pb-8 border-t border-zinc-200 text-xs text-zinc-500 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900">APAAR ONE</span>
            <span>•</span>
            <span>AICTE Regulation Bureau Proposal</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-zinc-900 transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-zinc-900 transition-colors">How It Works</Link>
            <Link href="/security-privacy" className="hover:text-zinc-900 transition-colors">Security & DPDP</Link>
            <Link href="/help" className="hover:text-zinc-900 transition-colors">Help Desk</Link>
            <Link href="/sign-in" className="hover:text-zinc-900 font-medium text-zinc-900">Sign In</Link>
          </div>
        </div>

        <div className="text-[11px] text-zinc-400 leading-relaxed">
          Automated Permanent Academic Account Registry (APAAR) is an initiative of the Ministry of Education, Government of India. This application is designed for the Smart India Hackathon (SIH) under the AICTE Regulation Bureau.
        </div>
      </footer>

    </div>
  );
}
