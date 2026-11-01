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
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  onClick,
  freshness = 'Live updated',
  className = '',
}: KpiCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-borderLine rounded-xl p-5 shadow-subtle hover:border-slate-300 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-card' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider truncate mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-navy-900">{value}</span>
            {denominator && (
              <span className="text-xs text-slate-400 font-medium">{denominator}</span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || change) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {change && (
            <span
              className={`font-medium ${
                changeType === 'positive'
                  ? 'text-teal-600'
                  : changeType === 'warning'
                  ? 'text-amber-600'
                  : changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-slate-500'
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
          {freshness && <span className="text-slate-400 text-[10px] ml-auto">{freshness}</span>}
        </div>
      )}
    </div>
  );
}

