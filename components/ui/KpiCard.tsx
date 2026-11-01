'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  denominator?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  onClick?: () => void;
  freshness?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  denominator,
  change,
  changeType = 'neutral',
  icon: Icon,
  onClick,
  freshness = 'Live updated',
  className = '',
}: KpiCardProps) {
  const getChangeBadge = () => {
    if (!change) return null;
    let badgeClass = 'bg-zinc-100 text-zinc-700 border-zinc-200';
    if (changeType === 'positive') badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (changeType === 'warning') badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    if (changeType === 'negative') badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';

    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
        {change}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl once-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold sm:text-xs block mb-1">
              {title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">{value}</span>
              {denominator && (
                <span className="text-xs text-zinc-400 font-medium">{denominator}</span>
              )}
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 border border-zinc-200/80 text-zinc-800 flex-shrink-0">
            <Icon className="w-5 h-5 text-zinc-800" />
          </div>
        </div>

        {(subtitle || change) && (
          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500 truncate text-[11px]">{subtitle || freshness}</span>
            {getChangeBadge()}
          </div>
        )}
      </div>
    </div>
  );
}
