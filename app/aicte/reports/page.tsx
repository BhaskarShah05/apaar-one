'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { FileSpreadsheet, Download, Calendar, Filter, CheckCircle2 } from 'lucide-react';

export default function AicteReportsPage() {
  const { activeAcademicYear } = useAuth();
  const [reportType, setReportType] = useState('NATIONAL_ENROLMENT');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReport({
        title: reportType === 'NATIONAL_ENROLMENT' ? 'National Consolidated Enrolment Return' : reportType === 'DUPLICATE_RECONCILIATION' ? 'Cross-State Duplicate & Migration Reconciliation Report' : 'National Intake & Quota Compliance Master Audit',
        academicYear: activeAcademicYear,
        generatedAt: new Date().toISOString(),
        totalInstitutions: 5,
        totalEnrolments: 2043,
        duplicateCasesOpen: 2,
        apaarVerifiedRate: '95.1%',
      });
      setIsGenerating(false);
    }, 500);
  };

  const handleDownloadCSV = () => {
    if (!generatedReport) return;
    const content = `Report Title,${generatedReport.title}\nJurisdiction,National AICTE Council\nAcademic Year,${generatedReport.academicYear}\nGenerated At,${generatedReport.generatedAt}\nTotal Participating Institutions,${generatedReport.totalInstitutions}\nTotal Student Enrolments,${generatedReport.totalEnrolments}\nAPAAR Coverage,${generatedReport.apaarVerifiedRate}\nOpen Conflict Cases,${generatedReport.duplicateCasesOpen}\n`;
    const uri = 'data:text/csv;charset=utf-8,' + encodeURI(content);
    const a = document.createElement('a');
    a.href = uri;
    a.download = `${generatedReport.title.replace(/\s+/g, '_')}_${generatedReport.academicYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">National Monitoring & Regulatory Reports</h1>
        <p className="text-xs text-slate-500 mt-1">
          Generate cross-institution policy planning returns, seat compliance audits, and duplicate tracking ledgers.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-6">
        <h2 className="text-sm font-bold text-navy-900">Report Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Standard Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="NATIONAL_ENROLMENT">National Consolidated Enrolment Return</option>
              <option value="DUPLICATE_RECONCILIATION">Cross-State Duplicate Reconciliation Report</option>
              <option value="INTAKE_COMPLIANCE">Intake Compliance & Quota Report</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">State / Regional Scope</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="ALL">All States (National Census)</option>
              <option value="Delhi">Delhi Region</option>
              <option value="Maharashtra">Maharashtra Region</option>
              <option value="Karnataka">Karnataka Region</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Academic Year</label>
            <input
              type="text"
              disabled
              value={activeAcademicYear}
              className="w-full p-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-600"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-subtle"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span>{isGenerating ? 'Synthesizing Data...' : 'Generate National Report'}</span>
          </button>
        </div>
      </div>

      {generatedReport && (
        <div className="bg-white rounded-2xl border border-teal-200 shadow-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Official AICTE Council Report
              </span>
              <h3 className="text-xl font-bold text-navy-900 mt-1">{generatedReport.title}</h3>
              <p className="text-xs text-slate-500">
                Generated At: {new Date(generatedReport.generatedAt).toLocaleString()} • Scope: {stateFilter}
              </p>
            </div>

            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Institutions</span>
              <p className="text-lg font-bold text-navy-900 mt-1">{generatedReport.totalInstitutions}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Enrolled Students</span>
              <p className="text-lg font-bold text-govblue-600 mt-1">{generatedReport.totalEnrolments}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">National APAAR %</span>
              <p className="text-lg font-bold text-teal-700 mt-1">{generatedReport.apaarVerifiedRate}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Open Conflicts</span>
              <p className="text-lg font-bold text-purple-700 mt-1">{generatedReport.duplicateCasesOpen}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

