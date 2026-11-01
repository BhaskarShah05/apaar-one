'use client';

import React from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { GraduationCap, Building2, Calendar, History, ArrowRight } from 'lucide-react';

export default function StudentEnrolmentsPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">My Institutional Enrolment Records</h1>
        <p className="text-xs text-slate-500 mt-1">
          Time-bounded enrolment relationships registered with AICTE under your APAAR identity.
        </p>
      </div>

      {/* Active Enrolment Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-navy-900">ENR-DIT-2026-001</span>
              <StatusBadge status="ACTIVE" size="sm" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 mt-1">B.Tech in Computer Science & Engineering</h2>
            <p className="text-xs text-slate-500">Delhi Institute of Technology & Engineering (DIT-DEL-01)</p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            Current Active Record
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
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
            <span className="font-bold text-navy-900">GENERAL</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Seat Bucket</span>
            <span className="font-bold text-govblue-600">REGULAR INTAKE</span>
          </div>
        </div>

        {/* Mini timeline */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-bold text-navy-900 text-[11px] uppercase tracking-wider">Enrolment Event Log</p>
          <div className="text-[11px] space-y-1">
            <p>• <strong>2026-08-10</strong>: Formally admitted into B.Tech CSE through state merit counselling.</p>
            <p>• <strong>2026-08-11</strong>: APAAR ID 9021-3847-1092 verified through authorized ABC gateway.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

