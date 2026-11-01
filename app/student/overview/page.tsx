'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { IdentityMask } from '@/components/ui/IdentityMask';
import { 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  History, 
  ArrowRight, 
  QrCode,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function StudentOverviewPage() {
  const { currentUser } = useAuth();
  const [student, setStudent] = useState<any>(null);
  const [enrolments, setEnrolments] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const studentUuid = currentUser.studentUuid || 'stu-9011-8842-001';
        const [enrRes, verRes] = await Promise.all([
          fetch(`/api/v1/enrolments?search=${currentUser.name || 'Aarav'}`),
          fetch(`/api/v1/verifications?studentUuid=${studentUuid}`),
        ]);

        const enrJson = await enrRes.json();
        const verJson = await verRes.json();

        if (enrJson.data) setEnrolments(enrJson.data);
        if (verJson.data) setRequests(verJson.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, [currentUser.studentUuid, currentUser.name]);

  const pendingRequests = requests.filter(r => r.status === 'PENDING_STUDENT_CONSENT');

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Student Academic Space</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Self-Sovereign Identity</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Welcome, {currentUser.name}</h1>
          <p className="text-xs text-slate-500">
            Manage your APAAR-linked enrolments, approve employment verification queries, and exercise data rights.
          </p>
        </div>

        <Link
          href="/student/identity"
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
        >
          <Award className="w-3.5 h-3.5 text-teal-400" />
          <span>My Digital APAAR Card</span>
        </Link>
      </div>

      {/* Pending Consent Action Banner */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Action Required: {pendingRequests.length} Pending Verification Request
              </h3>
              <p className="text-xs text-amber-700">
                TechCorp Background Screening Services has requested proof of your technical enrolment.
              </p>
            </div>
          </div>
          <Link
            href="/student/verification-requests"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap shadow-sm transition-colors"
          >
            Review & Grant Consent
          </Link>
        </div>
      )}

      {/* Digital Academic ID Card */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-serif font-black text-xl text-teal-300 border border-white/20">
                अ
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-teal-300 font-semibold">
                  GOVERNMENT OF INDIA • AICTE
                </p>
                <h2 className="text-lg font-bold">National Student Academic Identity</h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registry Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Student Legal Name</span>
              <p className="text-base font-bold text-white mt-0.5">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400">DOB: 15-XX-2004 • Gender: Male</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">APAAR Reference</span>
              <p className="text-base font-mono font-bold text-teal-300 mt-0.5 tracking-wider">
                {currentUser.studentApaarId || '9021-3847-1092'}
              </p>
              <p className="text-[10px] text-slate-400">ABC Account Linked</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Institution</span>
              <p className="text-xs font-semibold text-white mt-0.5 truncate">
                {currentUser.institutionName || 'Delhi Institute of Technology & Engineering'}
              </p>
              <p className="text-[10px] text-slate-400">Roll: 24CSE101 (B.Tech CSE)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Enrolment Summary */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-900">Current Institutional Enrolment</h2>
            <p className="text-xs text-slate-500">Official technical education record reported to AICTE</p>
          </div>
          <Link
            href="/student/enrolments"
            className="text-xs font-semibold text-govblue-600 hover:text-govblue-700 flex items-center gap-1"
          >
            <span>Full Enrolment History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                PRG-DIT-CSE-UG
              </span>
              <h3 className="text-base font-bold text-navy-900 mt-1">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-xs text-slate-600">
                Delhi Institute of Technology & Engineering (DIT-DEL-01)
              </p>
            </div>
            <StatusBadge status="ACTIVE_VERIFIED" size="md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2 border-t border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Roll Number</span>
              <span className="font-bold text-navy-900">24CSE101</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Admission Date</span>
              <span className="font-bold text-navy-900">2026-08-10</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Category</span>
              <span className="font-bold text-navy-900">GENERAL (Merit)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Seat Quota</span>
              <span className="font-bold text-govblue-600">REGULAR INTAKE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

