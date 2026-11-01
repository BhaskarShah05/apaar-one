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
  Sliders,
  HelpCircle,
  Star,
  Sparkles
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
    { label: 'Integration & Health', href: '/aicte/integrations', icon: Activity },
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
    <div className="min-h-screen flex flex-col bg-zinc-950 font-sans text-zinc-100 selection:bg-amber-400 selection:text-zinc-950">
      {/* Top Persistent Demo Banner */}
      <div className="bg-zinc-900/90 text-zinc-400 px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] tracking-wide">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
            </span>
            SIH SANDBOX
          </span>
          <span className="truncate text-zinc-400 hidden sm:inline text-[11px]">
            AICTE Regulation Bureau • 10 Pre-Seeded Academic Scenarios Active
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">AY:</span>
            <select
              value={activeAcademicYear}
              onChange={(e) => setActiveAcademicYear(e.target.value)}
              className="bg-zinc-900 text-zinc-200 border border-white/10 rounded-full px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:border-white/30"
            >
              <option value="2026-27">2026-27 (Current)</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>

          <button
            onClick={handleResetData}
            disabled={isResetting}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/10 text-xs"
            title="Reset synthetic database to clean initial state"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Resetting...' : 'Reset State'}</span>
          </button>
        </div>
      </div>

      {/* Main Top Header */}
      <header className="bg-zinc-950/80 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/15 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                  <span className="font-serif font-black text-lg tracking-wider text-[#ffcd75]">अ</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white tracking-tight">APAAR ONE</span>
                    <span className="px-2 py-0.5 bg-white/10 text-zinc-300 text-[10px] font-semibold rounded-full border border-white/15 uppercase tracking-wider">
                      AICTE
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:block">
                    One Academic Identity • Every Enrolment Verified
                  </p>
                </div>
              </Link>
            </div>

            {/* Portal Switcher Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 text-xs backdrop-blur-md">
              <Link
                href="/"
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isPublic ? 'bg-white text-zinc-950 shadow-md font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Public
              </Link>
              <Link
                href="/institution/overview"
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isInstitution ? 'bg-white text-zinc-950 shadow-md font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Institution
              </Link>
              <Link
                href="/aicte/overview"
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isAicte ? 'bg-white text-zinc-950 shadow-md font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                AICTE Bureau
              </Link>
              <Link
                href="/student/overview"
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isStudent ? 'bg-white text-zinc-950 shadow-md font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Student
              </Link>
              <Link
                href="/verifier/overview"
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  isVerifier ? 'bg-white text-zinc-950 shadow-md font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Verifier
              </Link>
            </nav>

            {/* Right Side: Demo Persona Selector */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-all text-left group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-[#ffcd75] text-zinc-950 font-bold flex items-center justify-center text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold text-white leading-none">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">
                      {currentUser.role.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900 border border-white/15 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Switch Demo Persona
                      </div>
                      <p className="text-xs text-zinc-300 mt-0.5">Instant role switching for evaluators</p>
                    </div>

                    <div className="space-y-1">
                      {Object.entries(DEMO_USERS).map(([key, u]) => (
                        <button
                          key={key}
                          onClick={() => handleRoleSwitch(key)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            currentUser.id === u.id
                              ? 'bg-white/15 text-white font-medium border border-white/15'
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-white">{u.name}</div>
                            <div className="text-[10px] text-zinc-400">{u.institutionName || 'AICTE Bureau'}</div>
                          </div>
                          {currentUser.id === u.id && (
                            <Check className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/10">
                      <Link
                        href="/sign-in"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block text-center text-xs text-zinc-400 hover:text-white py-1 transition-colors"
                      >
                        Explore All Personas & Credentials →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-zinc-950 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-center"
              >
                Public Home
              </Link>
              <Link
                href="/institution/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-center"
              >
                Institution
              </Link>
              <Link
                href="/aicte/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-center"
              >
                AICTE Bureau
              </Link>
              <Link
                href="/student/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-center"
              >
                Student Portal
              </Link>
              <Link
                href="/verifier/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-center col-span-2"
              >
                External Verifier Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        {/* Workspace Sidebar (when inside a portal) */}
        {!isPublic && currentNav.length > 0 && (
          <aside className="w-full lg:w-64 bg-zinc-950 border-r border-white/10 lg:min-h-[calc(100vh-6rem)] p-4 flex-shrink-0">
            <div className="mb-4 pb-3 border-b border-white/10">
              <div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                {isInstitution ? 'Institution Workspace' : isAicte ? 'Regulation Bureau' : isStudent ? 'Citizen Workspace' : 'Verifier Console'}
              </div>
              <div className="text-xs font-semibold text-white mt-1 truncate">
                {currentUser.institutionName || (isAicte ? 'AICTE Central HQ, New Delhi' : isVerifier ? 'TCS Background Services' : 'Student Identity Desk')}
              </div>
            </div>

            <nav className="space-y-1">
              {currentNav.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/15 font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#ffcd75]' : 'text-zinc-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Context Card */}
            <div className="mt-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-zinc-400 backdrop-blur-md">
              <div className="flex items-center gap-2 font-medium text-white mb-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Trust Active</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Masked APAAR by default. Cryptographic audit hashing enabled.
              </p>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Persistent Toast notification */}
      {resetSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-xl">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">Synthetic database reset to initial 10 test scenarios.</span>
        </div>
      )}
    </div>
  );
}
