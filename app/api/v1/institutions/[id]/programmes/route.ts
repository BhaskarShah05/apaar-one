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
      return errorResponse('INSTITUTION_NOT_FOUND', `Institution ${params.id} not found.`, 404);
    }

    const programmes = db.getProgrammes(institution.id);
    return successResponse(programmes, { total: programmes.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

