'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Role } from '@/types';

export const DEMO_USERS: Record<string, UserProfile> = {
  INSTITUTION_ADMIN: {
    id: 'usr-inst-adm-01',
    name: 'Dr. Rajeshwar Sharma',
    email: 'principal@dit.edu.in',
    role: 'INSTITUTION_ADMIN',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    mfaEnabled: true,
  },
  INSTITUTION_OPERATOR: {
    id: 'usr-inst-op-01',
    name: 'Priya Verma',
    email: 'admissions@dit.edu.in',
    role: 'INSTITUTION_OPERATOR',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    mfaEnabled: false,
  },
  AICTE_REVIEWER: {
    id: 'usr-aicte-rev-01',
    name: 'Vikram Nair',
    email: 'v.nair@aicte.gov.in',
    role: 'AICTE_REVIEWER',
    institutionName: 'AICTE Northern Regional Office',
    mfaEnabled: true,
  },
  AICTE_POLICY_ADMIN: {
    id: 'usr-aicte-pol-01',
    name: 'Dr. S. K. Gupta',
    email: 'policy.director@aicte.gov.in',
    role: 'AICTE_POLICY_ADMIN',
    institutionName: 'AICTE Policy & Regulation Bureau',
    mfaEnabled: true,
  },
  AICTE_SYSTEM_ADMIN: {
    id: 'usr-aicte-sys-01',
    name: 'Anita Deshmukh',
    email: 'system.admin@aicte.gov.in',
    role: 'AICTE_SYSTEM_ADMIN',
    institutionName: 'AICTE Technology & Cloud Division',
    mfaEnabled: true,
  },
  STUDENT: {
    id: 'usr-student-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.aicte.gov.in',
    role: 'STUDENT',
    studentApaarId: 'XXXX-XXXX-4819',
    studentUuid: 'stu-9011-8842-001',
    institutionId: 'inst-dit-del-01',
    institutionName: 'Delhi Institute of Technology & Engineering',
    mfaEnabled: true,
  },
  EXTERNAL_VERIFIER: {
    id: 'usr-verifier-01',
    name: 'P. Sengupta',
    email: 'investigations@techcorp-verif.com',
    role: 'EXTERNAL_VERIFIER',
    verifierOrg: 'TechCorp Background Screening Services Pvt Ltd',
    mfaEnabled: true,
  },
};

interface AuthContextType {
  currentUser: UserProfile;
  activeRole: Role;
  switchUser: (roleKey: string) => void;
  activeAcademicYear: string;
  setActiveAcademicYear: (year: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [activeRoleKey, setActiveRoleKey] = useState<string>('INSTITUTION_ADMIN');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.INSTITUTION_ADMIN);
  const [activeAcademicYear, setActiveAcademicYear] = useState<string>('2026-27');
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Sync state
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('apaar_one_active_role') : null;
    if (saved && DEMO_USERS[saved]) {
      setActiveRoleKey(saved);
      setCurrentUser(DEMO_USERS[saved]);
    }
  }, []);

  const switchUser = (roleKey: string) => {
    if (DEMO_USERS[roleKey]) {
      setActiveRoleKey(roleKey);
      setCurrentUser(DEMO_USERS[roleKey]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('apaar_one_active_role', roleKey);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole: currentUser.role,
        switchUser,
        activeAcademicYear,
        setActiveAcademicYear,
        demoMode,
        setDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

