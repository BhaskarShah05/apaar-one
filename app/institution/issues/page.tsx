'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  AlertCircle, 
  Filter, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  Ban, 
  ExternalLink,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function InstitutionIssuesPage() {
  const { currentUser } = useAuth();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    loadIssues();
  }, [currentUser.institutionId]);

  async function loadIssues() {
    try {
      const res = await fetch(`/api/v1/validation/issues?institutionId=${currentUser.institutionId || 'inst-dit-del-01'}`);
      const json = await res.json();
      if (json.data) {
        setIssues(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleResolve = async (issueId: string) => {
    try {
      const res = await fetch('/api/v1/validation/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId }),
      });
      if (res.ok) {
        loadIssues();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = issues.filter(i => {
    const matchesSev = severityFilter === 'ALL' || i.severity === severityFilter;
    const matchesStat = statusFilter === 'ALL' || i.status === statusFilter;
    return matchesSev && matchesStat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Institution Workspace</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Quality Triage</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Validation Issue Inbox</h1>
          <p className="text-xs text-slate-500">
            Actionable data quality flags, gateway mismatches, and compliance warnings requiring resolution.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Filter Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="BLOCKER">Blocker (Must Fix)</option>
            <option value="ERROR">Error</option>
            <option value="WARNING">Warning</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All States</option>
            <option value="OPEN">Open ({issues.filter(i => i.status === 'OPEN').length})</option>
            <option value="RESOLVED">Resolved ({issues.filter(i => i.status === 'RESOLVED').length})</option>
          </select>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-borderLine p-12 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
            <h3 className="text-base font-bold text-navy-900">No Open Issues</h3>
            <p className="text-xs text-slate-500">All submissions in this scope are fully compliant.</p>
          </div>
        ) : (
          filtered.map((issue) => (
            <div
              key={issue.id}
              className={`bg-white rounded-2xl border shadow-subtle p-6 space-y-3 transition-all ${
                issue.status === 'RESOLVED' ? 'opacity-60 border-slate-200' : 'border-borderLine hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{issue.id}</span>
                  <StatusBadge status={issue.severity} size="sm" />
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    {issue.ruleCode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{new Date(issue.createdAt).toLocaleString()}</span>
                  <StatusBadge status={issue.status} size="sm" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-navy-900">{issue.message}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{issue.explanation}</p>
              </div>

              {/* Next Action Box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-navy-900">Recommended Action: </span>
                  <span className="text-slate-700">{issue.nextAction}</span>
                </div>

                {issue.status === 'OPEN' && (
                  <button
                    onClick={() => handleResolve(issue.id)}
                    className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap self-end sm:self-auto transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

