'use client';

import React, { useState, useEffect } from 'react';
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
  Home,
  Clock,
  Sparkles
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

// Live Time Display component inspired by Once UI Header (Light Theme)
function TimeDisplay() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
      <Clock className="w-3.5 h-3.5 text-zinc-400" />
      <span>{timeStr} IST</span>
    </div>
  );
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
  const isHomePage = pathname === '/';
  const isPublic = pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/how-it-works') || pathname.startsWith('/features') || pathname.startsWith('/security-privacy') || pathname.startsWith('/help') || pathname.startsWith('/sign-in');
  const isInstitution = pathname.startsWith('/institution');
  const isAicte = pathname.startsWith('/aicte');
  const isStudent = pathname.startsWith('/student');
  const isVerifier = pathname.startsWith('/verifier');

  const handleRoleSwitch = (roleKey: string) => {
    switchUser(roleKey);
    setUserDropdownOpen(false);

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
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white once-bg-dots once-spotlight relative">
      
      {/* Once UI Floating Header Island (Non-Home Pages) */}
      {!isHomePage && (
        <header className="sticky top-3 z-50 px-4 sm:px-6 max-w-7xl w-full mx-auto">
          <div className="flex items-center justify-between gap-3">
          
          {/* Left: Location & Authority Status Badge */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-serif font-bold text-sm shadow-md transition-transform group-hover:scale-105">
                अ
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-zinc-900 leading-none">APAAR ONE</span>
                <span className="text-[10px] text-zinc-500 leading-tight flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  New Delhi, IN • AICTE Bureau
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Once UI Floating Translucent Dock (Light Theme) */}
          <nav className="once-dock rounded-full px-2 py-1.5 flex items-center gap-1 text-xs mx-auto md:mx-0 shadow-lg">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                isPublic ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Overview</span>
            </Link>

            <div className="w-px h-4 bg-zinc-200 mx-0.5" />

            <Link
              href="/institution/overview"
              className={`px-3 py-1.5 rounded-full transition-all ${
                isInstitution ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Institution
            </Link>

            <Link
              href="/aicte/overview"
              className={`px-3 py-1.5 rounded-full transition-all ${
                isAicte ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              AICTE Bureau
            </Link>

            <Link
              href="/student/overview"
              className={`px-3 py-1.5 rounded-full transition-all ${
                isStudent ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Student
            </Link>

            <Link
              href="/verifier/overview"
              className={`px-3 py-1.5 rounded-full transition-all ${
                isVerifier ? 'bg-zinc-950 text-white font-semibold shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              Verifier
            </Link>
          </nav>

          {/* Right: Live Digital Clock & Persona Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <TimeDisplay />
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="once-dock px-3 py-1.5 rounded-full text-xs flex items-center gap-2 hover:border-zinc-300 transition-all text-left"
              >
                <div className="w-5 h-5 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-zinc-800">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white/95 border border-zinc-200/90 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl">
                  <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                    <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Switch Evaluator Persona
                    </div>
                  </div>

                  <div className="space-y-1">
                    {Object.entries(DEMO_USERS).map(([key, u]) => (
                      <button
                        key={key}
                        onClick={() => handleRoleSwitch(key)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currentUser.id === u.id
                            ? 'bg-zinc-900 text-white font-medium'
                            : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <div>
                          <div className={`font-semibold ${currentUser.id === u.id ? 'text-white' : 'text-zinc-900'}`}>{u.name}</div>
                          <div className={`text-[10px] ${currentUser.id === u.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{u.institutionName || 'AICTE Bureau'}</div>
                        </div>
                        {currentUser.id === u.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between px-2">
                    <button
                      onClick={handleResetData}
                      disabled={isResetting}
                      className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                      <span>{isResetting ? 'Resetting...' : 'Reset Demo State'}</span>
                    </button>
                    <Link
                      href="/sign-in"
                      onClick={() => setUserDropdownOpen(false)}
                      className="text-[11px] text-blue-600 hover:underline font-medium"
                    >
                      All Roles →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden once-dock p-2 rounded-full text-zinc-600 hover:text-zinc-900"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 once-dock rounded-2xl p-3 space-y-2 animate-fade-in">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-center font-semibold"
              >
                Public Home
              </Link>
              <Link
                href="/institution/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-center font-semibold"
              >
                Institution
              </Link>
              <Link
                href="/aicte/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-center font-semibold"
              >
                AICTE Bureau
              </Link>
              <Link
                href="/student/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-center font-semibold"
              >
                Student Portal
              </Link>
              <Link
                href="/verifier/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-center col-span-2 font-semibold"
              >
                External Verifier Portal
              </Link>
            </div>
          </div>
        )}
      </header>
      )}

      {/* Main Workspace Body */}
      {isHomePage ? (
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 gap-6">
          {/* Workspace Sidebar (when inside a portal) */}
          {!isPublic && currentNav.length > 0 && (
            <aside className="w-full lg:w-64 once-card rounded-3xl p-5 flex-shrink-0 space-y-5 h-fit lg:sticky lg:top-20">
              <div className="pb-3 border-b border-zinc-100">
                <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                  {isInstitution ? 'Institution Workspace' : isAicte ? 'Regulation Bureau' : isStudent ? 'Citizen Workspace' : 'Verifier Console'}
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1 truncate">
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
                          ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Context Card */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 text-[11px] text-zinc-600">
                <div className="flex items-center gap-2 font-semibold text-zinc-900 mb-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Trust Active</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Masked APAAR by default. Cryptographic audit hashing enabled.
                </p>
              </div>
            </aside>
          )}

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      )}

      {/* Persistent Toast notification */}
      {resetSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 once-dock text-emerald-800 border-emerald-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold">Synthetic database reset to initial 10 test scenarios.</span>
        </div>
      )}
    </div>
  );
}
