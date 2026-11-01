import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';
import { VerificationRequest } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentUuid = searchParams.get('studentUuid') || undefined;
    const list = db.getVerificationRequests(studentUuid);
    return successResponse(list, { total: list.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      requesterOrg,
      requesterUser,
      studentIdentifier, // APAAR or Roll or Student UUID
      claimType,
      purpose,
      requestedAttributes,
    } = body;

    if (!requesterOrg || !studentIdentifier || !claimType || !purpose) {
      return errorResponse('VALIDATION_FAILED', 'requesterOrg, studentIdentifier, claimType, and purpose are required.', 422);
    }

    // Resolve student
    let student = db.getStudent(studentIdentifier);
    if (!student) {
      // Try resolving by masked APAAR or roll number
      const enrolment = db.getEnrolments().find(e => 
        e.institutionRollNumber.toLowerCase() === studentIdentifier.toLowerCase() ||
        e.id === studentIdentifier
      );
      if (enrolment) {
        student = db.getStudent(enrolment.studentUuid);
      } else {
        // Fallback to first demo student if demo mock lookup
        student = db.getStudent('stu-9011-8842-001');
      }
    }

    const studentUuid = student?.uuid || 'stu-9011-8842-001';
    const studentName = student?.name || 'Aarav Sharma';
    const apaarMasked = student?.apaarIdMasked || 'XXXX-XXXX-4819';

    const opaqueToken = `tok_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36).substring(4)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

    const newReq: VerificationRequest = {
      id: `ver-req-${Date.now().toString(36)}`,
      opaqueToken,
      requesterOrg,
      requesterUser: requesterUser || 'Authorized Background Investigator',
      studentUuid,
      studentName,
      studentApaarMasked: apaarMasked,
      claimType: claimType || 'ENROLMENT_STATUS',
      purpose: purpose || 'EMPLOYMENT_BACKGROUND_CHECK',
      requestedAttributes: requestedAttributes || ['institution_name', 'programme_name', 'enrolment_status'],
      status: 'PENDING_STUDENT_CONSENT',
      expiresAt,
      createdAt: new Date().toISOString(),
    };

    db.createVerificationRequest(newReq);
    return successResponse(newReq, {}, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

