import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const institution = db.getInstitution(params.id);
    if (!institution) {
      return errorResponse('INSTITUTION_NOT_FOUND', `Institution with ID ${params.id} does not exist.`, 404);
    }
    return successResponse(institution);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

