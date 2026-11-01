'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, ShieldAlert } from 'lucide-react';

interface IdentityMaskProps {
  maskedValue: string;
  fullValue?: string;
  studentId?: string;
  allowReveal?: boolean;
  className?: string;
}

export function IdentityMask({
  maskedValue,
  fullValue = '9021-3847-1092',
  studentId,
  allowReveal = true,
  className = '',
}: IdentityMaskProps) {
  const [revealed, setRevealed] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const toggleReveal = async () => {
    if (!allowReveal) return;
    if (!revealed) {
      // Trigger audit log for security provenance
      setIsLogging(true);
      try {
        await fetch('/api/v1/audit-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'SENSITIVE_IDENTIFIER_REVEAL',
            entity: 'StudentIdentity',
            targetId: studentId || 'stu-ref',
            actorRole: 'INSTITUTION_ADMIN',
            details: `Authorized identity reveal for academic identity reference ${maskedValue}`,
          }),
        }).catch(() => {});
      } finally {
        setIsLogging(false);
        setRevealed(true);
      }
    } else {
      setRevealed(false);
    }
  };

  if (maskedValue === 'NOT_SUBMITTED' || !maskedValue) {
    return (
      <span className={`inline-flex items-center text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 ${className}`}>
        Provisional (Pending APAAR)
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <span className={`px-2 py-0.5 rounded border ${revealed ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
        {revealed ? fullValue : maskedValue}
      </span>
      {allowReveal && (
        <button
          type="button"
          onClick={toggleReveal}
          disabled={isLogging}
          title={revealed ? 'Mask APAAR' : 'Audit-logged authorized reveal'}
          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
        >
          {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}

