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
  Lock, 
  Users
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { switchUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('INSTITUTION_ADMIN');
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
    }, 300);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 mb-2">
            <span className="text-xs font-medium text-zinc-700">
              Authentication & Role Selection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Access APAAR ONE Portals
          </h1>
          <p className="text-sm text-zinc-600 max-w-lg mx-auto">
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
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md scale-[1.01]'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'border-zinc-700 bg-zinc-850 text-zinc-200' 
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                    }`}>
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-zinc-950'}`}>{persona.name}</h3>
                  <p className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>{persona.roleLabel}</p>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>{persona.org}</p>

                  <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                    isSelected ? 'border-zinc-800 text-zinc-400' : 'border-zinc-100 text-zinc-500'
                  }`}>
                    <span>Target Route:</span>
                    <span className="font-mono">{persona.route}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credentials Card */}
          <div className="once-card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-950">Pre-Configured Session</div>
                <div className="text-[11px] text-zinc-500">Instant access for evaluator verification testing</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-950 text-white font-medium text-xs sm:text-sm hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
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
