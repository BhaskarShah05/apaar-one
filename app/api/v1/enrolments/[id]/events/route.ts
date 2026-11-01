import { NextRequest } from 'next/server';
import { db } from '@/lib/data/mockDatabase';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { eventType, actor, notes, evidenceReference } = body;

    if (!eventType || !actor) {
      return errorResponse('VALIDATION_FAILED', 'eventType and actor are required.', 422);
    }

    const success = db.addEnrolmentLifecycleEvent(
      params.id,
      eventType,
      actor,
      notes || 'Updated via portal',
      evidenceReference || 'ORDER_REF_' + Date.now().toString(36).toUpperCase()
    );

    if (!success) {
      return errorResponse('NOT_FOUND', `Enrolment ${params.id} not found.`, 404);
    }

    const updated = db.getEnrolment(params.id);
    return successResponse({ success: true, enrolment: updated });
  } catch (err: any) {
    return errorResponse('INTERNAL_SERVER_ERROR', err.message, 500);
  }
}

