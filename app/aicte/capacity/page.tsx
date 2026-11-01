'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Scale, AlertTriangle, CheckCircle2, Building2, Filter, Info, ArrowRight } from 'lucide-react';

export default function AicteCapacityMonitorPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllCapacity() {
      try {
        // Fetch capacity across all institutions
        const instRes = await fetch('/api/v1/institutions');
        const instJson = await instRes.json();
        if (instJson.data) {
          const capPromises = instJson.data.map((i: any) =>
            fetch(`/api/v1/institutions/${i.id}/capacity`).then(r => r.json())
          );
          const results = await Promise.all(capPromises);
          const allProgs: any[] = [];
          results.forEach(r => {
            if (r.data?.programmes) {
              r.data.programmes.forEach((p: any) => {
                allProgs.push({
                  ...p,
                  institutionId: r.data.institutionId,
                  institutionName: r.data.institutionName,
                });
              });
            }
          });
          setData(allProgs);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAllCapacity();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE Regulation Bureau</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Seat Capacity Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">National Intake & Capacity Monitor</h1>
          <p className="text-xs text-slate-500">
            Real-time compliance monitoring: Sanctioned Intake vs. Permitted Supernumerary Quotas.
          </p>
        </div>

        <Link
          href="/aicte/policies"
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
        >
          <Scale className="w-3.5 h-3.5 text-teal-400" />
          <span>View Policy-as-Code Rules</span>
        </Link>
      </div>

      {/* Over-Capacity Notification Callout */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-red-800">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>Over-Admission Alert Triggered: Maharashtra National College of Engineering (MNCE Pune)</span>
        </p>
        <p className="text-[11px] text-red-800 leading-relaxed">
          Course <strong>B.Tech Information Technology</strong> admitted 128 students against permitted capacity of 126 (120 Regular + 6 Supernumerary TFW). Net unapproved excess of +2 admissions violates AICTE APH Chapter IV. Case CASE-2026-043 opened for regulatory action.
        </p>
      </div>

      {/* Capacity Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Institution Name</th>
              <th className="py-3 px-4">Programme Branch</th>
              <th className="py-3 px-4 text-center">Approved Intake</th>
              <th className="py-3 px-4 text-center">Permitted Capacity</th>
              <th className="py-3 px-4 text-center">Active Enrolled</th>
              <th className="py-3 px-4">Compliance Status</th>
              <th className="py-3 px-4">Mathematical Policy Basis</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-navy-900">
                  <Link href={`/aicte/institutions/${item.institutionId}`} className="hover:text-govblue-600 hover:underline">
                    {item.institutionName}
                  </Link>
                </td>
                <td className="py-3 px-4 text-slate-800">{item.programmeName}</td>
                <td className="py-3 px-4 text-center font-mono">{item.baseApprovedIntake}</td>
                <td className="py-3 px-4 text-center font-mono font-semibold">{item.permittedCapacity}</td>
                <td className={`py-3 px-4 text-center font-mono font-bold ${item.status === 'EXCEEDED_CAPACITY' ? 'text-red-600' : 'text-navy-900'}`}>
                  {item.currentActiveEnrolment}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} size="sm" />
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500 max-w-xs">
                  {item.calculationArithmetic}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/aicte/institutions/${item.institutionId}`}
                    className="inline-flex items-center gap-1 text-[11px] text-govblue-600 font-semibold hover:underline"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

