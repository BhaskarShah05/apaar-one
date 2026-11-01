'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { Cpu, Key, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Copy, Terminal } from 'lucide-react';

export default function InstitutionIntegrationsPage() {
  const { currentUser } = useAuth();
  const [apiKey, setApiKey] = useState('ak_live_apaar_dit_992184b9012c448');
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [testPayloadStatus, setTestPayloadStatus] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRotateKey = () => {
    setIsRotating(true);
    setTimeout(() => {
      setApiKey(`ak_live_apaar_dit_${Math.random().toString(36).substring(2, 10)}`);
      setIsRotating(false);
      alert('API Key rotated successfully. Old key revoked in accordance with SEC-005.');
    }, 600);
  };

  const handleSendTestPayload = () => {
    setTestPayloadStatus('SENDING');
    setTimeout(() => {
      setTestPayloadStatus('SUCCESS');
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">API & ERP Integration Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Connect your campus ERP (SAP, TCS iON, PeopleSoft, or custom SIS) for automated enrolment ingestion.
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gateway State</span>
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          </div>
          <p className="text-lg font-bold text-navy-900">Connected</p>
          <p className="text-[11px] text-teal-700">HTTPS REST v1.0 Active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average Latency</span>
            <span className="text-[10px] text-teal-600 font-bold">Optimal</span>
          </div>
          <p className="text-lg font-bold text-navy-900 font-mono">142 ms</p>
          <p className="text-[11px] text-slate-500">APISetu Gateway Adapter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Last Sync</span>
            <span className="text-[10px] text-slate-500">Auto-Polling</span>
          </div>
          <p className="text-lg font-bold text-navy-900">Today, 09:15 AM</p>
          <p className="text-[11px] text-slate-500">Batch BATCH-2026-0891</p>
        </div>
      </div>

      {/* API Key Management */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900">Institution API Access Key</h2>
            <p className="text-xs text-slate-500">Use this token in your ERP's Authorization header</p>
          </div>
          <button
            onClick={handleRotateKey}
            disabled={isRotating}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>Rotate Key</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={apiKey}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-navy-900"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Test Payload Sandbox */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-govblue-600" />
              <span>ERP Webhook Sandbox & Test Payload</span>
            </h2>
            <p className="text-xs text-slate-500">Simulate direct ERP JSON transmission</p>
          </div>
          <button
            onClick={handleSendTestPayload}
            className="px-4 py-2 bg-govblue-600 hover:bg-govblue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Send Test Ingestion Payload</span>
          </button>
        </div>

        <pre className="p-4 bg-navy-950 text-slate-300 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`POST /api/v1/institutions/inst-dit-del-01/enrolment-batches
Authorization: Bearer ak_live_apaar_dit_...
Idempotency-Key: ${Date.now().toString(36)}
Content-Type: application/json

{
  "academicYear": "2026-27",
  "programmeId": "PRG-DIT-CSE-UG",
  "sourceSystem": "CAMPUS_ERP_SIS",
  "students": [
    {
      "institutionStudentId": "24CSE991",
      "apaarId": "902138479901",
      "admissionDate": "2026-08-10",
      "admissionCategory": "GENERAL",
      "seatBucket": "REGULAR"
    }
  ]
}`}
        </pre>

        {testPayloadStatus === 'SUCCESS' && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>201 Created: Synthetic ERP record received and processed successfully with Idempotency Key validation.</span>
          </div>
        )}
      </div>
    </div>
  );
}

