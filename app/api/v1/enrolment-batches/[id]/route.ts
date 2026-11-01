import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batch = db.getBatch(params.id);
    if (!batch) {
      return errorResponse('BATCH_NOT_FOUND', `Batch ${params.id} was not found.`, 404);
    }
    return successResponse(batch);
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

