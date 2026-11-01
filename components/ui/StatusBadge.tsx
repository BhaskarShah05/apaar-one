'use client';

import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  AlertOctagon,
  Ban
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, className = '', size = 'md' }: StatusBadgeProps) {
  const norm = status?.toUpperCase() || 'UNKNOWN';

  let config = {
    bg: 'bg-white/5',
    text: 'text-zinc-300',
    border: 'border-white/10',
    label: status,
    icon: HelpCircle,
  };

  switch (norm) {
    case 'VERIFIED':
    case 'ACTIVE_VERIFIED':
    case 'COMPLETED':
    case 'LEGITIMATE_TRANSFER':
    case 'APPROVED':
    case 'PUBLISHED':
    case 'SUCCESS':
    case 'COMPLIANT':
      config = {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-300',
        border: 'border-emerald-500/20',
        label: norm === 'LEGITIMATE_TRANSFER' ? 'Legitimate Transfer' : norm === 'VERIFIED' ? 'Verified' : status,
        icon: ShieldCheck,
      };
      break;

    case 'ACTIVE':
      config = {
        bg: 'bg-blue-500/10',
        text: 'text-blue-300',
        border: 'border-blue-500/20',
        label: 'Active Enrolment',
        icon: CheckCircle2,
      };
      break;

    case 'PROVISIONAL':
    case 'FORMAT_VALID':
      config = {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-300',
        border: 'border-indigo-500/20',
        label: norm === 'FORMAT_VALID' ? 'Format Valid (Pending Sync)' : 'Provisional Admission',
        icon: Clock,
      };
      break;

    case 'PENDING':
    case 'PENDING_VERIFICATION':
    case 'UNDER_REVIEW':
    case 'PENDING_STUDENT_CONSENT':
    case 'TRANSFERRED':
      config = {
        bg: 'bg-amber-500/10',
        text: 'text-amber-300',
        border: 'border-amber-500/20',
        label: norm === 'PENDING_STUDENT_CONSENT' ? 'Consent Required' : norm === 'UNDER_REVIEW' ? 'Review Case' : status,
        icon: AlertTriangle,
      };
      break;

    case 'NON_COMPLIANT':
    case 'OVER_CAPACITY':
    case 'UNAUTHORIZED':
    case 'CANCELLED':
    case 'MISMATCH':
    case 'DUPLICATE_FLAG':
    case 'FAILED':
    case 'EXCEEDED':
      config = {
        bg: 'bg-rose-500/10',
        text: 'text-rose-300',
        border: 'border-rose-500/20',
        label: norm === 'OVER_CAPACITY' ? 'Over Capacity' : norm === 'MISMATCH' ? 'Data Mismatch' : status,
        icon: AlertOctagon,
      };
      break;

    case 'WITHDRAWN':
    case 'REVOKED':
    case 'BLOCKED':
      config = {
        bg: 'bg-zinc-800',
        text: 'text-zinc-400',
        border: 'border-white/10',
        label: status,
        icon: Ban,
      };
      break;

    default:
      config = {
        bg: 'bg-white/5',
        text: 'text-zinc-300',
        border: 'border-white/10',
        label: status,
        icon: HelpCircle,
      };
  }

  const IconComponent = config.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md tracking-wide ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <IconComponent className={size === 'sm' ? 'w-3 h-3 flex-shrink-0' : 'w-3.5 h-3.5 flex-shrink-0'} />
      <span className="capitalize">{config.label.toLowerCase().replace(/_/g, ' ')}</span>
    </span>
  );
}
