'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { Scale, ArrowLeft, CheckCircle2, Info, Plus } from 'lucide-react';

export default function NewPolicyRulePage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    code: 'AICTE-APH-2024-27-CLAUSE-4.5',
    title: 'PMSSS Special Scholarship Scheme for UTs of J&K and Ladakh',
    programmeLevel: 'UNDERGRADUATE',
    seatBucket: 'J_AND_K_PMSSS',
    capacityBasis: 'SUPERNUMERARY',
    ruleFormula: 'A maximum of 10 supernumerary seats per institution sanctioned directly through AICTE PMSSS centralized counseling allotment.',
    sourceAuthority: 'AICTE Approval Process Handbook 2024-25 to 2026-27 Clause 4.5',
    version: '1.0',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          publishedBy: `${currentUser.name} (${currentUser.role})`,
        }),
      });
      if (res.ok) {
        alert('Policy rule successfully published and loaded into the Capacity Calculation Engine!');
        router.push('/aicte/policies');
      } else {
        alert('Failed to publish rule.');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/aicte/policies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Policy Rules</span>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-navy-900">Draft & Publish Regulatory Policy-as-Code Rule</h1>
        <p className="text-xs text-slate-500">
          Encode authoritative seat quota calculation rules into the runtime compliance engine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-borderLine shadow-card p-6 sm:p-8 space-y-6 text-xs">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Policy Rule Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Rule Version</label>
              <input
                type="text"
                required
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Official Policy Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Programme Level</label>
              <select
                value={formData.programmeLevel}
                onChange={(e) => setFormData({ ...formData, programmeLevel: e.target.value as any })}
                className="w-full border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="UNDERGRADUATE">Undergraduate (UG)</option>
                <option value="POSTGRADUATE">Postgraduate (PG)</option>
                <option value="DIPLOMA">Diploma</option>
                <option value="ALL">All Levels</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Seat Bucket Category</label>
              <select
                value={formData.seatBucket}
                onChange={(e) => setFormData({ ...formData, seatBucket: e.target.value as any })}
                className="w-full border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="J_AND_K_PMSSS">PMSSS J&K Scheme</option>
                <option value="TFW">Tuition Fee Waiver (TFW)</option>
                <option value="NRI">NRI / Gulf Quota</option>
                <option value="LATERAL_ENTRY">Lateral Entry</option>
                <option value="SUPERNUMERARY">Other Supernumerary</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Capacity Calculation Basis</label>
              <select
                value={formData.capacityBasis}
                onChange={(e) => setFormData({ ...formData, capacityBasis: e.target.value as any })}
                className="w-full border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="SUPERNUMERARY">SUPERNUMERARY (Over Approved Intake)</option>
                <option value="WITHIN_APPROVED_INTAKE">WITHIN_APPROVED_INTAKE (Base Quota)</option>
                <option value="CONDITIONAL">CONDITIONAL (Specific AICTE Order)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Source Regulatory Authority</label>
            <input
              type="text"
              required
              value={formData.sourceAuthority}
              onChange={(e) => setFormData({ ...formData, sourceAuthority: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Mathematical Formula & Entitlement Logic</label>
            <textarea
              rows={4}
              required
              value={formData.ruleFormula}
              onChange={(e) => setFormData({ ...formData, ruleFormula: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2 leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <Link
            href="/aicte/policies"
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>{isSubmitting ? 'Publishing Policy...' : 'Publish Policy-as-Code Rule'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

