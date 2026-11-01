import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { decision, studentName } = body;

    if (!decision || (decision !== 'APPROVED' && decision !== 'DECLINED')) {
      return errorResponse('INVALID_DECISION', 'decision must be either APPROVED or DECLINED.', 422);
    }

    const success = db.respondToVerification(params.id, decision, studentName || 'Aarav Sharma');
    if (!success) {
      return errorResponse('NOT_FOUND', `Verification request ${params.id} was not found.`, 404);
    }

    const updated = db.getVerificationByToken(params.id);
    return successResponse({ success: true, verification: updated });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

