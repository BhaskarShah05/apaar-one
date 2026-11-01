'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, CheckCircle2, Lock, Sliders } from 'lucide-react';

export default function AicteSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    academicYear: '2026-27',
    admissionCutoffDate: '2026-10-31',
    apaarGracePeriodDays: '30',
    duplicateConfidenceThreshold: '90',
    supernumeraryTfwMaxPercentage: '5',
    supernumeraryLateralMaxPercentage: '10',
    sandboxMode: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">National Platform Parameters & Regulatory Thresholds</h1>
        <p className="text-xs text-slate-500 mt-1">
          System-wide settings controlling admission cutoffs, APAAR grace windows, and reconciliation sensitivity.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6 text-xs">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-navy-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-govblue-600" />
            <span>Admission Cutoff & Compliance Windows</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Active AICTE Academic Year</label>
              <input
                type="text"
                disabled
                value={config.academicYear}
                className="w-full border border-slate-200 rounded-lg p-2 bg-slate-100 font-mono text-slate-600"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Admission Last Date / Cutoff</label>
              <input
                type="date"
                value={config.admissionCutoffDate}
                onChange={(e) => setConfig({ ...config, admissionCutoffDate: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">APAAR Pending Grace Window (Days)</label>
              <input
                type="number"
                value={config.apaarGracePeriodDays}
                onChange={(e) => setConfig({ ...config, apaarGracePeriodDays: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">Time allowed for student to obtain APAAR before blocker alert</p>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Duplicate Confidence Triage Threshold (%)</label>
              <input
                type="number"
                value={config.duplicateConfidenceThreshold}
                onChange={(e) => setConfig({ ...config, duplicateConfidenceThreshold: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">Cases at or above this score are flagged to the high-priority queue</p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          {saved ? (
            <span className="text-teal-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Parameters updated and saved to audit log.
            </span>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold shadow-subtle transition-colors"
          >
            Update Regulatory Parameters
          </button>
        </div>
      </form>
    </div>
  );
}

