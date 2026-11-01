'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { Settings, Building2, Lock, CheckCircle2 } from 'lucide-react';

export default function InstitutionSettingsPage() {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Delhi Institute of Technology & Engineering',
    aicteId: '1-3514210981',
    aisheCode: 'C-16492',
    state: 'Delhi',
    district: 'New Delhi',
    principalName: 'Dr. Rajeshwar Sharma',
    contactEmail: 'admissions@dit.edu.in',
    contactPhone: '+91 11 2659 7120',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <div className="pb-4 border-b border-borderLine">
        <h1 className="text-2xl font-bold text-navy-900">Institution Profile & Preferences</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review authoritative AICTE institutional identity details and maintain notification contacts.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-borderLine shadow-subtle p-6 sm:p-8 space-y-6 text-xs">
        {/* Immutable Identifiers Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Immutable AICTE Approval Identifiers (Controlled by Regulation Bureau)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">AICTE Permanent ID</span>
              <p className="font-mono font-bold text-navy-900 text-sm mt-0.5">{profile.aicteId}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">AISHE Code</span>
              <p className="font-mono font-bold text-navy-900 text-sm mt-0.5">{profile.aisheCode}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Jurisdiction</span>
              <p className="font-bold text-navy-900 text-sm mt-0.5">{profile.district}, {profile.state}</p>
            </div>
          </div>
        </div>

        {/* Editable Contact Fields */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-navy-900">Official Institutional Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-navy-900 mb-1">Principal / Director Name</label>
              <input
                type="text"
                value={profile.principalName}
                onChange={(e) => setProfile({ ...profile, principalName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-bold text-navy-900 mb-1">Admissions Nodal Email</label>
              <input
                type="email"
                value={profile.contactEmail}
                onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block font-bold text-navy-900 mb-1">Official Telephone</label>
              <input
                type="text"
                value={profile.contactPhone}
                onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          {saved ? (
            <span className="text-teal-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences updated successfully.
            </span>
          ) : (
            <span></span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold shadow-subtle transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

