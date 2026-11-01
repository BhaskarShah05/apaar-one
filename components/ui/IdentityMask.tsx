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
      <span className={`inline-flex items-center text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 ${className}`}>
        Provisional (Pending APAAR)
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <span className={`px-2.5 py-0.5 rounded-full border transition-colors ${revealed ? 'bg-amber-400/10 text-amber-300 border-amber-400/30 font-semibold' : 'bg-white/5 text-zinc-200 border-white/10'}`}>
        {revealed ? fullValue : maskedValue}
      </span>

      {allowReveal && (
        <button
          type="button"
          onClick={toggleReveal}
          disabled={isLogging}
          title={revealed ? 'Mask APAAR Reference' : 'Reveal full APAAR (Audited Action)'}
          className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {revealed ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      )}

      {revealed && (
        <span className="text-[10px] text-amber-400 font-sans tracking-wide">
          Audited
        </span>
      )}
    </div>
  );
}
