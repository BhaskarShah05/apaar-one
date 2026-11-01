'use client';

import React, { useState } from 'react';
import { Cpu, Key, Copy, RefreshCw, CheckCircle2, Terminal } from 'lucide-react';

export default function VerifierApiPage() {
  const [apiKey, setApiKey] = useState('vk_live_techcorp_4891b8201a4e921');
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRotateKey = () => {
    setIsRotating(true);
    setTimeout(() => {
      setApiKey(`vk_live_techcorp_${Math.random().toString(36).substring(2, 10)}`);
      setIsRotating(false);
      alert('Verification API Key rotated. Old key revoked.');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">Partner Verification API Credentials</h1>
        <p className="text-xs text-slate-500 mt-1">
          Automate talent background checks from your ATS or internal screening workflow via REST API.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-navy-900">Live API Key</h2>
            <p className="text-xs text-slate-500">Bearer token for REST API queries</p>
          </div>
          <button
            onClick={handleRotateKey}
            disabled={isRotating}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
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
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-navy-900"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Sample Box */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-govblue-600" />
          <span>cURL API Verification Query Example</span>
        </h2>

        <pre className="p-4 bg-navy-950 text-slate-300 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`curl -X POST https://apaar-one.aicte.gov.in/api/v1/verifications \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "studentIdentifier": "24CSE101",
    "claimType": "ENROLMENT_STATUS",
    "purpose": "EMPLOYMENT_BACKGROUND_CHECK",
    "requestedAttributes": ["institution_name", "programme_name", "enrolment_status"]
  }'`}
        </pre>
      </div>
    </div>
  );
}

