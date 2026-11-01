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
      badge: 'Institution Head',
    },
    {
      key: 'INSTITUTION_NODAL',
      name: 'Prof. Ananya Sen',
      roleLabel: 'Nodal Officer / Registrar',
      org: 'Delhi Institute of Technology & Engineering [DIT-DEL-01]',
      desc: 'Operational uploads, APAAR registry mismatch resolution, duplicate case evidence.',
      route: '/institution/upload-centre',
      icon: Users,
      badge: 'Data Officer',
    },
    {
      key: 'AICTE_ADMIN',
      name: 'Er. Vivek Kulkarni',
      roleLabel: 'AICTE Director (Regulation Bureau)',
      org: 'AICTE HQ, Nelson Mandela Marg, New Delhi',
      desc: 'National intake intelligence, capacity compliance, duplicate adjudication, audit logs.',
      route: '/aicte/enrolment-intelligence',
      icon: ShieldCheck,
      badge: 'Central Regulator',
    },
    {
      key: 'STUDENT',
      name: 'Aarav Mehta',
      roleLabel: 'Registered Citizen Student',
      org: 'APAAR ID: 9823-4412-8901 (Masked: XXXX-XXXX-8901)',
      desc: 'View enrolment status, audit log of verifier unmasking, grant third-party consent.',
      route: '/student/profile',
      icon: GraduationCap,
      badge: 'Student / Citizen',
    },
    {
      key: 'VERIFIER',
      name: 'TCS Campus Talent Screening',
      roleLabel: 'Authorized Background Verifier',
      org: 'Tata Consultancy Services - Enterprise BG Verifier #BGV-491',
      desc: 'Verify single/bulk student academic enrolment records, scan tamper-evident QR proofs.',
      route: '/verifier/verify',
      icon: Search,
      badge: 'Corporate Verifier',
    },
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    switchUser(selectedRole);
    const chosen = personas.find((p) => p.key === selectedRole);

    setTimeout(() => {
      if (chosen) {
        router.push(chosen.route);
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-sm mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              SIH Sandbox Authentication Gateway
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Access <span className="text-zinc-900 underline decoration-amber-400 decoration-wavy underline-offset-8">APAAR ONE</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
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
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-[1.02]'
                      : 'bg-white text-zinc-900 border-zinc-200/80 hover:border-zinc-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-amber-300' : 'bg-zinc-100 text-zinc-700'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'border-white/20 bg-white/10 text-zinc-200' 
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                    }`}>
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-zinc-950'}`}>{persona.name}</h3>
                  <p className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-amber-300' : 'text-amber-700'}`}>{persona.roleLabel}</p>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{persona.org}</p>

                  <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                    isSelected ? 'border-white/10 text-zinc-300' : 'border-zinc-100 text-zinc-500'
                  }`}>
                    <span>Destination:</span>
                    <span className="font-mono">{persona.route}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credentials Card */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-950">Passkey & MFA Simulation</div>
                <div className="text-[11px] text-zinc-500">Pre-authenticated for smart evaluator walkthroughs</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-950 text-white font-semibold text-xs sm:text-sm hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-md"
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
