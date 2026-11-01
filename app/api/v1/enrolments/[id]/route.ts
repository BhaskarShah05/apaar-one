import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const enrolment = db.getEnrolment(params.id);
    if (!enrolment) {
      return errorResponse('ENROLMENT_NOT_FOUND', `Enrolment ${params.id} was not found.`, 404);
    }

    const student = db.getStudent(enrolment.studentUuid);
    const events = db.getEnrolments().filter(e => e.id === enrolment.id); // Or events
    const allEvents = (db as any).state?.enrolmentEvents?.filter((ev: any) => ev.enrolmentId === enrolment.id) || [];
    const issues = db.getValidationIssues(enrolment.institutionId).filter(i => i.studentRollNumber === enrolment.institutionRollNumber);

    return successResponse({
      ...enrolment,
      student: student ? {
        uuid: student.uuid,
        name: student.name,
        apaarMasked: student.apaarIdMasked,
        verificationState: student.verificationState,
        dobMasked: student.dobMasked,
        gender: student.gender,
        fatherName: student.fatherName,
        guardianConsentRecorded: student.guardianConsentRecorded,
        providerMetadata: student.providerMetadata,
      } : null,
      events: allEvents,
      issues,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

