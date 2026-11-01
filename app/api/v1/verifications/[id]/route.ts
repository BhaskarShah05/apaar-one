import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const verification = db.getVerificationByToken(params.id);
    if (!verification) {
      return errorResponse('VERIFICATION_NOT_FOUND', `Verification token or request ID ${params.id} does not exist or has expired.`, 404);
    }
    return successResponse(verification);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

