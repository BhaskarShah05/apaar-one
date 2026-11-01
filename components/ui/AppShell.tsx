'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, DEMO_USERS } from '@/lib/auth/authContext';
import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  Users,
  UploadCloud,
  AlertCircle,
  CopyX,
  FileSpreadsheet,
  Cpu,
  UserCheck,
  Settings,
  Building2,
  ShieldCheck,
  Search,
  Scale,
  BellRing,
  History,
  Activity,
  Award,
  QrCode,
  Shield,
  RotateCcw,
  Check,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  BookOpen,
  Info,
  Sliders,
  HelpCircle
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchUser, activeAcademicYear, setActiveAcademicYear } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccessToast, setResetSuccessToast] = useState(false);

  // Determine which portal is active based on path
  const isPublic = pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/how-it-works') || pathname.startsWith('/features') || pathname.startsWith('/security-privacy') || pathname.startsWith('/help') || pathname.startsWith('/sign-in');
  const isInstitution = pathname.startsWith('/institution');
  const isAicte = pathname.startsWith('/aicte');
  const isStudent = pathname.startsWith('/student');
  const isVerifier = pathname.startsWith('/verifier');

  const handleRoleSwitch = (roleKey: string) => {
    switchUser(roleKey);
    setUserDropdownOpen(false);

    // Route to appropriate section
    if (roleKey.startsWith('INSTITUTION')) {
      router.push('/institution/overview');
    } else if (roleKey.startsWith('AICTE')) {
      router.push('/aicte/overview');
    } else if (roleKey === 'STUDENT') {
      router.push('/student/overview');
    } else if (roleKey === 'EXTERNAL_VERIFIER') {
      router.push('/verifier/overview');
    }
  };

  const handleResetData = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/v1/system/reset', { method: 'POST' });
      setResetSuccessToast(true);
      setTimeout(() => {
        setResetSuccessToast(false);
        window.location.reload();
      }, 1000);
    } catch {
      setIsResetting(false);
    }
  };

  interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  // Nav links for each portal
  const institutionNav: NavItem[] = [
    { label: 'Overview', href: '/institution/overview', icon: LayoutDashboard },
    { label: 'Programmes & Intake', href: '/institution/programmes', icon: GraduationCap },
    { label: 'Seat Compliance', href: '/institution/intake', icon: Scale },
    { label: 'Student Records', href: '/institution/students', icon: Users },
    { label: 'New Student Entry', href: '/institution/students/new', icon: UserCheck },
    { label: 'Upload Centre', href: '/institution/uploads', icon: UploadCloud },
    { label: 'Validation Issues', href: '/institution/issues', icon: AlertCircle, badge: '3' },
    { label: 'Duplicate Cases', href: '/institution/duplicates', icon: CopyX, badge: '1' },
    { label: 'Reports', href: '/institution/reports', icon: FileSpreadsheet },
    { label: 'API Integration', href: '/institution/integrations', icon: Cpu },
    { label: 'Users & Roles', href: '/institution/users', icon: ShieldCheck },
    { label: 'Settings', href: '/institution/settings', icon: Settings },
  ];

  const aicteNav: NavItem[] = [
    { label: 'National Overview', href: '/aicte/overview', icon: LayoutDashboard },
    { label: 'Institutions Directory', href: '/aicte/institutions', icon: Building2 },
    { label: 'National Enrolments', href: '/aicte/enrolments', icon: Users },
    { label: 'Capacity & Quota', href: '/aicte/capacity', icon: Scale },
    { label: 'Alerts & Risk Cases', href: '/aicte/alerts', icon: BellRing, badge: '2' },
    { label: 'Policy-as-Code Rules', href: '/aicte/policies', icon: Sliders },
    { label: 'National Reports', href: '/aicte/reports', icon: FileSpreadsheet },
    { label: 'Tamper-Evident Audit', href: '/aicte/audit', icon: History },
    { label: 'Integration & Provider Health', href: '/aicte/integrations', icon: Activity },
    { label: 'Bureau Users & MFA', href: '/aicte/users-roles', icon: ShieldCheck },
    { label: 'System Settings', href: '/aicte/settings', icon: Settings },
  ];

  const studentNav: NavItem[] = [
    { label: 'Academic Overview', href: '/student/overview', icon: LayoutDashboard },
    { label: 'My APAAR Identity', href: '/student/identity', icon: Award },
    { label: 'My Enrolments', href: '/student/enrolments', icon: GraduationCap },
    { label: 'Verification Requests', href: '/student/verification-requests', icon: ShieldCheck, badge: '1' },
    { label: 'Correction Requests', href: '/student/corrections', icon: AlertCircle },
    { label: 'Sharing History', href: '/student/sharing-history', icon: History },
    { label: 'Help & Grievance', href: '/student/help', icon: HelpCircle },
  ];

  const verifierNav: NavItem[] = [
    { label: 'Verifier Overview', href: '/verifier/overview', icon: LayoutDashboard },
    { label: 'New Verification Query', href: '/verifier/new-request', icon: Search },
    { label: 'Verification Requests', href: '/verifier/requests', icon: History },
    { label: 'QR / Token Scanner', href: '/verifier/scan', icon: QrCode },
    { label: 'Organization Profile', href: '/verifier/organization', icon: Building2 },
    { label: 'Partner API Keys', href: '/verifier/api', icon: Cpu },
  ];

  const currentNav = isInstitution ? institutionNav : isAicte ? aicteNav : isStudent ? studentNav : isVerifier ? verifierNav : [];

  return (
    <div className="min-h-screen flex flex-col bg-slatebg font-sans text-textMain selection:bg-govblue-100 selection:text-govblue-700">
      {/* Top Persistent Demo Banner */}
      <div className="bg-navy-950 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-navy-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
            SIH DEMO MODE
          </span>
          <span className="truncate">
            Identity provider validations & capacity checks use synthetic records & mock ABC/APAAR adapters.
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] ml-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Academic Year:</span>
            <select
              value={activeAcademicYear}
              onChange={(e) => setActiveAcademicYear(e.target.value)}
              className="bg-navy-900 text-slate-200 border border-navy-700 rounded px-1.5 py-0.5 text-xs font-medium focus:outline-none focus:border-govblue-500"
            >
              <option value="2026-27">2026-27 (Current)</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>

          <button
            onClick={handleResetData}
            disabled={isResetting}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white transition-colors border border-navy-700"
            title="Reset synthetic database to clean initial state"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Resetting...' : 'Reset Demo State'}</span>
          </button>
        </div>
      </div>

      {/* Main Top Header */}
      <header className="bg-white border-b border-borderLine sticky top-0 z-40 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center text-white shadow-subtle group-hover:bg-govblue-600 transition-colors">
                  <span className="font-serif font-black text-lg tracking-wider">अ</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-navy-900 tracking-tight">APAAR ONE</span>
                    <span className="px-1.5 py-0.2 bg-govteal-50 text-govteal-700 text-[10px] font-semibold rounded border border-govteal-200 uppercase">
                      AICTE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block">
                    One Academic Identity. Every Enrolment Verified.
                  </p>
                </div>
              </Link>
            </div>

            {/* Portal Switcher Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isPublic ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Public Overview
              </Link>
              <Link
                href="/institution/overview"
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isInstitution ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Institution Workspace
              </Link>
              <Link
                href="/aicte/overview"
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isAicte ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                AICTE Console
              </Link>
              <Link
                href="/student/overview"
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isStudent ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Student Portal
              </Link>
              <Link
                href="/verifier/overview"
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  isVerifier ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                External Verifier
              </Link>
            </nav>

            {/* Right Side: Role Selector & Account Menu */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-borderLine hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="font-semibold text-navy-900 leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{currentUser.role.replace(/_/g, ' ').toLowerCase()}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Role Switcher Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-elevated border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Persona</p>
                      <p className="text-xs font-bold text-navy-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                      {currentUser.institutionName && (
                        <p className="text-[10px] text-govblue-600 font-medium mt-0.5 truncate">{currentUser.institutionName}</p>
                      )}
                    </div>

                    <div className="py-1">
                      <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Persona / Test RBAC</p>
                      {Object.entries(DEMO_USERS).map(([key, u]) => {
                        const isCurrent = currentUser.id === u.id;
                        return (
                          <button
                            key={key}
                            onClick={() => handleRoleSwitch(key)}
                            className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                              isCurrent ? 'bg-slate-50 font-semibold text-navy-900' : 'text-slate-700'
                            }`}
                          >
                            <div>
                              <p className="font-medium text-navy-900">{u.name}</p>
                              <p className="text-[10px] text-slate-500">{u.role.replace(/_/g, ' ')}</p>
                            </div>
                            {isCurrent && <Check className="w-4 h-4 text-govblue-600" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-1 border-t border-slate-100 px-3">
                      <button
                        onClick={handleResetData}
                        className="w-full text-left px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-1.5 font-medium transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset All Synthetic Data</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar for Protected Portals */}
        {!isPublic && currentNav.length > 0 && (
          <aside className="w-full md:w-64 bg-white border-r border-borderLine flex-shrink-0 flex flex-col">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  {isInstitution ? 'Institution Workspace' : isAicte ? 'AICTE Console' : isStudent ? 'Student Portal' : 'Verifier Workspace'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 truncate">
                {isInstitution ? (currentUser.institutionName || 'DIT Delhi [DIT-DEL-01]') : isAicte ? 'AICTE National Bureau' : isStudent ? 'Aarav Sharma (24CSE101)' : 'TechCorp Talent Verification'}
              </p>
            </div>

            <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
              {currentNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-govblue-50 text-govblue-700 font-semibold border border-govblue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-govblue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 bg-red-100 text-red-700 font-bold rounded-full text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t border-slate-100 text-[11px] text-slate-400 bg-slate-50">
              <p className="font-semibold text-slate-600">AICTE SIH 2026</p>
              <p className="text-[10px]">Regulation Bureau • Version 2.0</p>
            </div>
          </aside>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Reset Toast Notification */}
      {resetSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 text-white px-4 py-3 rounded-xl shadow-elevated flex items-center gap-3 border border-navy-700 animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-5 h-5 text-teal-400" />
          <div>
            <p className="text-xs font-bold">Demo Fixtures Reset Successfully</p>
            <p className="text-[11px] text-slate-300">All student records, batches, and conflict cases restored.</p>
          </div>
        </div>
      )}
    </div>
  );
}
