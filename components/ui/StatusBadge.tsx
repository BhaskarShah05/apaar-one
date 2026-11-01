'use client';

import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  FileCheck2,
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
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
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
        bg: 'bg-teal-50',
        text: 'text-teal-800',
        border: 'border-teal-200',
        label: norm === 'LEGITIMATE_TRANSFER' ? 'Legitimate Transfer' : norm === 'VERIFIED' ? 'Verified' : status,
        icon: ShieldCheck,
      };
      break;

    case 'ACTIVE':
      config = {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        label: 'Active Enrolment',
        icon: CheckCircle2,
      };
      break;

    case 'FORMAT_VALID':
      config = {
        bg: 'bg-sky-50',
        text: 'text-sky-800',
        border: 'border-sky-200',
        label: 'Format Valid (Check Pending)',
        icon: FileCheck2,
      };
      break;

    case 'PENDING':
    case 'PENDING_VALIDATION':
    case 'PENDING_STUDENT_CONSENT':
    case 'UNDER_REVIEW':
    case 'OPEN':
    case 'WARNING':
    case 'DRAFT':
      config = {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        label: norm === 'PENDING_STUDENT_CONSENT' ? 'Pending Consent' : norm === 'UNDER_REVIEW' ? 'Under Review' : status,
        icon: Clock,
      };
      break;

    case 'NOT_SUBMITTED':
      config = {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        label: 'APAAR Pending',
        icon: HelpCircle,
      };
      break;

    case 'UNAVAILABLE':
      config = {
        bg: 'bg-orange-50',
        text: 'text-orange-800',
        border: 'border-orange-200',
        label: 'Provider Timeout (504)',
        icon: AlertTriangle,
      };
      break;

    case 'MISMATCH':
    case 'REJECTED':
    case 'ERROR':
    case 'CONFIRMED_DUPLICATE':
    case 'EXCEEDED_CAPACITY':
    case 'OVER_CAPACITY':
      config = {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        label: norm === 'CONFIRMED_DUPLICATE' ? 'Duplicate Confirmed' : status,
        icon: XCircle,
      };
      break;

    case 'BLOCKER':
    case 'QUARANTINED':
    case 'SUSPENDED':
    case 'DECLINED':
      config = {
        bg: 'bg-rose-100',
        text: 'text-rose-900',
        border: 'border-rose-300',
        label: status,
        icon: Ban,
      };
      break;

    case 'TRANSFERRED_OUT':
      config = {
        bg: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
        label: 'Transferred Out',
        icon: FileCheck2,
      };
      break;

    case 'WITHDRAWN':
      config = {
        bg: 'bg-zinc-100',
        text: 'text-zinc-700',
        border: 'border-zinc-300',
        label: 'Withdrawn',
        icon: AlertOctagon,
      };
      break;
  }

  const Icon = config.icon;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${config.bg} ${config.text} ${config.border} ${padding} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
}

