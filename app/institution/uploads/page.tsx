'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Layers, 
  RefreshCw,
  Clock,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

export default function UploadCentrePage() {
  const router = useRouter();
  const { currentUser, activeAcademicYear } = useAuth();
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Wizard state
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [selectedProgramme, setSelectedProgramme] = useState('PRG-DIT-CSE-UG');
  const [fileName, setFileName] = useState('');
  const [fileRows, setFileRows] = useState<any[]>([]);
  const [mapping, setMapping] = useState({
    rollNumber: 'institution_student_id',
    apaarId: 'apaar_id',
    studentName: 'student_name',
    admissionDate: 'admission_date',
    admissionCategory: 'admission_category',
    seatBucket: 'seat_bucket',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  useEffect(() => {
    loadBatches();
  }, [currentUser.institutionId]);

  async function loadBatches() {
    try {
      const res = await fetch(`/api/v1/enrolment-batches?institutionId=${currentUser.institutionId || 'inst-dit-del-01'}`);
      const json = await res.json();
      if (json.data) {
        setBatches(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // Pre-configured rich synthetic demo batch containing all PRD test scenarios
  const handleLoadSampleBatch = () => {
    const sample = [
      {
        institutionStudentId: '24CSE111',
        apaarId: '902138471011',
        studentName: 'Devansh Joshi',
        admissionDate: '2026-08-10',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
      },
      {
        institutionStudentId: '24CSE112',
        apaarId: '902138471012',
        studentName: 'Pooja Hegde',
        admissionDate: '2026-08-10',
        admissionCategory: 'OBC',
        seatBucket: 'TFW',
      },
      {
        institutionStudentId: '24CSE113',
        apaarId: '', // Missing APAAR -> APAAR_PENDING
        studentName: 'Arjun Mehra',
        admissionDate: '2026-08-11',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
      },
      {
        institutionStudentId: '24CSE114',
        apaarId: '902138', // Format invalid -> BLOCKER
        studentName: 'Kunal Kapoor',
        admissionDate: '2026-08-12',
        admissionCategory: 'SC',
        seatBucket: 'REGULAR',
      },
      {
        institutionStudentId: '24CSE115',
        apaarId: '902138471015',
        studentName: 'Riya Sen (Timeout Test)',
        admissionDate: '2026-08-12',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        mockTrigger: 'UNAVAILABLE', // Provider unavailable simulation
      },
      {
        institutionStudentId: '24CSE116',
        apaarId: '902138471016',
        studentName: 'Bikrant Ray (Mismatch)',
        admissionDate: '2026-08-14',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
        mockTrigger: 'MISMATCH', // Attribute mismatch
      },
      {
        institutionStudentId: '24CSE111', // Within-batch duplicate roll number!
        apaarId: '902138471011',
        studentName: 'Devansh Joshi (Duplicate)',
        admissionDate: '2026-08-10',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
      },
      {
        institutionStudentId: '24CSE118',
        apaarId: '9901', // Cross-institution conflict with Kabir Singhania (already active at MNCE)!
        studentName: 'Kabir Singhania (Cross-State)',
        admissionDate: '2026-08-15',
        admissionCategory: 'GENERAL',
        seatBucket: 'REGULAR',
      },
    ];

    setFileName('AICTE_Synthetic_Demo_Batch_2026.csv');
    setFileRows(sample);
    setWizardStep(4); // Advance to mapping & preview
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'institution_student_id,apaar_id,student_name,admission_date,admission_category,seat_bucket\n' +
      '24CSE201,902138479901,Aarav Sharma,2026-08-10,GENERAL,REGULAR\n' +
      '24CSE202,,Priya Nair,2026-08-11,OBC,TFW\n' +
      '24CSE203,902138479903,Rohit Varma,2026-08-12,SC,REGULAR';
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = 'APAAR_ONE_Enrolment_Template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCommitBatch = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/v1/enrolment-batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institutionId: currentUser.institutionId || 'inst-dit-del-01',
          programmeId: selectedProgramme,
          academicYear: activeAcademicYear,
          filename: fileName || 'batch_upload.csv',
          rows: fileRows,
          submitter: currentUser.name,
        }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setUploadResult(json.data);
        setWizardStep(6); // Final Results stage
        loadBatches();
      } else {
        alert(json.error?.message || 'Error processing batch upload.');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLine gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govblue-600 uppercase tracking-wider">Upload Centre</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono text-slate-500">10-Step Ingestion Pipeline</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 mt-1">Bulk Student Enrolment Ingestion</h1>
          <p className="text-xs text-slate-500">
            Submit CSV/XLSX returns with automatic schema validation, APAAR gateway checks, and duplicate reconciliation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Canonical Template (CSV)</span>
        </button>
      </div>

      {/* 10-Step Interactive Wizard Container */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-card p-6 sm:p-8 space-y-6">
        {/* Wizard Stepper Bar */}
        <div className="grid grid-cols-6 gap-2 text-center text-xs pb-6 border-b border-slate-100">
          {[
            { step: 1, label: '1. Context' },
            { step: 2, label: '2. Upload' },
            { step: 3, label: '3. Mapping' },
            { step: 4, label: '4. Preview' },
            { step: 5, label: '5. Validate' },
            { step: 6, label: '6. Results' },
          ].map((s) => (
            <div
              key={s.step}
              className={`p-2 rounded-lg font-medium transition-colors ${
                wizardStep === s.step
                  ? 'bg-navy-900 text-white font-bold'
                  : wizardStep > s.step
                  ? 'bg-teal-50 text-teal-800'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              <span className="text-[11px] block">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Select Context */}
        {wizardStep === 1 && (
          <div className="space-y-6 max-w-xl mx-auto py-4">
            <h2 className="text-lg font-bold text-navy-900 text-center">Step 1: Select Submission Context</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Academic Year</label>
                <input
                  type="text"
                  disabled
                  value={`${activeAcademicYear} (AICTE Official Enrolment Window)`}
                  className="w-full text-xs px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Target Approved Programme</label>
                <select
                  value={selectedProgramme}
                  onChange={(e) => setSelectedProgramme(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-govblue-600"
                >
                  <option value="PRG-DIT-CSE-UG">B.Tech Computer Science & Engineering (Sanctioned Intake: 60)</option>
                  <option value="PRG-DIT-ECE-UG">B.Tech Electronics & Comm. Engg. (Sanctioned Intake: 60)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <span>Proceed to File Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 & 3: File Dropzone & Instant Demo Preload */}
        {wizardStep === 2 && (
          <div className="space-y-6 max-w-2xl mx-auto py-4">
            <h2 className="text-lg font-bold text-navy-900 text-center">Step 2: Upload Enrolment Return File</h2>

            {/* Quick Demo Preload Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-govblue-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-govblue-600" />
                  <span>Instant SIH Evaluation Batch</span>
                </p>
                <p className="text-[11px] text-blue-700">
                  Preloads 8 student rows covering Clean Valid, Missing APAAR, Format Invalid, Provider Timeout, Mismatch, and Cross-Institution Overlap.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLoadSampleBatch}
                className="px-4 py-2 bg-govblue-600 hover:bg-govblue-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow-sm"
              >
                Load Sample Test Batch
              </button>
            </div>

            {/* Dropzone container */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 hover:border-govblue-500 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-900">Drag and drop your CSV or XLSX file here</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Maximum file size: 25 MB • Allowed format: .csv, .xlsx</p>
              </div>
              <button
                type="button"
                onClick={handleLoadSampleBatch}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg"
              >
                Browse Files
              </button>
            </div>
          </div>
        )}

        {/* Step 4 & 5: Column Mapping & Live Validation Preview */}
        {wizardStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-navy-900">Step 4: Column Mapping & Schema Check</h2>
                <p className="text-xs text-slate-500">File: <strong className="text-navy-900">{fileName}</strong> ({fileRows.length} rows detected)</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Headers Automatically Aligned</span>
              </span>
            </div>

            {/* Column Mapping Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Student Roll ID</label>
                <input type="text" disabled value={mapping.rollNumber} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">APAAR Identifier</label>
                <input type="text" disabled value={mapping.apaarId} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Student Full Name</label>
                <input type="text" disabled value={mapping.studentName} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Admission Date</label>
                <input type="text" disabled value={mapping.admissionDate} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Category</label>
                <input type="text" disabled value={mapping.admissionCategory} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Seat Bucket</label>
                <input type="text" disabled value={mapping.seatBucket} className="w-full bg-white p-2 rounded border border-slate-200 font-mono text-[11px]" />
              </div>
            </div>

            {/* Preview First 5 Rows Table */}
            <div>
              <p className="text-xs font-bold text-navy-900 mb-2">Ingestion Preview (First Rows)</p>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="p-2.5">Row</th>
                      <th className="p-2.5">Roll No</th>
                      <th className="p-2.5">APAAR ID</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Admission Date</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Bucket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {fileRows.slice(0, 6).map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-400 font-sans">{i + 1}</td>
                        <td className="p-2.5 font-bold text-navy-900">{r.institutionStudentId}</td>
                        <td className="p-2.5 text-slate-600">{r.apaarId || '<MISSING>'}</td>
                        <td className="p-2.5 font-sans font-medium text-slate-800">{r.studentName}</td>
                        <td className="p-2.5 text-slate-500">{r.admissionDate}</td>
                        <td className="p-2.5 text-slate-700">{r.admissionCategory}</td>
                        <td className="p-2.5 text-slate-700">{r.seatBucket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setWizardStep(2)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCommitBatch}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                    <span>Executing Validation Engine...</span>
                  </>
                ) : (
                  <>
                    <span>Commit Batch & Run Validation Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Batch Results & Row Outcomes */}
        {wizardStep === 6 && uploadResult && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{uploadResult.id}</span>
                  <StatusBadge status={uploadResult.status} size="sm" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">Validation & Reconciliation Complete</h2>
                <p className="text-xs text-slate-500">
                  Target Course: {uploadResult.programmeName} • Submitter: {uploadResult.submittedBy}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[70px]">
                  <p className="text-[10px] text-slate-400 uppercase font-sans">Total</p>
                  <p className="text-xl font-bold text-navy-900">{uploadResult.totalRows}</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-center min-w-[70px]">
                  <p className="text-[10px] text-teal-700 uppercase font-sans">Accepted</p>
                  <p className="text-xl font-bold text-teal-800">{uploadResult.acceptedRows}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center min-w-[70px]">
                  <p className="text-[10px] text-amber-700 uppercase font-sans">Warning</p>
                  <p className="text-xl font-bold text-amber-800">{uploadResult.warningRows}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center min-w-[70px]">
                  <p className="text-[10px] text-red-700 uppercase font-sans">Rejected</p>
                  <p className="text-xl font-bold text-red-800">{uploadResult.rejectedRows}</p>
                </div>
              </div>
            </div>

            {/* Row Breakdown Table */}
            <div>
              <h3 className="text-sm font-bold text-navy-900 mb-2">Row-Level Ingestion Outcomes</h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="p-3">#</th>
                      <th className="p-3">Roll Number</th>
                      <th className="p-3">Candidate Name</th>
                      <th className="p-3">APAAR Reference</th>
                      <th className="p-3">Row Status</th>
                      <th className="p-3">Reason Code / Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {uploadResult.rows?.map((row: any) => (
                      <tr key={row.rowNumber} className="hover:bg-slate-50">
                        <td className="p-3 font-mono text-slate-400">{row.rowNumber}</td>
                        <td className="p-3 font-mono font-bold text-navy-900">{row.institutionStudentId}</td>
                        <td className="p-3 font-semibold text-slate-800">{row.studentName}</td>
                        <td className="p-3 font-mono text-slate-600">{row.apaarMasked}</td>
                        <td className="p-3">
                          <StatusBadge status={row.status} size="sm" />
                        </td>
                        <td className="p-3 text-slate-600">
                          {row.reasonCode ? (
                            <div>
                              <span className="font-mono font-bold text-[10px] text-navy-900 block">{row.reasonCode}</span>
                              <span className="text-[11px] text-slate-500">{row.message}</span>
                            </div>
                          ) : (
                            <span className="text-teal-700 font-medium">Valid Enrolment Persisted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setWizardStep(1);
                  setUploadResult(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Start New Ingestion
              </button>
              <Link
                href="/institution/students"
                className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold"
              >
                Go to Updated Student Roster →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Historical Batches Table */}
      <div className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 space-y-4">
        <h2 className="text-base font-bold text-navy-900">Submission Batch History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Batch ID</th>
                <th className="py-3 px-4">Filename</th>
                <th className="py-3 px-4">Target Course</th>
                <th className="py-3 px-4 text-center">Total Rows</th>
                <th className="py-3 px-4 text-center">Accepted</th>
                <th className="py-3 px-4 text-center">Warnings</th>
                <th className="py-3 px-4 text-center">Rejected</th>
                <th className="py-3 px-4">Batch Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-navy-900">
                    <Link href={`/institution/uploads/${b.id}`} className="hover:underline">
                      {b.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{b.filename}</td>
                  <td className="py-3 px-4 text-slate-600">{b.programmeName}</td>
                  <td className="py-3 px-4 text-center font-mono">{b.totalRows}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-teal-700">{b.acceptedRows}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-amber-700">{b.warningRows}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-red-700">{b.rejectedRows}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={b.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/institution/uploads/${b.id}`}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                    >
                      View Rows
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

