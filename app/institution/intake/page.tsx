'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Scale, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  Download,
  Lock
} from 'lucide-react';

export default function InstitutionIntakePage() {
  const { currentUser, activeAcademicYear } = useAuth();
  const [capacityData, setCapacityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string>('');

  useEffect(() => {
    async function loadCapacity() {
      try {
        const res = await fetch(`/api/v1/institutions/${currentUser.institutionId || 'inst-dit-del-01'}/capacity`);
        const json = await res.json();
        if (json.data) {
          setCapacityData(json.data);
          if (json.data.programmes?.length > 0) {
            setSelectedProgrammeId(json.data.programmes[0].programmeId);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCapacity();
  }, [currentUser.institutionId]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading seat compliance ledger...</div>;
  }

  const programmes = capacityData?.programmes || [];
  const activeProg = programmes.find((p: any) => p.programmeId === selectedProgrammeId) || programmes[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Seat Governance</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">APH 2024-27</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Seat Compliance & Quota Entitlements Ledger</h1>
          <p className="text-xs text-slate-500">
            Mathematical proof of approved intake vs. supernumerary quotas under AICTE Approval Process.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Institution cannot edit approved intake</span>
          </div>
        </div>
      </div>

      {/* Critical PRD Calculation Guardrail Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-govblue-700">
          <Info className="w-4 h-4" />
          <span>Critical AICTE Calculation Guardrail (PRD Section 8.2)</span>
        </p>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          Permitted capacity is not calculated as a simplistic sum of (Intake + NRI + OCI + FN) by default. Regular intake seats sit strictly within approved intake. Tuition Fee Waiver (TFW 5%) and Lateral Entry (10%) operate as governed supernumerary entitlements as encoded by the AICTE Regulation Bureau.
        </p>
      </div>

      {/* Programme Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {programmes.map((p: any) => (
          <button
            key={p.programmeId}
            onClick={() => setSelectedProgrammeId(p.programmeId)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeProg?.programmeId === p.programmeId
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {p.programmeName}
          </button>
        ))}
      </div>

      {/* Active Programme Compliance Breakdown */}
      {activeProg && (
        <div className="space-y-6">
          {/* Arithmetic Card */}
          <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {activeProg.programmeId}
                </span>
                <h2 className="text-xl font-bold text-navy-900 mt-1">{activeProg.programmeName}</h2>
                <p className="text-xs text-slate-500">Cycle: {activeProg.academicYear} • Approval Ref: {activeProg.approvalReference}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase font-medium">Permitted Capacity</p>
                  <p className="text-2xl font-bold text-navy-900 font-mono">{activeProg.permittedCapacity}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase font-medium">Active Enrolled</p>
                  <p className="text-2xl font-bold text-govblue-600 font-mono">{activeProg.currentActiveEnrolment}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase font-medium">Compliance State</p>
                  <div className="mt-1">
                    <StatusBadge status={activeProg.status} size="md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Arithmetic Formula Callout */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-navy-900 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-slate-500 font-sans font-bold">Calculation Formula: </span>
                <span>{activeProg.calculationArithmetic}</span>
              </div>
              <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                APH 2024-27 Verified
              </span>
            </div>

            {/* Detailed Entitlement Ledger Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                    <th className="py-3 px-4">Seat Bucket</th>
                    <th className="py-3 px-4">Capacity Basis</th>
                    <th className="py-3 px-4 text-center">Approved Seats</th>
                    <th className="py-3 px-4 text-center">Consumed Seats</th>
                    <th className="py-3 px-4 text-center">Remaining Seats</th>
                    <th className="py-3 px-4">Source Policy Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeProg.entitlements.map((ent: any, idx: number) => {
                    const remaining = Math.max(0, ent.approvedQuantity - ent.consumedQuantity);
                    const isOver = ent.consumedQuantity > ent.approvedQuantity;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-navy-900">
                          {ent.bucketLabel}
                          <span className="block text-[10px] font-mono text-slate-400 font-normal">
                            Code: {ent.bucketCode}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            ent.basis === 'SUPERNUMERARY' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {ent.basis}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold">{ent.approvedQuantity}</td>
                        <td className={`py-3 px-4 text-center font-mono font-bold ${isOver ? 'text-red-600' : 'text-navy-900'}`}>
                          {ent.consumedQuantity}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-medium text-slate-500">
                          {remaining}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px]">
                          <span className="font-mono text-slate-700 block">{ent.approvalReference}</span>
                          {ent.policyFormula && (
                            <span className="text-[10px] text-slate-400 block">{ent.policyFormula}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

