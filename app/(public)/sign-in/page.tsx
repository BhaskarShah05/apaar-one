'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_USERS } from '@/lib/auth/authContext';
import { 
  Building2, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Key, 
  Lock, 
  CheckCircle2,
  Users
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { switchUser, activeAcademicYear } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('INSTITUTION_ADMIN');
  const [mfaCode, setMfaCode] = useState<string>('748192');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const personas = [
    {
      key: 'INSTITUTION_ADMIN',
      name: 'Dr. Rajeshwar Sharma',
      roleLabel: 'Institution Admin (Principal)',
      org: 'Delhi Institute of Technology & Engineering [DIT-DEL-01]',
      desc: 'Full administrative access for managing programmes, users, and regulatory returns.',
      route: '/institution/overview',
      icon: Building2,
      badge: 'Institution Scope',
    },
    {
      key: 'INSTITUTION_OPERATOR',
      name: 'Priya Verma',
      roleLabel: 'Admissions Data Operator',
      org: 'Delhi Institute of Technology & Engineering [DIT-DEL-01]',
      desc: 'Operational access for uploading CSV batches, single admissions, and resolving data issues.',
      route: '/institution/uploads',
      icon: GraduationCap,
      badge: 'Data Entry Scope',
    },
    {
      key: 'AICTE_REVIEWER',
      name: 'Vikram Nair',
      roleLabel: 'AICTE Regional Reviewer / Regulator',
      org: 'AICTE Northern Regional Bureau',
      desc: 'National oversight, cross-institution duplicate review, intake monitoring, and reports.',
      route: '/aicte/overview',
      icon: ShieldCheck,
      badge: 'Regulator Scope',
    },
    {
      key: 'AICTE_POLICY_ADMIN',
      name: 'Dr. S. K. Gupta',
      roleLabel: 'Policy Bureau Director',
      org: 'AICTE Policy & Academic Standards Division',
      desc: 'Manages versioned Policy-as-Code seat entitlement rules (APH 2024-27).',
      route: '/aicte/policies',
      icon: Key,
      badge: 'Policy Scope',
    },
    {
      key: 'STUDENT',
      name: 'Aarav Sharma',
      roleLabel: 'Enrolled Technical Student',
      org: 'APAAR ID: 9021-3847-1092 • Delhi Institute of Technology',
      desc: 'View academic enrolment history, approve third-party background checks, raise corrections.',
      route: '/student/overview',
      icon: Users,
      badge: 'Self-Sovereign Identity',
    },
    {
      key: 'EXTERNAL_VERIFIER',
      name: 'P. Sengupta',
      roleLabel: 'Talent Screening Agency Verifier',
      org: 'TechCorp Background Screening Services Pvt Ltd',
      desc: 'Submit scoped enrolment verification queries and resolve tamper-evident QR proofs.',
      route: '/verifier/overview',
      icon: Search,
      badge: 'Authorized Verifier',
    },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    switchUser(selectedRole);
    const target = personas.find(p => p.key === selectedRole)?.route || '/institution/overview';
    setTimeout(() => {
      router.push(target);
    }, 400);
  };

  const activePersona = personas.find(p => p.key === selectedRole);

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-navy-900">
          Sign In to APAAR ONE
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Role-aware authentication gateway with server-side tenant isolation and MFA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Persona Picker */}
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Select Demo Persona / Institution Scope
          </p>
          <div className="space-y-2">
            {personas.map((p) => {
              const isSelected = selectedRole === p.key;
              const Icon = p.icon;
              return (
                <div
                  key={p.key}
                  onClick={() => setSelectedRole(p.key)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-govblue-600 shadow-card ring-1 ring-govblue-600'
                      : 'bg-white border-borderLine hover:border-slate-300 shadow-subtle'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-govblue-50 text-govblue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy-900">{p.name}</p>
                        <p className="text-[11px] font-medium text-govblue-600">{p.roleLabel}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 truncate">{p.org}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Authenticate Form Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-borderLine shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Authentication Context</span>
            <h2 className="text-base font-bold text-navy-900 mt-1">{activePersona?.name}</h2>
            <p className="text-xs text-slate-500">{activePersona?.roleLabel}</p>
            <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-semibold text-navy-900">Active Scope: </span>
              {activePersona?.org}
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
              <input
                type="text"
                disabled
                value={`${activeAcademicYear} (AICTE Official Cycle)`}
                className="w-full text-xs px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">One-Time MFA Password</label>
                <span className="text-[10px] text-teal-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Auto-populated
                </span>
              </div>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-govblue-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Simulated 6-digit cryptographic authenticator token</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center justify-center gap-2 transition-all"
            >
              <span>{isSubmitting ? 'Authenticating...' : `Enter ${activePersona?.badge}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            Secured via OIDC / OAuth2 mock session handler
          </div>
        </div>
      </div>
    </div>
  );
}

