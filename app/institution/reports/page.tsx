'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { FileSpreadsheet, Download, Calendar, Filter, FileText, CheckCircle2 } from 'lucide-react';

export default function InstitutionReportsPage() {
  const { currentUser, activeAcademicYear } = useAuth();
  const [reportType, setReportType] = useState('ENROLMENT_RETURN');
  const [programmeFilter, setProgrammeFilter] = useState('ALL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedReport({
        title: reportType === 'ENROLMENT_RETURN' ? 'Official Institution Enrolment Return' : reportType === 'INTAKE_COMPLIANCE' ? 'Intake & Seat Entitlement Compliance Return' : 'Institution Data Quality & Verification Audit',
        academicYear: activeAcademicYear,
        generatedAt: new Date().toISOString(),
        institutionName: currentUser.institutionName || 'Delhi Institute of Technology & Engineering',
        totalRecords: 351,
        verifiedRate: '94.2%',
        complianceState: 'COMPLIANT',
      });
      setIsGenerating(false);
    }, 500);
  };

  const handleDownloadCSV = () => {
    if (!generatedReport) return;
    const content = `Report Title,${generatedReport.title}\nInstitution,${generatedReport.institutionName}\nAcademic Year,${generatedReport.academicYear}\nGenerated At,${generatedReport.generatedAt}\nTotal Active Enrolment,${generatedReport.totalRecords}\nAPAAR Verified Rate,${generatedReport.verifiedRate}\nStatus,${generatedReport.complianceState}\n`;
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
        <h1 className="text-2xl font-bold text-navy-900">Institution Reports & Regulatory Exports</h1>
        <p className="text-xs text-slate-500 mt-1">
          Generate standardized annual enrolment returns, intake compliance summaries, and data quality audits.
        </p>
      </div>

      {/* Generator Control Card */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-6">
        <h2 className="text-sm font-bold text-navy-900">Configure Standard Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-navy-900 mb-1">Standard Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="ENROLMENT_RETURN">Institution Enrolment Return (Section 13.3)</option>
              <option value="INTAKE_COMPLIANCE">Intake Compliance & Quota Report</option>
              <option value="DATA_QUALITY">Data Quality & Exception Audit</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-navy-900 mb-1">Programme Filter</label>
            <select
              value={programmeFilter}
              onChange={(e) => setProgrammeFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="ALL">All Approved Programmes</option>
              <option value="PRG-DIT-CSE-UG">B.Tech Computer Science & Engg.</option>
              <option value="PRG-DIT-ECE-UG">B.Tech Electronics & Comm. Engg.</option>
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
            <span>{isGenerating ? 'Generating...' : 'Generate Scoped Report'}</span>
          </button>
        </div>
      </div>

      {/* Generated Report View */}
      {generatedReport && (
        <div className="bg-white rounded-2xl border border-teal-200 shadow-card p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Generated & Timestamped
              </span>
              <h3 className="text-xl font-bold text-navy-900 mt-1">{generatedReport.title}</h3>
              <p className="text-xs text-slate-500">
                {generatedReport.institutionName} • Generated At: {new Date(generatedReport.generatedAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Total Students</span>
              <p className="text-lg font-bold text-navy-900 mt-1">{generatedReport.totalRecords}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">APAAR Verified</span>
              <p className="text-lg font-bold text-teal-700 mt-1">{generatedReport.verifiedRate}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Seat Status</span>
              <p className="text-lg font-bold text-navy-900 mt-1">{generatedReport.complianceState}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Scope Hash</span>
              <p className="text-xs font-bold text-slate-600 mt-2 truncate font-mono">sha256:4a81b90c...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

