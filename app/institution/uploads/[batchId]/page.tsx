'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  ArrowLeft, 
  Download, 
  Filter, 
  FileCheck2, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Clock,
  Edit,
  RotateCcw
} from 'lucide-react';

export default function BatchDetailPage() {
  const params = useParams();
  const [batch, setBatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [correctingRow, setCorrectingRow] = useState<any>(null);

  useEffect(() => {
    async function loadBatch() {
      try {
        const res = await fetch(`/api/v1/enrolment-batches/${params.batchId}`);
        const json = await res.json();
        if (json.data) {
          setBatch(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadBatch();
  }, [params.batchId]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading batch results...</div>;
  }

  if (!batch) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-red-600">Batch Not Found</p>
        <Link href="/institution/uploads" className="text-xs text-govblue-600 underline">
          Back to uploads
        </Link>
      </div>
    );
  }

  const rows = batch.rows || [];
  const filteredRows = rows.filter((r: any) => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  const handleDownloadErrors = () => {
    const errorRows = rows.filter((r: any) => r.status === 'REJECTED' || r.status === 'WARNING');
    const headers = ['Row Number', 'Roll Number', 'APAAR Reference', 'Student Name', 'Status', 'Reason Code', 'Error Message'];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...errorRows.map((r: any) =>
          [
            r.rowNumber,
            r.institutionStudentId,
            r.apaarMasked,
            `"${r.studentName}"`,
            r.status,
            r.reasonCode || 'NONE',
            `"${r.message || ''}"`,
          ].join(',')
        ),
      ].join('\n');

    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `${batch.id}_Error_Exceptions.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/institution/uploads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Upload Centre</span>
        </Link>
      </div>

      {/* Batch Summary Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-navy-900">{batch.id}</span>
              <StatusBadge status={batch.status} size="sm" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mt-1">{batch.filename}</h1>
            <p className="text-xs text-slate-500">
              Course: {batch.programmeName} • Submitter: {batch.submittedBy} • Date: {new Date(batch.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadErrors}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Error Exceptions (CSV)</span>
          </button>
        </div>

        {/* Counts summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-slate-500 font-sans text-[11px] uppercase">Total Ingested</p>
            <p className="text-2xl font-bold text-navy-900 mt-1">{batch.totalRows}</p>
          </div>
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <p className="text-teal-700 font-sans text-[11px] uppercase">Accepted Records</p>
            <p className="text-2xl font-bold text-teal-800 mt-1">{batch.acceptedRows}</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-amber-700 font-sans text-[11px] uppercase">Warnings (Pending)</p>
            <p className="text-2xl font-bold text-amber-800 mt-1">{batch.warningRows}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-red-700 font-sans text-[11px] uppercase">Rejected (Blockers)</p>
            <p className="text-2xl font-bold text-red-800 mt-1">{batch.rejectedRows}</p>
          </div>
        </div>
      </div>

      {/* Row-Level Results Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 className="text-base font-bold text-navy-900">Row Results & Explainable Validation Reasons</h2>
            <p className="text-xs text-slate-500">Inspect every row outcome with rule codes and remediation options</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Outcomes ({rows.length})</option>
              <option value="ACCEPTED">Accepted ({batch.acceptedRows})</option>
              <option value="WARNING">Warning ({batch.warningRows})</option>
              <option value="REJECTED">Rejected ({batch.rejectedRows})</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="p-3">Row #</th>
                <th className="p-3">Roll ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">APAAR ID</th>
                <th className="p-3">Outcome</th>
                <th className="p-3">Reason Code</th>
                <th className="p-3">Explanation & Remediation</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredRows.map((r: any) => (
                <tr key={r.rowNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-slate-400 font-sans">{r.rowNumber}</td>
                  <td className="p-3 font-bold text-navy-900">{r.institutionStudentId}</td>
                  <td className="p-3 font-sans font-medium text-slate-800">{r.studentName}</td>
                  <td className="p-3 text-slate-600">{r.apaarMasked}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={r.status} size="sm" />
                  </td>
                  <td className="p-3">
                    {r.reasonCode ? (
                      <span className="font-bold text-[10px] text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                        {r.reasonCode}
                      </span>
                    ) : (
                      <span className="text-teal-700">OK</span>
                    )}
                  </td>
                  <td className="p-3 font-sans text-slate-600 max-w-xs text-xs">
                    {r.message || 'Validation passed. Enrolment event recorded.'}
                  </td>
                  <td className="p-3 text-right font-sans">
                    {r.correctable ? (
                      <button
                        type="button"
                        onClick={() => setCorrectingRow(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Correct</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row Correction Drawer / Modal */}
      {correctingRow && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900">Correct Record for Row #{correctingRow.rowNumber}</h3>
                <p className="text-xs text-slate-500">Roll: {correctingRow.institutionStudentId} • {correctingRow.studentName}</p>
              </div>
              <button
                onClick={() => setCorrectingRow(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold">Flagged Reason: </span>
              <span>{correctingRow.reasonCode} — {correctingRow.message}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">Corrected APAAR ID (12 Digits)</label>
                <input
                  type="text"
                  placeholder="Enter 12-digit APAAR ID"
                  defaultValue="902138471092"
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Correction Justification / Legal Basis</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Student provided corrected DigiLocker APAAR card following Aadhaar name rectification..."
                  defaultValue="DigiLocker APAAR e-KYC verified by Registrar."
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCorrectingRow(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Correction submitted! Student record re-evaluated and queued for acceptance.');
                  setCorrectingRow(null);
                }}
                className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
              >
                Resubmit Corrected Row
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

