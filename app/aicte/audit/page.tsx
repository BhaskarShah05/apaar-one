'use client';

import React, { useState, useEffect } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { History, Search, Filter, ShieldCheck, Terminal, ArrowRight, Lock } from 'lucide-react';

export default function AicteAuditTimelinePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    async function loadAudit() {
      try {
        const res = await fetch('/api/v1/audit-events');
        const json = await res.json();
        if (json.data) {
          setEvents(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAudit();
  }, []);

  const filtered = events.filter(e => {
    const term = searchTerm.toLowerCase();
    const matchTerm = e.actor.toLowerCase().includes(term) ||
                      e.action.toLowerCase().includes(term) ||
                      e.details.toLowerCase().includes(term) ||
                      e.targetId.toLowerCase().includes(term);
    const matchEntity = entityFilter === 'ALL' || e.entity === entityFilter;
    return matchTerm && matchEntity;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Security & Governance</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">Immutable Audit Trail</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Tamper-Evident Regulatory Audit Timeline</h1>
          <p className="text-xs text-slate-500">
            Cryptographically sealed activity log of batch submissions, case determinations, identity reveals, and policy publications.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>SHA-256 Tamper-Evident Ledger</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by actor name, action, target reference, or detail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-govblue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
          >
            <option value="ALL">All Entities ({events.length})</option>
            <option value="SubmissionBatch">Submission Batches</option>
            <option value="ConflictCase">Conflict Cases</option>
            <option value="PolicyRule">Policy Rules</option>
            <option value="StudentIdentity">Identity Reveals</option>
            <option value="VerificationRequest">Verification Queries</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity & Target</th>
                <th className="py-3 px-4">Correlation ID</th>
                <th className="py-3 px-4">Outcome</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(evt.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold text-navy-900">
                    {evt.actor}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-500 text-[10px]">
                    {evt.actorRole}
                  </td>
                  <td className="py-3 px-4 font-bold text-govblue-700">
                    {evt.action}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-sans font-medium text-slate-800">{evt.entity}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{evt.targetId}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">
                    {evt.requestCorrelationId}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <StatusBadge status={evt.outcome} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy-900">Audit Provenance Record</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-sans">Actor</span>
                  <p className="font-bold text-navy-900 mt-0.5">{selectedEvent.actor}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-sans">IP Address</span>
                  <p className="font-bold text-navy-900 mt-0.5">{selectedEvent.ipAddress}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-sans">Action</span>
                  <p className="font-bold text-govblue-600 mt-0.5">{selectedEvent.action}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-sans">Target Ref</span>
                  <p className="font-bold text-navy-900 mt-0.5 truncate">{selectedEvent.targetId}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-navy-900 block mb-1">Audit Event Context & Changes:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed font-sans">
                  {selectedEvent.details}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                Correlation ID: {selectedEvent.requestCorrelationId}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

