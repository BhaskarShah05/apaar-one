import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conflictCase = db.getConflictCase(params.id);
    if (!conflictCase) {
      return errorResponse('CASE_NOT_FOUND', `Conflict case ${params.id} does not exist.`, 404);
    }
    return successResponse(conflictCase);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

