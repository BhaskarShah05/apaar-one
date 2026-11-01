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

    const { searchParams } = new URL(req.url);
    const filterStatus = searchParams.get('status');

    let rows = batch.rows;
    if (filterStatus && filterStatus !== 'ALL') {
      rows = rows.filter(r => r.status === filterStatus);
    }

    return successResponse(rows, {
      total: rows.length,
      batchId: batch.id,
      accepted: batch.acceptedRows,
      warning: batch.warningRows,
      rejected: batch.rejectedRows,
    });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

