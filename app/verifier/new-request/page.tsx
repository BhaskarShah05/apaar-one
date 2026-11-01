'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import { 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink 
} from 'lucide-react';

export default function NewVerificationRequestPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    studentIdentifier: '24CSE101', // Prepopulated with Aarav Sharma's roll number
    claimType: 'ENROLMENT_STATUS',
    purpose: 'EMPLOYMENT_BACKGROUND_CHECK',
    requestedAttributes: [
      'institution_name',
      'programme_name',
      'academic_year',
      'admission_date',
      'enrolment_status',
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAttribute = (attr: string) => {
    if (formData.requestedAttributes.includes(attr)) {
      setFormData({
        ...formData,
        requestedAttributes: formData.requestedAttributes.filter(a => a !== attr),
      });
    } else {
      setFormData({
        ...formData,
        requestedAttributes: [...formData.requestedAttributes, attr],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requesterOrg: currentUser.verifierOrg || 'TechCorp Background Screening Services Pvt Ltd',
          requesterUser: currentUser.name,
        }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        alert('Verification request created and sent to candidate for digital consent.');
        router.push(`/verifier/requests/${json.data.id}`);
      } else {
        alert(json.error?.message || 'Failed to create request');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      <div>
        <Link
          href="/verifier/overview"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Verifier Overview</span>
        </Link>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-navy-900">Initiate Scoped Academic Verification Query</h1>
        <p className="text-xs text-slate-500">
          Request official student-level enrolment proof with legally binding consent enforcement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-borderLine shadow-card p-6 sm:p-8 space-y-6 text-xs">
        {/* Distinction Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-govblue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-navy-900">Scope Restriction: </span>
            This query confirms valid institutional admission and enrolment facts recorded with AICTE. For degree certificates or graduation diplomas, queries must be directed to DigiLocker / NAD.
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-bold text-navy-900 mb-1">
              Candidate Reference (Roll Number, APAAR, or Student UUID)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 24CSE101 or 9021-3847-1092"
              value={formData.studentIdentifier}
              onChange={(e) => setFormData({ ...formData, studentIdentifier: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2 font-mono"
            />
            <p className="text-[10px] text-slate-400 mt-1">Pre-filled with Aarav Sharma (24CSE101) for SIH evaluation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Claim Type</label>
              <select
                value={formData.claimType}
                onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="ENROLMENT_STATUS">Enrolment Status (Active / Verified)</option>
                <option value="INSTITUTION_ATTENDANCE">Institutional Admission & Attendance</option>
                <option value="ACADEMIC_AWARD_REDIRECT">Academic Award (Redirects to DigiLocker)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-navy-900 mb-1">Verification Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2 bg-white"
              >
                <option value="EMPLOYMENT_BACKGROUND_CHECK">Employment Background Screening</option>
                <option value="HIGHER_STUDY_ADMISSION">Higher Study Admission</option>
                <option value="VISA_APPLICATION">Visa & Immigration Verification</option>
                <option value="REGULATORY_AUDIT">Statutory / Regulatory Audit</option>
              </select>
            </div>
          </div>

          {/* Minimal Attributes Checkboxes */}
          <div>
            <label className="block font-bold text-navy-900 mb-2">
              Minimum Required Attributes (Data Minimization)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              {[
                { key: 'institution_name', label: 'Institution Name & AICTE Code' },
                { key: 'programme_name', label: 'Programme Degree & Branch' },
                { key: 'academic_year', label: 'Admission Academic Year' },
                { key: 'admission_date', label: 'Formal Admission Date' },
                { key: 'enrolment_status', label: 'Current Enrolment Status (Active)' },
              ].map((attr) => (
                <label key={attr.key} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requestedAttributes.includes(attr.key)}
                    onChange={() => toggleAttribute(attr.key)}
                    className="rounded text-govblue-600 focus:ring-govblue-500"
                  />
                  <span>{attr.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <Link
            href="/verifier/overview"
            className="px-4 py-2 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold shadow-subtle flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Request for Student Consent'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

