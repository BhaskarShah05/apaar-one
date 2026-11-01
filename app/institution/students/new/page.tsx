'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { 
  UserPlus, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export default function NewStudentPage() {
  const router = useRouter();
  const { currentUser, activeAcademicYear } = useAuth();

  const [formData, setFormData] = useState({
    institutionRollNumber: '',
    studentName: '',
    apaarIdRaw: '',
    programmeId: 'PRG-DIT-CSE-UG',
    academicYear: activeAcademicYear,
    admissionDate: new Date().toISOString().split('T')[0],
    admissionCategory: 'GENERAL',
    seatBucket: 'REGULAR',
    nriStatus: false,
    ociStatus: false,
    foreignNationalStatus: false,
    evidenceReference: 'STATE_CET_ALLOTMENT_ORDER_2026',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<any>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.institutionRollNumber.trim()) {
      errors.institutionRollNumber = 'Roll number / Student ID is required';
    }
    if (!formData.studentName.trim()) {
      errors.studentName = 'Student full legal name is required';
    }
    if (formData.apaarIdRaw.trim() !== '') {
      const clean = formData.apaarIdRaw.replace(/[^0-9]/g, '');
      if (clean.length !== 12) {
        errors.apaarIdRaw = `APAAR ID must be exactly 12 digits (currently ${clean.length} digits)`;
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/enrolments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          institutionId: currentUser.institutionId || 'inst-dit-del-01',
        }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setSuccessResult(json.data);
      } else {
        if (json.error?.fieldErrors) {
          setFieldErrors(json.error.fieldErrors);
        } else {
          alert(json.error?.message || 'Failed to submit student record.');
        }
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/institution/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Student Roster</span>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-navy-900">Individual Student Admission & Enrolment</h1>
        <p className="text-xs text-slate-500">
          Submit verified student admission record linked to APAAR academic identity.
        </p>
      </div>

      {successResult ? (
        <div className="bg-white rounded-2xl border border-teal-200 p-8 shadow-card text-center space-y-4">
          <div className="w-12 h-12 bg-teal-50 border border-teal-200 text-teal-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Student Record Successfully Persisted</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Admitted <strong className="text-navy-900">{successResult.enrolment?.institutionRollNumber}</strong> into {successResult.enrolment?.programmeName}. Status: <span className="font-semibold text-teal-700">{successResult.enrolment?.status}</span>.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href={`/institution/students/${successResult.enrolment?.id}`}
              className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              View Record Details
            </Link>
            <button
              onClick={() => {
                setSuccessResult(null);
                setFormData({
                  ...formData,
                  institutionRollNumber: '',
                  studentName: '',
                  apaarIdRaw: '',
                });
              }}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Admit Another Student
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-borderLine shadow-card p-6 sm:p-8 space-y-6">
          {/* Top Form Alert Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-govblue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-navy-900">APAAR Optional at Admission: </span>
              If the student has not yet created an APAAR ID, leave the field empty. A provisional internal UUID will be assigned with a 30-day compliance window.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Roll Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Institution Roll / Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 24CSE110"
                value={formData.institutionRollNumber}
                onChange={(e) => setFormData({ ...formData, institutionRollNumber: e.target.value })}
                className={`w-full text-xs font-mono px-3 py-2 border rounded-lg focus:outline-none ${
                  fieldErrors.institutionRollNumber ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-govblue-600'
                }`}
              />
              {fieldErrors.institutionRollNumber && (
                <p className="text-[11px] text-red-600 font-medium">{fieldErrors.institutionRollNumber}</p>
              )}
            </div>

            {/* Student Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Student Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="As per Matriculation Certificate"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none ${
                  fieldErrors.studentName ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-govblue-600'
                }`}
              />
              {fieldErrors.studentName && (
                <p className="text-[11px] text-red-600 font-medium">{fieldErrors.studentName}</p>
              )}
            </div>

            {/* APAAR ID (12-digit) */}
            <div className="space-y-1 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-navy-900">
                  12-Digit APAAR ID (Optional / Conditional P0)
                </label>
                <span className="text-[10px] text-slate-400">Leaves provisional UUID if blank</span>
              </div>
              <input
                type="text"
                maxLength={14}
                placeholder="e.g. 9021-3847-1092"
                value={formData.apaarIdRaw}
                onChange={(e) => setFormData({ ...formData, apaarIdRaw: e.target.value })}
                className={`w-full text-xs font-mono px-3 py-2 border rounded-lg focus:outline-none ${
                  fieldErrors.apaarIdRaw ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-govblue-600'
                }`}
              />
              {fieldErrors.apaarIdRaw && (
                <p className="text-[11px] text-red-600 font-medium">{fieldErrors.apaarIdRaw}</p>
              )}
            </div>

            {/* Programme Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Approved Programme <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.programmeId}
                onChange={(e) => setFormData({ ...formData, programmeId: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-govblue-600"
              >
                <option value="PRG-DIT-CSE-UG">B.Tech Computer Science & Engg.</option>
                <option value="PRG-DIT-ECE-UG">B.Tech Electronics & Comm. Engg.</option>
              </select>
            </div>

            {/* Admission Date */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Admission Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.admissionDate}
                onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-govblue-600"
              />
            </div>

            {/* Admission Category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Admission Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.admissionCategory}
                onChange={(e) => setFormData({ ...formData, admissionCategory: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-govblue-600"
              >
                <option value="GENERAL">GENERAL</option>
                <option value="OBC">OBC (Non-Creamy Layer)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            {/* Seat Bucket */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-navy-900">
                Capacity Seat Bucket <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.seatBucket}
                onChange={(e) => setFormData({ ...formData, seatBucket: e.target.value as any })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-govblue-600"
              >
                <option value="REGULAR">Regular Approved Intake</option>
                <option value="TFW">Tuition Fee Waiver (5% Supernumerary)</option>
                <option value="LATERAL_ENTRY">Lateral Entry (10% Supernumerary)</option>
                <option value="NRI">NRI / Gulf Quota</option>
              </select>
            </div>
          </div>

          {/* Conditional Special Flags */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs font-bold text-slate-700">Special Category Status Declarations</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.nriStatus}
                  onChange={(e) => setFormData({ ...formData, nriStatus: e.target.checked })}
                  className="rounded text-govblue-600 focus:ring-govblue-500"
                />
                <span>NRI Candidate</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ociStatus}
                  onChange={(e) => setFormData({ ...formData, ociStatus: e.target.checked })}
                  className="rounded text-govblue-600 focus:ring-govblue-500"
                />
                <span>OCI / PIO Status</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.foreignNationalStatus}
                  onChange={(e) => setFormData({ ...formData, foreignNationalStatus: e.target.checked })}
                  className="rounded text-govblue-600 focus:ring-govblue-500"
                />
                <span>Foreign National (FN)</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/institution/students"
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold shadow-subtle flex items-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4 text-teal-400" />
              <span>{isSubmitting ? 'Validating & Persisting...' : 'Submit & Enrol Student'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

