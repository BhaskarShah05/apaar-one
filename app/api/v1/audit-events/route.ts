import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const entity = searchParams.get('entity');
    const action = searchParams.get('action');

    let events = db.getAuditEvents();

    if (entity && entity !== 'ALL') {
      events = events.filter(e => e.entity.toLowerCase() === entity.toLowerCase());
    }

    if (action && action !== 'ALL') {
      events = events.filter(e => e.action.includes(action));
    }

    return successResponse(events, { total: events.length });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

