import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get('institutionId') || undefined;
    const programmeId = searchParams.get('programmeId') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search')?.toLowerCase();

    let list = db.getEnrolments(institutionId);

    if (programmeId && programmeId !== 'ALL') {
      list = list.filter(e => e.programmeId === programmeId);
    }

    if (status && status !== 'ALL') {
      list = list.filter(e => e.status === status);
    }

    if (search) {
      list = list.filter(e => {
        const student = db.getStudent(e.studentUuid);
        return (
          e.institutionRollNumber.toLowerCase().includes(search) ||
          e.programmeName.toLowerCase().includes(search) ||
          (student && student.name.toLowerCase().includes(search)) ||
          (student && student.apaarIdMasked.toLowerCase().includes(search))
        );
      });
    }

    // Enrich with masked student profile
    const enriched = list.map(e => {
      const student = db.getStudent(e.studentUuid);
      return {
        ...e,
        studentName: student?.name || 'Candidate',
        apaarMasked: student?.apaarIdMasked || 'NOT_SUBMITTED',
        apaarVerificationState: student?.verificationState || 'NOT_SUBMITTED',
        gender: student?.gender || 'MALE',
      };
    });

    return successResponse(enriched, { total: enriched.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation checks
    if (!body.institutionRollNumber || !body.studentName || !body.programmeId) {
      return errorResponse(
        'VALIDATION_FAILED',
        'Required fields missing: institutionRollNumber, studentName, programmeId are required.',
        422,
        {
          institutionRollNumber: !body.institutionRollNumber ? 'Roll Number is required' : '',
          studentName: !body.studentName ? 'Student Name is required' : '',
          programmeId: !body.programmeId ? 'Programme selection is required' : '',
        }
      );
    }

    const result = db.addEnrolment(body);
    return successResponse(result, {}, 201);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

