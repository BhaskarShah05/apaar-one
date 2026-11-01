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
    let badgeClass = 'bg-white/10 text-zinc-300 border-white/10';
    if (changeType === 'positive') badgeClass = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    if (changeType === 'warning') badgeClass = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
    if (changeType === 'negative') badgeClass = 'bg-rose-500/10 text-rose-300 border-rose-500/20';

    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass}`}>
        {change}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 h-36 w-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs block mb-1">
              {title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{value}</span>
              {denominator && (
                <span className="text-xs text-zinc-400 font-medium">{denominator}</span>
              )}
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 text-white flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {(subtitle || change) && (
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-400 truncate text-[11px]">{subtitle || freshness}</span>
            {getChangeBadge()}
          </div>
        )}
      </div>
    </div>
  );
}
