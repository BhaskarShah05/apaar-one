'use client';

import React, { useState } from 'react';
import { Activity, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function AicteIntegrationsPage() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const gateways = [
    {
      name: 'APISetu / ABC APAAR Identity Gateway',
      role: '12-Digit Academic Identifier Registry Lookup',
      mode: 'MOCK SANDBOX (SIH Prototype)',
      status: 'ACTIVE',
      latency: '118 ms',
      successRate: '99.4%',
      pendingRetries: 1,
      lastHealthCheck: '2 minutes ago',
    },
    {
      name: 'AICTE Approval & Intake Master Feed',
      role: 'Sanctioned Intake & Supernumerary Quota Baseline',
      mode: 'AUTHORITATIVE LOCAL SEED (APH 2024-27)',
      status: 'ACTIVE',
      latency: '12 ms',
      successRate: '100%',
      pendingRetries: 0,
      lastHealthCheck: 'Just now',
    },
    {
      name: 'DigiLocker / National Academic Depository (NAD)',
      role: 'Issuer-Backed Academic Award / Degree Verification',
      mode: 'MOCK REDIRECT ADAPTER',
      status: 'ACTIVE',
      latency: '145 ms',
      successRate: '98.8%',
      pendingRetries: 0,
      lastHealthCheck: '5 minutes ago',
    },
    {
      name: 'National Verification QR Token Generator',
      role: 'Cryptographic Token Signing & Verification Scope',
      mode: 'SHA256withRSA OPAQUE ISSUER',
      status: 'ACTIVE',
      latency: '8 ms',
      successRate: '100%',
      pendingRetries: 0,
      lastHealthCheck: 'Just now',
    },
  ];

  const handleDrainRetryQueue = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setRetrySuccess(true);
      setTimeout(() => setRetrySuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">AICTE System Architecture</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Provider Health & Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">External Gateway Adapters & Health</h1>
          <p className="text-xs text-slate-500">
            Monitor API connection latencies, sandbox error rates, and automated retry queues.
          </p>
        </div>

        <button
          onClick={handleDrainRetryQueue}
          disabled={isRetrying}
          className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin text-teal-400' : ''}`} />
          <span>Drain & Execute Retry Queue</span>
        </button>
      </div>

      {retrySuccess && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>Queued gateway timeout retry executed. 1 student record successfully transitioned from UNAVAILABLE to VERIFIED.</span>
        </div>
      )}

      {/* Gateways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gateways.map((g, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-govblue-700 font-bold border border-blue-200">
                  {g.mode}
                </span>
                <h3 className="text-base font-bold text-navy-900 mt-2">{g.name}</h3>
                <p className="text-xs text-slate-500">{g.role}</p>
              </div>
              <StatusBadge status={g.status} size="sm" />
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Latency</span>
                <span className="font-bold text-navy-900">{g.latency}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Uptime</span>
                <span className="font-bold text-teal-700">{g.successRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-sans block uppercase">Queued</span>
                <span className="font-bold text-amber-700">{g.pendingRetries}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Status Check: {g.lastHealthCheck}</span>
              <span className="text-teal-600 font-medium">SSL / TLS 1.3 Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

