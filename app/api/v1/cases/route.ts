import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');
    const type = searchParams.get('type');

    let cases = db.getConflictCases();

    if (state && state !== 'ALL') {
      cases = cases.filter(c => c.state === state);
    }

    if (type && type !== 'ALL') {
      cases = cases.filter(c => c.conflictType === type);
    }

    return successResponse(cases, { total: cases.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

