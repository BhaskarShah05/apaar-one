import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';
import { BatchRow, SubmissionBatch } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get('institutionId') || undefined;
    const batches = db.getBatches(institutionId);
    return successResponse(batches, { total: batches.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      institutionId,
      programmeId,
      academicYear,
      filename,
      rows,
      submitter,
    } = body;

    if (!institutionId || !programmeId || !rows || !Array.isArray(rows)) {
      return errorResponse('INVALID_PAYLOAD', 'institutionId, programmeId and rows array are required.', 400);
    }

    const institution = db.getInstitution(institutionId);
    const programme = db.getProgramme(programmeId);

    const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const processedRows: BatchRow[] = [];
    const seenRollsInBatch = new Set<string>();
    const seenApaarInBatch = new Set<string>();

    let accepted = 0;
    let warnings = 0;
    let rejected = 0;
    let apaarVerified = 0;
    let apaarPending = 0;

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const rowNum = i + 1;
      const roll = (r.institutionStudentId || r.rollNumber || `ROLL-${rowNum}`).toString().trim();
      const apaarRaw = r.apaarId ? r.apaarId.toString().replace(/[^0-9]/g, '') : '';
      const name = r.studentName || `Candidate ${rowNum}`;
      const admissionDate = r.admissionDate || '2026-08-10';
      const category = r.admissionCategory || 'GENERAL';
      const bucket = r.seatBucket || 'REGULAR';

      // 1. Check duplicate within batch
      if (seenRollsInBatch.has(roll.toLowerCase())) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: apaarRaw ? `XXXX-XXXX-${apaarRaw.slice(-4)}` : 'NOT_SUBMITTED',
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'REJECTED',
          apaarVerificationState: 'FORMAT_VALID',
          reasonCode: 'DUPLICATE_WITHIN_BATCH',
          message: `Duplicate student roll number "${roll}" repeated within same upload file.`,
          correctable: true,
        });
        rejected++;
        continue;
      }
      seenRollsInBatch.add(roll.toLowerCase());

      // 2. Validate APAAR format
      if (!apaarRaw) {
        // Missing APAAR -> APAAR_PENDING
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: 'NOT_SUBMITTED',
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'WARNING',
          apaarVerificationState: 'NOT_SUBMITTED',
          reasonCode: 'APAAR_PENDING_PROVISIONAL',
          message: 'APAAR ID not supplied. Record admitted under provisional internal UUID with 30-day grace window.',
          correctable: true,
        });
        warnings++;
        apaarPending++;
        // Also persist as enrolment
        db.addEnrolment({
          institutionId,
          programmeId,
          academicYear: academicYear || '2026-27',
          institutionRollNumber: roll,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
        });
        continue;
      }

      if (apaarRaw.length !== 12) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: `INVALID-${apaarRaw}`,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'REJECTED',
          apaarVerificationState: 'FORMAT_VALID',
          reasonCode: 'INVALID_APAAR_FORMAT',
          message: `Expected 12 digits for APAAR ID, but received ${apaarRaw.length} digits.`,
          correctable: true,
        });
        rejected++;
        continue;
      }

      // Check within batch duplicate APAAR
      if (seenApaarInBatch.has(apaarRaw)) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'REJECTED',
          apaarVerificationState: 'VERIFIED',
          reasonCode: 'DUPLICATE_APAAR_IN_BATCH',
          message: 'Same APAAR reference submitted on multiple rows in this batch.',
          correctable: true,
        });
        rejected++;
        continue;
      }
      seenApaarInBatch.add(apaarRaw);

      // Check mock simulation triggers
      if (r.mockTrigger === 'UNAVAILABLE' || roll.includes('TIMEOUT')) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'WARNING',
          apaarVerificationState: 'UNAVAILABLE',
          reasonCode: 'PROVIDER_GATEWAY_TIMEOUT',
          message: 'Mock Identity Gateway simulated timeout (504). Saved in PENDING state without declaring invalid.',
          correctable: true,
        });
        warnings++;
        continue;
      }

      if (r.mockTrigger === 'MISMATCH' || name.toLowerCase().includes('mismatch')) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'REJECTED',
          apaarVerificationState: 'MISMATCH',
          reasonCode: 'APAAR_ATTR_MISMATCH_NAME_DOB',
          message: 'Name or DOB differs from authoritative ABC Registry mock profile.',
          correctable: true,
        });
        rejected++;
        continue;
      }

      // Check cross-institution conflict
      const existingEnrolment = db.getEnrolments().find(e => {
        const student = db.getStudent(e.studentUuid);
        return student && student.apaarIdMasked === `XXXX-XXXX-${apaarRaw.slice(-4)}` && e.institutionId !== institutionId && e.status === 'ACTIVE';
      });

      if (existingEnrolment) {
        processedRows.push({
          rowNumber: rowNum,
          institutionStudentId: roll,
          apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
          studentName: name,
          admissionDate,
          admissionCategory: category,
          seatBucket: bucket,
          nriStatus: !!r.nriStatus,
          ociStatus: !!r.ociStatus,
          foreignNationalStatus: !!r.foreignNationalStatus,
          status: 'WARNING',
          apaarVerificationState: 'VERIFIED',
          reasonCode: 'POTENTIAL_CROSS_INSTITUTION_DUPLICATE',
          message: `Active enrolment already exists at ${existingEnrolment.institutionName}. Triaged to AICTE Alert queue.`,
          correctable: true,
        });
        warnings++;
        apaarVerified++;

        // Open conflict case in AICTE queue
        const caseId = `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 899)}`;
        db.getConflictCases().unshift({
          id: caseId,
          title: `Concurrent Cross-State Enrolment: ${name}`,
          conflictType: 'CROSS_INSTITUTION_OVERLAP',
          apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
          studentName: name,
          enrolments: [
            {
              enrolmentId: existingEnrolment.id,
              institutionId: existingEnrolment.institutionId,
              institutionName: existingEnrolment.institutionName,
              programmeName: existingEnrolment.programmeName,
              academicYear: existingEnrolment.academicYear,
              rollNumber: existingEnrolment.institutionRollNumber,
              admissionDate: existingEnrolment.admissionDate,
              status: existingEnrolment.status,
            },
            {
              enrolmentId: `ENR-PENDING-${Date.now()}`,
              institutionId,
              institutionName: institution?.name || 'Submitting Institution',
              programmeName: programme?.branch || 'Technical Programme',
              academicYear: academicYear || '2026-27',
              rollNumber: roll,
              admissionDate,
              status: 'PENDING_VALIDATION',
            },
          ],
          dateOverlap: `${admissionDate} to Present`,
          confidenceScore: 97,
          reasonCodes: ['RULE_CROSS_INSTITUTION_OVERLAP', 'MATCH_EXACT_APAAR_HMAC'],
          evidenceText: `Student appears actively enrolled in ${existingEnrolment.institutionName} and newly submitted by ${institution?.name} without transfer reference.`,
          state: 'OPEN',
          history: [
            {
              actor: 'APAAR ONE Batch Reconciliation Engine',
              action: 'CASE_FLAGGED',
              timestamp: new Date().toISOString(),
              notes: `Generated from upload batch ${batchId}`,
            },
          ],
        });
        continue;
      }

      // Valid clean record!
      processedRows.push({
        rowNumber: rowNum,
        institutionStudentId: roll,
        apaarMasked: `XXXX-XXXX-${apaarRaw.slice(-4)}`,
        studentName: name,
        admissionDate,
        admissionCategory: category,
        seatBucket: bucket,
        nriStatus: !!r.nriStatus,
        ociStatus: !!r.ociStatus,
        foreignNationalStatus: !!r.foreignNationalStatus,
        status: 'ACCEPTED',
        apaarVerificationState: 'VERIFIED',
        correctable: false,
      });
      accepted++;
      apaarVerified++;

      // Persist to central enrolment repository
      db.addEnrolment({
        institutionId,
        programmeId,
        academicYear: academicYear || '2026-27',
        institutionRollNumber: roll,
        studentName: name,
        admissionDate,
        admissionCategory: category,
        seatBucket: bucket,
        apaarIdRaw: apaarRaw,
      });
    }

    const newBatch: SubmissionBatch = {
      id: batchId,
      institutionId,
      institutionName: institution?.name || 'Institution',
      programmeId,
      programmeName: programme?.branch || 'Technical Course',
      academicYear: academicYear || '2026-27',
      filename: filename || 'admissions_upload.csv',
      schemaVersion: '1.0',
      totalRows: rows.length,
      acceptedRows: accepted,
      warningRows: warnings,
      rejectedRows: rejected,
      apaarVerifiedRows: apaarVerified,
      apaarPendingRows: apaarPending,
      status: rejected > 0 ? (accepted > 0 ? 'COMPLETED' : 'VALIDATION_FAILED') : 'COMPLETED',
      submittedBy: submitter || 'Admissions Data Operator',
      createdAt: new Date().toISOString(),
      rows: processedRows,
    };

    db.addBatch(newBatch);

    return successResponse(newBatch, {}, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

