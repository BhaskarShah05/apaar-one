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
  Users,
  Sparkles,
  Sliders
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
      desc: 'Authoring Policy-as-Code rules, intake compliance algorithms, and sanctions matrix.',
      route: '/aicte/policies',
      icon: Sliders,
      badge: 'Policy Scope',
    },
    {
      key: 'STUDENT',
      name: 'Kabir Singhania',
      roleLabel: 'Citizen Student (Active Enrolment)',
      org: 'APAAR ID: 9021-3847-1092',
      desc: 'View personal academic identity, check active enrolments, and approve or deny verifications.',
      route: '/student/overview',
      icon: Users,
      badge: 'Citizen Scope',
    },
    {
      key: 'EXTERNAL_VERIFIER',
      name: 'Aditi Rao',
      roleLabel: 'Corporate HR Verifier',
      org: 'Tata Consultancy Services - Talent Operations',
      desc: 'Request academic checks, inspect verified results, and query validation tokens.',
      route: '/verifier/overview',
      icon: Search,
      badge: 'Verifier Scope',
    },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetPersona = personas.find((p) => p.key === selectedRole);
    switchUser(selectedRole);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(targetPersona ? targetPersona.route : '/institution/overview');
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 font-sans text-white">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffcd75]" />
              SIH Sandbox Authentication Gateway
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Access <span className="bg-gradient-to-r from-white via-white to-[#ffcd75] bg-clip-text text-transparent">APAAR ONE</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Select a verified persona to test role-specific workflows across institutions, regulators, students, or employers.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          {/* Persona Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {personas.map((persona) => {
              const IconComp = persona.icon;
              const isSelected = selectedRole === persona.key;

              return (
                <div
                  key={persona.key}
                  onClick={() => setSelectedRole(persona.key)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/10 border-white/40 shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-xl bg-white/10 text-white">
                      <IconComp className="w-5 h-5 text-[#ffcd75]" />
                    </div>
                    <span className="text-[10px] font-semibold text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full bg-white/5">
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{persona.name}</h3>
                  <p className="text-xs text-amber-300 font-medium mt-0.5">{persona.roleLabel}</p>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{persona.org}</p>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Destination:</span>
                    <span className="font-mono text-zinc-300">{persona.route}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credentials Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Passkey & MFA Simulation</div>
                <div className="text-[11px] text-zinc-400">Pre-authenticated for smart evaluator walkthroughs</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl"
            >
              <span>{isSubmitting ? 'Entering Workspace...' : 'Enter Selected Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
